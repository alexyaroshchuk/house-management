<?php namespace App\Repositories;

class ReposManager
{
    public $users;

    public $comment;

    public $apartments;

    public $payments;

    public function __construct()
    {
        $this->apartments = app(ApartmentRepo::class);
        $this->comment = app(CommentRepo::class);
        $this->users = app(UserRepo::class);
        $this->payments = app(PaymentRepo::class);
    }
}
