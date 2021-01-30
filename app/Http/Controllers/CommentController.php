<?php namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Http\Request;

class CommentController extends BaseController
{
    protected string $request = CommentRequest::class;

    protected string $model = Comment::class;

    protected string $service = CommentService::class;

    public function store(Request $request)
    {
        app($this->request);

        $fields = $request->only((new $this->model())->getFillable());
        $model = $this->baseService->createOne($fields);

        return view("apartment.show", [
            'model' => $model
        ]);
    }
}
