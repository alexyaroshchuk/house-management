<?php namespace App\Observers;

use App\Models\Contract;
use App\Models\Contractor;
use App\Models\Log;
use App\Models\SellerContract;
use App\Models\Shipment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ModelObserver
{
    /**
     * Handle the contract "creating" event.
     *
     * @param $model
     * @return void
     */
    public function creating($model)
    {
        $model->created_by = Auth::user()->id;
    }

    /**
     * Handle the contract "created" event.
     *
     * @param $model
     * @return void
     */
    public function created($model)
    {
        $data = $this->prepareData($model, 'created');
        Log::create($data);
    }

    /**
     * Handle the contract "saving" event.
     *
     * @param $model
     * @return void
     */
    public function saving($model)
    {
        $model->updated_by = Auth::user()->id;

        if(isset($model->id)) {

            if( isset($model->status) &&
                $model->status == 'inactive' &&
                $model->getOriginal('status') == 'active' ) {

                $data = $this->prepareData($model, 'finished');
                Log::create($data);

            } else {

                $data = $this->prepareData($model, 'edited');
                Log::create($data);

            }
        }
    }

    /**
     * Handle the contract "deleting" event.
     *
     * @param $model
     * @return void
     */
    public function deleting($model)
    {
        $model->deleted_by = Auth::user()->id;
        $data = $this->prepareData($model, 'deleted');
        Log::create($data);
    }


    private function prepareData($model, string $action)
    {
        $modelName = get_class($model);
        $baseName  = class_basename($model);
        $userName  = User::find(Auth::user()->id)->name;
        $itemModel = new $modelName();
        $item      = $itemModel->find($model->id);

        switch ($baseName) {
            case "Container":
            case "Payment":
                $shipment = Shipment::find($model->shipment_id);
                $contract = Contract::find($shipment->contract_id);
                $buyer    = Contractor::find($contract->buyer_id)->name;
                $itemId   = $contract->id;
                $contract = $buyer . ' (' . $contract->number . ')';
                $url      = "contracts";
                break;
            case "Shipment":
            case "Expense":
                $contract = Contract::find($model->contract_id);
                $buyer    = Contractor::find($contract->buyer_id)->name;
                $itemId   = $contract->id;
                $contract = $buyer . ' (' . $contract->number . ')';
                $url      = "contracts";
                break;
            case "Contract":
                $contract = Contract::find($model->id);
                $buyer    = Contractor::find($contract->buyer_id)->name;
                $itemId   = $contract->id;
                $contract = $buyer . ' (' . $contract->number . ')';

                $url      = "contracts";
                break;
            case "SellerContract":
                $contract = SellerContract::find($model->id);
                $seller   = Contractor::find($contract->seller_id)->name;
                $itemId   = $contract->id;
                $contract = $seller . ' (' . $contract->number . ')';
                $url      = "seller-contracts";
                break;
            default:
                $url      = null;
                $contract = null;
                $itemId   = null;
                break;
        }

        switch ($baseName) {
            case "Expense":
                $itemName = $item->description;
                break;
            case "Payment":
                $itemName = $item->type;
                break;
            case "Contract":
            case "SellerContract":
                $itemName = null;
                break;
            default:
                $itemName = $item->number;
                break;
        }

        if(!$itemName) {
            $message = $userName . ' ' . $action;
        } else {
            $message = $userName . ' ' . $action . ' ' . strtolower($baseName) . ' ' . $itemName . ' on ';
        }

        return [
            'table_name'      => $url,
            'action'          => $action,
            'user_name'       => $userName,
            'user_id'         => Auth::user()->id,
            'contract_number' => $contract,
            'message'         => $message,
            'item_name'       => $itemName,
            'item_id'         => $itemId,
            'current_value'   => json_encode($model)
        ];
    }
}
