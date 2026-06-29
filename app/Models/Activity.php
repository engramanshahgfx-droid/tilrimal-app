<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title', 'description', 'location', 'price', 'image', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price'     => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
}
