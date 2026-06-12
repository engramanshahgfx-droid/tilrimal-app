<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title', 'description', 'image',
        'original_price', 'discounted_price', 'discount_percentage',
        'expires_at', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'original_price'    => 'decimal:2',
            'discounted_price'  => 'decimal:2',
            'expires_at'        => 'datetime',
            'is_active'         => 'boolean',
        ];
    }
}
