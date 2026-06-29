<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($activities);
    }

    public function show(Activity $activity)
    {
        return response()->json($activity);
    }
}
