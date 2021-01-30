<?php namespace App\Services;

class ServicesManager
{
    public $apartment;

    public $payment;

    public $users;

    public $comment;

    public function __construct()
    {
        $this->users = app(UserService::class);
        $this->payment = app(PaymentService::class);
        $this->apartment = app(ApartmentService::class);
        $this->comment = app(CommentService::class);
    }
}
