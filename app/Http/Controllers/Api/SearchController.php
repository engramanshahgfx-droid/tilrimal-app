<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Search;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /** Logs a flight/hotel/trip search request coming from the app. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'type'    => ['required', 'in:flight,hotel,trip'],
            'payload' => ['nullable', 'array'],
        ]);

        $search = Search::create([
            'user_id' => optional(auth('api')->user())->id,
            'type'    => $data['type'],
            'payload' => $data['payload'] ?? [],
        ]);

        return response()->json(['id' => $search->id], 201);
    }
}
