<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PackageActivity extends Model
{
    protected $fillable = ['package_id', 'activity_name'];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
