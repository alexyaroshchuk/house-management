<?php namespace App\Http\Controllers;

use App\Services\BaseService;
use App\Transformers\Transformer;
use Illuminate\Http\Request;

class BaseController extends Controller implements ControllerInterface
{
    /**
     * @var string
     */
    protected string $model;

    /**
     * @var string
     */
    protected string $request;

    /**
     * @var string
     */
    protected string $service;

    /**
     * @var BaseService
     */
    protected BaseService $baseService;

    /**
     * @var string
     */
    protected string $modelName;

    /**
     * BaseController constructor.
     */
    public function __construct()
    {
        $this->baseService = new $this->service();
        $this->modelName = class_basename($this->model);
    }

    public function index(Request $request)
    {
        $params = Transformer::toArray($request);
        $models = $this->baseService->getAll($params);

        return view(strtolower($this->modelName) . ".index", [
           'models' => $models
        ]);
    }

    public function create()
    {
        return view(strtolower($this->modelName) . ".create");
    }

    public function edit($id)
    {
        $model = $this->baseService->get($id);

        if(!$model) {
            return $this->respondNotFound();
        }

        return view(strtolower($this->modelName) . ".edit", [
            'model' => $model
        ]);
    }

    public function show($id, Request $request)
    {
        $params = Transformer::toArray($request);
        $model = $this->baseService->getOne($id, $params);

        return view(strtolower($this->modelName) . ".show", [
            'model' => $model
        ]);
    }

    public function store(Request $request)
    {
        app($this->request);

        $fields = $request->only((new $this->model())->getFillable());
        $model = $this->baseService->createOne($fields);

        return view(strtolower($this->modelName) . ".show", [
            'model' => $model
        ]);
    }

    public function update($id, Request $request)
    {
        app($this->request);

        $fields = $request->only((new $this->model())->getFillable());
        $model = $this->baseService->updateOne($fields, $id);

        if(!$model) {
            return $this->respondNotFound();
        }

        return view(strtolower($this->modelName) . ".show", [
            'model' => $model
        ]);
    }

    public function destroy($id)
    {
        $this->baseService->deleteOne($id);

        return back();
    }
}
