<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text',
        'apartment_id',
        'space_id'
    ];

    /**
     * @return BelongsTo
     */
    public function space()
    {
        return $this->belongsTo(Space::class);
    }

    /**
     * @return BelongsTo
     */
    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
}
