<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Offer::query();

        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $offers = $query->orderBy('sort_order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Offers/Index', [
            'offers'  => $offers,
            'filters' => $request->only(['search', 'is_active']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Offers/Form', ['offer' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['image'] = $this->handleImage($request, null);

        Offer::create($data);

        return redirect()->route('admin.offers.index')->with('success', __('messages.created'));
    }

    public function edit(Offer $offer): Response
    {
        return Inertia::render('Offers/Form', ['offer' => $offer]);
    }

    public function update(Request $request, Offer $offer): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['image'] = $this->handleImage($request, $offer);

        $offer->update($data);

        return redirect()->route('admin.offers.index')->with('success', __('messages.updated'));
    }

    public function destroy(Offer $offer): RedirectResponse
    {
        if ($offer->image) {
            Storage::disk('public')->delete($offer->image);
        }
        $offer->delete();

        return back()->with('success', __('messages.deleted'));
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'title'               => ['required', 'string', 'max:255'],
            'description'         => ['nullable', 'string'],
            'original_price'      => ['nullable', 'numeric', 'min:0'],
            'discounted_price'    => ['nullable', 'numeric', 'min:0'],
            'discount_percentage' => ['nullable', 'integer', 'min:0', 'max:100'],
            'expires_at'          => ['nullable', 'date'],
            'sort_order'          => ['nullable', 'integer'],
            'is_active'           => ['boolean'],
            'image'               => ['nullable', 'image', 'max:4096'],
        ]);
    }

    private function handleImage(Request $request, ?Offer $offer): ?string
    {
        if ($request->hasFile('image')) {
            if ($offer?->image) {
                Storage::disk('public')->delete($offer->image);
            }
            return $request->file('image')->store('offers', 'public');
        }

        return $offer?->image;
    }
}
