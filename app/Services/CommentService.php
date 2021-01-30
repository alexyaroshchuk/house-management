<?php namespace App\Services;

use App\Repositories\CommentRepo;

class CommentService extends BaseService
{
    protected string $repository = CommentRepo::class;

    public function createOne(array $data)
    {
        $comment = $this->repo->createOne($data);

        return $comment->apartment;
    }
}
