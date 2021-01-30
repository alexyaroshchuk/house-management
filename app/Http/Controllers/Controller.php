<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected int $statusCode = 200;

    protected string $message = "";

    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    public function respondNotFound()
    {
        return $this->setStatusCode(404)
                    ->setMessage('Not found')
                    ->respondWithError();
    }

    public function respondValidationError($errors)
    {
        return $this->setStatusCode(422)
                    ->setMessage('Validation errors')
                    ->respondWithError($errors);
    }

    public function respond(array $data)
    {
        $payload = array_merge($data, [
            'code'    => $this->getStatusCode(),
            'message' => $this->getMessage()
        ]);

        return response()->json($payload, $this->getStatusCode());
    }

    public function respondFetched($modelName, $data)
    {
        return $this->setMessage('Successfully fetched ' . $modelName)
                    ->respond($data);
    }

    public function respondDeleted($modelName)
    {
        return $this->setMessage('Successfully deleted ' . $modelName)
                    ->respondWithoutData();
    }

    public function respondUpdated($modelName, $model)
    {
        return $this->setMessage('Successfully updated ' . $modelName)
                    ->respond(["payload" => $model]);
    }

    public function respondCreated($modelName, $model)
    {
        return $this->setStatusCode(201)
                    ->setMessage('Successfully created ' . $modelName)
                    ->respond(["payload" => $model]);
    }

    public function respondWithoutData()
    {
        return $this->respond([
            'message' => $this->getMessage(),
            'code'    => $this->getStatusCode()
        ]);
    }

    public function respondWithError($errors = [])
    {
        return $this->respond([
            'message' => $this->getMessage(),
            'code'    => $this->getStatusCode(),
            'errors'  => $errors
        ]);
    }

    public function respondWithPayload($payload)
    {
        return $this->respond([
            'message' => $this->getMessage(),
            'code'    => $this->getStatusCode(),
            'payload' => $payload
        ]);
    }
}
