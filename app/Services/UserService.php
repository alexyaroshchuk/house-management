<?php namespace App\Services;

use App\Repositories\UserRepo;

class UserService extends BaseService
{
    protected string $repository = UserRepo::class;
}
