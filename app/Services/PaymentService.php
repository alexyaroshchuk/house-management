<?php namespace App\Services;

use App\Repositories\PaymentRepo;

class PaymentService extends BaseService
{
    protected string $repository = PaymentRepo::class;

    public function createOne(array $data)
    {
        $comment = $this->repo->createOne($data);

        return $comment->apartment;
    }
}
