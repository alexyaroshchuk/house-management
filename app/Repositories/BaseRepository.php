<?php namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class BaseRepository implements RepositoryInterface
{
    /**
     * @var string
     */
    protected string $model;

    /**
     * @var array
     */
    protected array $operators = ["=", "<", ">", "<=", ">=", "<>", "!="];

    /**
     * @var Builder
     */
    protected Builder $builder;

    /**
     * BaseRepository constructor.
     */
    public function __construct()
    {
        $this->builder = $this->model::query();
    }

    public function getAll($params = [])
    {
        $this->applyFilters($this->builder, $params['filters']);
        $this->applySearch($this->builder, $params['search'], $params['dataForSearch']);
        $this->applySorting($this->builder, $params['sorting']);
        $this->applySelect($this->builder, $params['select']);
        $this->applyWith($this->builder, $params['with']);
        $this->applyWithCount($this->builder, $params['withCount']);
        $this->applyPagination($this->builder, $params['pagination']);

        return $this->builder->get();
    }

    public function getOne($id, $params = [])
    {
        $this->builder->where('id', $id);
        return $this->getOneWithoutCheckId($params);
    }

    public function get($id)
    {
        return $this->builder->find($id);
    }

    public function updateOne(array $data, $id)
    {
        $record = $this->builder->find($id);

        $record->update($data);

        return $record;
    }

    public function createOne(array $data)
    {
        return $this->builder->create($data);
    }

    public function deleteOne($id)
    {
        return $this->getModel()->destroy($id);
    }

    public function getModel()
    {
        return new $this->model();
    }

    public function getWithAll($params)
    {
        return $this->getModel()->withAll($params);
    }

    public function applySorting(Builder $builder = null, array $sortItems = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$sortItems) {
            return $builder->orderBy('id');
        }

        $this->sortOrder($sortItems);

        foreach ($sortItems as $value) {
            $builder->orderBy($value['key'], $value['direction']);
        }

        return $builder;
    }

    private function sortOrder(array &$array = [])
    {
        usort($array, function ($first, $second)
        {
            return $first['order'] - $second['order'];
        });
    }

    public function applyFilters(Builder $builder = null , array $filterItems = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$filterItems) {
            return $builder;
        }

        foreach ($filterItems as $value) {

            $filtersValue = $value['value'];

            if(in_array($value['comparator'], $this->operators)){
                $builder->where($value['key'], $value['comparator'], $filtersValue);
                continue;
            }

            $builder->where($value['key'], $value['comparator'], "%$filtersValue%");
        }

        return $builder;
    }

    public function applySelect(Builder $builder = null, array $selectItems = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$selectItems) {
            return $builder;
        }

        return $builder->select($selectItems);
    }

    public function applyOmit(&$data, array $omitItems = [])
    {
        if(!$omitItems) {
            return $data;
        }

        for($i = 0; $i < count($data); $i++) {
            foreach ($omitItems as $omitItem) {
                unset($data[$i]["$omitItem"]);
            }
        }
    }

    public function applyWith(Builder $builder = null, array $withItems = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$withItems) {
            return $builder;
        }

        return $builder->with($withItems);
    }

    public function applyWithCount(Builder $builder = null, array $withCountItems = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$withCountItems) {
            return $builder;
        }

        return $builder->withCount($withCountItems);
    }

    public function applySearch(Builder $builder = null, string $searchItems = "", array $fieldsSearch = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$searchItems) {
            return $builder;
        }

        $builder->where(function ($query) use ($fieldsSearch, $searchItems) {
            foreach ($fieldsSearch as $field) {
                if(isset($field['relation'])) {
                    $query->orWhereHas($field['relation'], function ($q) use ($field, $searchItems) {
                        $q->where($field['field'], 'ilike', '%' . $searchItems . '%');
                    });
                } else {
                    $query->orWhere($field['field'], 'ilike', '%' . $searchItems . '%');
                }
            }
        });

        return $builder;
    }

    public function applyPagination(Builder $builder = null, array $paginationItems = [])
    {
        $builder = $this->checkBuilder($builder);

        if(!$paginationItems) {
            return $builder;
        }

        $size = Arr::get($paginationItems, 'pageSize', 10);
        $page = Arr::get($paginationItems, 'page', 1);

        $builder->skip(($page - 1) * $size)
                ->take($size);

        return $builder;
    }

    public function applyTotal(Builder $builder = null)
    {
        $builder = $this->checkBuilder($builder);
        return $builder->get()->count();
    }

    private function checkBuilder(Builder $builder = null)
    {
        return $builder ? $builder : $this->builder;
    }

    public function archive($status, $id)
    {
        $record = $this->builder->find($id);

        $record->update($status);

        return $record;
    }

    public function getOneWithoutCheckId($params)
    {
        $this->applyFilters($this->builder, $params['filters']);
        $this->applySelect($this->builder, $params['select']);
        $this->applyWith($this->builder, $params['with']);
        $this->applyWithCount($this->builder, $params['withCount']);
        $this->applySearch($this->builder, $params['search']);
        $payload = $this->builder->first();

        if(!$payload) {
            return [ 'data' => null ];
        }

        return $payload;
    }

}
