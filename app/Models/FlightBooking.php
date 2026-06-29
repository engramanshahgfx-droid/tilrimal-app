<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlightBooking extends Model
{
    protected $fillable = [
        'booking_id', 'airline', 'departure_airport', 'arrival_airport',
        'departure_time', 'arrival_time', 'departure_date', 'duration', 'stops',
    ];

    protected function casts(): array
    {
        return [
            'departure_date' => 'date',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
