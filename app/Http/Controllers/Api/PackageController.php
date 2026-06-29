<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::with(['cities', 'activities'])
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($packages);
    }

    public function show(Package $package)
    {
        $package->load(['cities', 'activities']);
        return response()->json($package);
    }
}
