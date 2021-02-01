<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Apartment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number',
        'contract_number',
        'price',
        'first_payment',
        'correct_payment',
        'floor',
        'space',
        'status',
        'type',
        'count_payments'
    ];

    const STATUSES = [
        'sold'           => 'Продано',
        'not_sold'       => 'Не продано',
        'partially_sold' => 'Продано и не оплачено',
    ];

    const TYPES = [
        'apartment' => 'Апартаменты',
        'box'       => 'Бокс',
        'parking'   => 'Паркинг',
    ];

    /**
     * @param  string  $value
     * @return string
     */
    public function getStatusAttribute($value)
    {
        return self::STATUSES[$value];
    }

    /**
     * @param  string  $value
     * @return string
     */
    public function getTypeAttribute($value)
    {
        return self::TYPES[$value];
    }

    /**
     * @return hasMany
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * @return HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
