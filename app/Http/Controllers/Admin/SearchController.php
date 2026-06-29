<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Search;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Search::query()->with('user:id,name');

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        $searches = $query->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Searches/Index', [
            'searches' => $searches,
            'filters'  => $request->only(['type']),
        ]);
    }
}
