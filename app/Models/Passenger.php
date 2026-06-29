<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    protected $fillable = [
        'booking_id', 'name', 'email', 'phone',
        'passport_number', 'passport_expiry', 'birth_date', 'nationality', 'gender',
    ];

    protected function casts(): array
    {
        return [
            'passport_expiry' => 'date',
            'birth_date'      => 'date',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
