<?php namespace App\Repositories;

use App\Models\User;

class UserRepo extends BaseRepository
{
    protected string $model = User::class;

    public function createOne(array $data)
    {
        $data['password'] = bcrypt($data['password']);

        return parent::createOne($data);
    }

    public function updateOne(array $data, $id)
    {
        if(isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        return parent::updateOne($data, $id);
    }
}
