<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingController extends Controller
{
    /** Public app configuration as a flat key => value map. */
    public function index()
    {
        return response()->json(Setting::pluck('value', 'key'));
    }
}
