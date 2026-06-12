<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;

class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
            })
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($offers);
    }

    public function show(Offer $offer)
    {
        return response()->json($offer);
    }
}
