<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;

class HotelController extends Controller
{
    public function index()
    {
        return response()->json(
            Hotel::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function show(Hotel $hotel)
    {
        return response()->json($hotel);
    }
}
