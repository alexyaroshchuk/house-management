<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date',
        'recommend_payment',
        'fact_payment',
        'source',
        'apartment_id'
    ];


    /**
     * @param  string  $value
     * @return string
     */
    public function getSourceAttribute($value)
    {
        return self::PAYMENT_TYPES[$value];
    }

    const PAYMENT_TYPES = [
        'cash' => 'Наличные',
        'card' => 'Банковский счет',
        'kua'  => 'КУА'
    ];

    /**
     * @return BelongsTo
     */
    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
}
