<?php namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    const ROLE = [
        'admin', 'manager'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     *
     */
    const ROLES = [
        'admin'    => 'Админ',
        'manager'  => 'Менеджер'
    ];

    /**
     * @return bool
     */
    public function isAdmin() : bool
    {
        $role = Auth::user()->role;

        return $role == "admin" ? true : false;
    }

    /**
     * @return bool
     */
    public function isManager() : bool
    {
        $role = Auth::user()->role;

        return $role == "manager" ? true : false;
    }
}
