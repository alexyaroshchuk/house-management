<?php namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class CommentRequest extends ApiRequest
{
    function getRules()
    {
        return [
            'text'         => ['required', 'string'],
            'apartment_id' => ['nullable', 'exists:apartments,id'],
            'space_id'     => ['nullable', 'exists:spaces,id'],
        ];
    }
}
