<?php namespace App\Transformers;

use Illuminate\Http\Request;

class Transformer
{
    public static function toResponse(array $data, array $params)
    {
        if($params['pagination']){
            $params['pagination'] = array_merge((array)$params['pagination'], ['total' => $data['total']]);
        }

        return [
            'availableFilters' => [],
            'pagination'       => $params['pagination'],
            'payload'          => $data['data'],
            'filters'          => $params['filters'],
            'search'           => $params['search'],
            'with'             => $params['with'],
            'withCount'        => $params['withCount'],
            'select'           => $params['select'],
            'omit'             => $params['omit'],
            'sorting'          => $params['sorting']
        ];
    }

    public static function toArray(Request $request)
    {
        return [
            'filters'       => json_decode($request->filters, true) ?? [],
            'withCount'     => json_decode($request->withCount, true) ?? [],
            'select'        => json_decode($request->select, true) ?? [],
            'with'          => json_decode($request->with, true) ?? [],
            'omit'          => json_decode($request->omit, true) ?? [],
            'pagination'    => json_decode($request->pagination, true) ?? [],
            'sorting'       => json_decode($request->sorting, true) ?? [],
            'search'        => $request->search ?? "",
            'dataForSearch' => []
        ];
    }

    public static function dateFilters(Request $request)
    {
        $params = [
            'filters' => json_decode($request->filters, true)
        ];

        if(isset($params['filters']['period'])) {
            switch ($params['filters']['period']) {
                case 'all':
                    $dateStart = '01-01-2000';
                    $dateEnd   = '01-01-2100';
                    break;
                case 'year':
                    $dateStart = new \DateTime('first day of January this year');
                    $dateEnd   = today();
                    break;
                case 'month':
                    $dateStart = date("Y/m/d", strtotime("-1 months"));
                    $dateEnd   = today();
                    break;
                default:
                    $dateStart = $params['filters']['period']['dateStart'];
                    $dateEnd   = $params['filters']['period']['dateEnd'];
                    break;
            }
        } else {
            $dateStart = '01-01-2000';
            $dateEnd   = '01-01-2100';
        }

        return [
            'dateStart' => $dateStart,
            'dateEnd'   => $dateEnd
        ];
    }
}
