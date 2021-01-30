<?php namespace App\Services;

use App\Models\Apartment;
use App\Repositories\ApartmentRepo;
use Illuminate\Support\Collection;

class ApartmentService extends BaseService
{
    protected string $repository = ApartmentRepo::class;

    public function getAll(array $params = [])
    {
        $box = new Collection();
        $parking = new Collection();
        $apartments = new Collection();
//        $params['with'] = [
//            'payments'
//        ];
        $spaces = parent::getAll($params);


        foreach ($spaces as $space) {
//            $this->getAllPaymentForApartment($space);

            if ($space->getAttributes()['type'] == 'box') {
                $box[] = $space;
            }
            if ($space->getAttributes()['type'] == 'parking') {
                $parking[] = $space;
            }
            if ($space->getAttributes()['type'] == 'apartment') {
                $apartments[] = $space;
            }
        }
        $maxCountApartmentOnFloor = $this->getMaxCountApartmentsOnFloor($apartments);
        return [
            'boxes' => $this->getParkingsAndBoxesGroupingByFloor($box),
            'parkings' => $this->getParkingsAndBoxesGroupingByFloor($parking),
            'apartments' => $apartments,
            'maxCountApartmentOnFloor' => $maxCountApartmentOnFloor
        ];
    }

    public function getOne($id, array $params = [])
    {
        $params['with'] = [
            'payments',
            'comments'
        ];

        $space = parent::getOne($id, $params);
        $this->getAllPaymentForApartment($space);

        return $space;
    }

    public function getMaxCountApartmentsOnFloor($apartments)
    {
        return $apartments->groupBy('floor')->map(function ($item, $key) {
            return count($item);
        })->max();
    }

    public function getParkingsAndBoxesGroupingByFloor($apartments)
    {
        return $apartments->groupBy('floor');
    }

    public function getAllPaymentForApartment(Apartment $space)
    {
        $payments = $space->first_payment;

        foreach ($space->payments as $payment) {
            $payments += $payment->fact_payment;
        }
        $space->totalPayment = $payments;
        $space->percent = @($payments/$space->price*100);


        return $space;
    }
}
