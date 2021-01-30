<?php namespace App\Http\Controllers;

use App\Http\Requests\ApartmentRequest;
use App\Models\Apartment;
use App\Services\ApartmentService;

class ApartmentController extends BaseController
{
    protected string $request = ApartmentRequest::class;

    protected string $model = Apartment::class;

    protected string $service = ApartmentService::class;

    public function addCommentToApartment($apartmentId)
    {
        return view("comment.create", [
            'apartment_id' => $apartmentId
        ]);
    }

    public function addPaymentToApartment($apartmentId)
    {
        return view("payment.create", [
            'apartment_id' => $apartmentId
        ]);
    }
}
