<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Package::query();

        if ($search = $request->input('search')) {
            $query->where(fn ($q) => $q
                ->where('title', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%"));
        }

        if ($request->filled('trip_type')) {
            $query->where('trip_type', $request->input('trip_type'));
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $packages = $query->orderBy('sort_order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Packages/Index', [
            'packages' => $packages,
            'filters'  => $request->only(['search', 'trip_type', 'is_active']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Packages/Form', ['package' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        DB::transaction(function () use ($request, $data) {
            $package = Package::create([
                ...$data,
                'image' => $this->handleImage($request, null),
            ]);
            $this->syncRelations($package, $data);
        });

        return redirect()->route('admin.packages.index')->with('success', __('messages.created'));
    }

    public function edit(Package $package): Response
    {
        $package->load(['cities' => fn ($q) => $q->orderBy('sort_order'), 'activities']);

        return Inertia::render('Packages/Form', ['package' => $package]);
    }

    public function update(Request $request, Package $package): RedirectResponse
    {
        $data = $this->validateData($request);

        DB::transaction(function () use ($request, $package, $data) {
            $package->update([
                ...$data,
                'image' => $this->handleImage($request, $package),
            ]);
            $this->syncRelations($package, $data);
        });

        return redirect()->route('admin.packages.index')->with('success', __('messages.updated'));
    }

    public function destroy(Package $package): RedirectResponse
    {
        if ($package->image) {
            Storage::disk('public')->delete($package->image);
        }
        $package->cities()->delete();
        $package->activities()->delete();
        $package->delete();

        return back()->with('success', __('messages.deleted'));
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'title'                  => ['required', 'string', 'max:255'],
            'location'               => ['required', 'string', 'max:255'],
            'trip_type'              => ['required', 'in:local,international'],
            'price'                  => ['required', 'numeric', 'min:0'],
            'nights_count'           => ['nullable', 'integer', 'min:0'],
            'sort_order'             => ['nullable', 'integer'],
            'is_active'              => ['boolean'],
            'image'                  => ['nullable', 'image', 'max:4096'],
            'cities'                 => ['array'],
            'cities.*.city'          => ['required', 'string', 'max:255'],
            'cities.*.nights'        => ['required', 'integer', 'min:0'],
            'cities.*.sort_order'    => ['nullable', 'integer'],
            'activities'             => ['array'],
            'activities.*.activity_name' => ['required', 'string', 'max:255'],
        ]);
    }

    private function syncRelations(Package $package, array $data): void
    {
        $package->cities()->delete();
        foreach ($data['cities'] ?? [] as $i => $city) {
            $package->cities()->create([
                'city'       => $city['city'],
                'nights'     => $city['nights'] ?? 1,
                'sort_order' => $city['sort_order'] ?? $i,
            ]);
        }

        $package->activities()->delete();
        foreach ($data['activities'] ?? [] as $activity) {
            $package->activities()->create([
                'activity_name' => $activity['activity_name'],
            ]);
        }
    }

    private function handleImage(Request $request, ?Package $package): ?string
    {
        if ($request->hasFile('image')) {
            if ($package?->image) {
                Storage::disk('public')->delete($package->image);
            }
            return $request->file('image')->store('packages', 'public');
        }

        return $package?->image;
    }
}
