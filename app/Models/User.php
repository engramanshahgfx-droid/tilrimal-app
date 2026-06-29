<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'phone',
        'nationality', 'passport_number', 'passport_expiry',
        'birth_date', 'gender', 'is_active', 'is_admin',
        'otp', 'otp_expires_at', 'phone_verified',
    ];

    protected $hidden = [
        'password', 'remember_token', 'otp',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'otp_expires_at'    => 'datetime',
            'passport_expiry'   => 'date',
            'birth_date'        => 'date',
            'password'          => 'hashed',
            'is_active'         => 'boolean',
            'is_admin'          => 'boolean',
            'phone_verified'    => 'boolean',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function supportTickets()
    {
        return $this->hasMany(SupportTicket::class);
    }
}
