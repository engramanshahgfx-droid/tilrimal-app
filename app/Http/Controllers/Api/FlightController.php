<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flight;

class FlightController extends Controller
{
    public function index()
    {
        return response()->json(
            Flight::where('is_active', true)->orderBy('sort_order')->get()
        );
    }

    public function show(Flight $flight)
    {
        return response()->json($flight);
    }
}
