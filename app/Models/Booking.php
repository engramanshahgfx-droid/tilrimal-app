<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id', 'type', 'status', 'price', 'is_current', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'price'      => 'decimal:2',
            'is_current' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function flightBooking()
    {
        return $this->hasOne(FlightBooking::class);
    }

    public function passengers()
    {
        return $this->hasMany(Passenger::class);
    }
}
