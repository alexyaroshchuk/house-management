<?php namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;

class UserController extends BaseController
{
    protected string $request = UserRequest::class;

    protected string $model = User::class;

    protected string $service = UserService::class;
}
