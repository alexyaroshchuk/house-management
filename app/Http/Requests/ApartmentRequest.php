<?php namespace App\Http\Requests;

class ApartmentRequest extends ApiRequest
{
    function getRules()
    {
        return [
            'number'          => ['nullable', 'string'],
            'contract_number' => ['nullable', 'string'],
            'price'           => ['nullable', 'string'],
            'first_payment'   => ['nullable', 'integer'],
            'correct_payment' => ['nullable', 'integer'],
            'count_payments'  => ['nullable', 'integer'],
            'floor'           => ['nullable', 'integer'],
            'space'           => ['nullable', 'numeric'],
            'status'          => ['required', 'in:sold,not_sold,partially_sold'],
            'type'            => ['nullable', 'in:apartment,box,parking'],
        ];
    }
}
