<?php namespace App\Repositories;

use App\Models\User;

class UserRepo extends BaseRepository
{
    protected string $model = User::class;
}
