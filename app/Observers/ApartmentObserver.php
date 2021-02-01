<?php namespace App\Observers;

use App\Models\Apartment;
use App\Models\Payment;
use Carbon\Carbon;

class ApartmentObserver
{
    /**
     * Handle the contract "saving" event.
     *
     * @param $model
     * @return void
     */
    public function saving($model)
    {
        if ($model->count_payments && $model->status == Apartment::STATUSES['partially_sold']) {
            if ($model->count_payments > $model->getOriginal('count_payments')) {
                for ($i = $model->getOriginal('count_payments'); $i < $model->count_payments; $i++) {
                    Payment::create([
                        'date'              => Carbon::now()->addMonths($i),
                        'recommend_payment' => ($model->price - $model->first_payment) / $model->count_payments,
                        'fact_payment'      => 0,
                        'apartment_id'      => $model->id,
                        'source'            => 'cash',
                        'currency'          => 'hrn',
                    ]);
                }
            }
        }

        if ($model->count_payments && $model->status == Apartment::STATUSES['sold']) {
           foreach ($model->payments as $payment) {
               if (!$payment->fact_payment) {
                   $payment->delete();
               }
           }
        }
    }
}
