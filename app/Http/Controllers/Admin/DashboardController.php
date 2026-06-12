<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Offer;
use App\Models\Package;
use App\Models\SupportTicket;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'users'              => User::count(),
                'bookings'           => Booking::count(),
                'confirmed_bookings' => Booking::where('status', 'booked')->count(),
                'open_tickets'       => SupportTicket::where('status', 'open')->count(),
                'packages'           => Package::count(),
                'offers'             => Offer::count(),
            ],
            'recent_bookings' => Booking::with('user:id,name')
                ->latest()
                ->take(5)
                ->get(['id', 'user_id', 'type', 'status', 'price', 'created_at']),
        ]);
    }
}
