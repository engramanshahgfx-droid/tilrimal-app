<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    protected $fillable = [
        'airline', 'departure_airport', 'arrival_airport',
        'departure_time', 'arrival_time', 'departure_date',
        'duration', 'stops', 'price', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'departure_date' => 'date',
            'price'          => 'decimal:2',
            'is_active'      => 'boolean',
        ];
    }
}
