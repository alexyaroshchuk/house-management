<?php namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class UserRequest extends ApiRequest
{
    function getRules()
    {
        return [
            'name'     => ['required', 'string'],
            'email'    => ['required', 'email', Rule::unique('users')->ignore($this->route('user'))],
            'password' => ['min:6', Rule::requiredIf(!$this->route('user'))],
            'role'     => ['required', 'in:admin,manager']
        ];
    }
}
