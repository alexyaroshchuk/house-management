<?php namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\ReposManager;

class BaseService implements ServiceInterface
{
    /**
     * @var string
     */
    protected string $repository;

    /**
     * @var BaseRepository
     */
    protected BaseRepository $repo;

    /**
     * @var ReposManager
     */
    protected ReposManager $repos;

    /**
     * BaseService constructor.
     */
    public function __construct()
    {
        $this->repo = new $this->repository();
        $this->repos = new ReposManager();
    }

    public function getAll(array $params = [])
    {
        return $this->repo->getAll($params);
    }

    public function getOne($id, array $params = [])
    {
        return $this->repo->getOne($id, $params);
    }

    public function get($id)
    {
        return $this->repo->get($id);
    }

    public function createOne(array $data)
    {
        return $this->repo->createOne($data);
    }

    public function updateOne(array $data, $id)
    {
        return $this->repo->updateOne($data, $id);
    }

    public function deleteOne($id)
    {
        return $this->repo->deleteOne($id);
    }

    public function getModel()
    {
        return $this->repo->getModel();
    }

    public function getWithAll($params)
    {
        return $this->repo->getWithAll($params);
    }

    public function archive($status, $id)
    {
        return $this->repo->archive($status, $id);
    }
}
