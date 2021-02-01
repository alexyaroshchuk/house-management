<?php namespace App\Services;

use App\Repositories\UserRepo;

class UserService extends BaseService
{
    protected string $repository = UserRepo::class;

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
