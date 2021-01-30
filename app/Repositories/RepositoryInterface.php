<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function getAll(array $options = []);

    public function getOne($id, array $options = []);

    public function createOne(array $data);

    public function updateOne(array $data, $id);

    public function deleteOne($id);

    public function getModel();
}
