<?php namespace App\Repositories;

use App\Models\Comment;

class CommentRepo extends BaseRepository
{
    protected string $model = Comment::class;
}
