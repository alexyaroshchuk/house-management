<?php namespace App\Http\Requests;

use App\Models\Payment;

class PaymentRequest extends ApiRequest
{
    function getRules()
    {
        return [
            'date'                => ['required', 'date'],
            'recommend_payment'   => ['nullable', 'string'],
            'fact_payment'        => ['nullable', 'string'],
            'source'              => ['required', "in:" . implode(',', array_keys(Payment::PAYMENT_TYPES))],
            'apartment_id'        => ['nullable', 'exists:apartments,id'],
            'currency'            => ['nullable', 'in:' . implode(',', array_keys(Payment::CURRENCY))],
        ];
    }
}
