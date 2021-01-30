<?php namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Models\Payment;
use App\Services\PaymentService;
use App\Transformers\Transformer;
use Illuminate\Http\Request;

class PaymentController extends BaseController
{
    protected string $request = PaymentRequest::class;

    protected string $model = Payment::class;

    protected string $service = PaymentService::class;

    public function store(Request $request)
    {
        app($this->request);

        $fields = $request->only((new $this->model())->getFillable());
        $model = $this->baseService->createOne($fields);

        return view("apartment.show", [
            'model' => $model
        ]);
    }
}
