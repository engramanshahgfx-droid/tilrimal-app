<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'title', 'location', 'trip_type', 'price', 'image', 'nights_count', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price'     => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function cities()
    {
        return $this->hasMany(PackageCity::class)->orderBy('sort_order');
    }

    public function activities()
    {
        return $this->hasMany(PackageActivity::class);
    }
}
