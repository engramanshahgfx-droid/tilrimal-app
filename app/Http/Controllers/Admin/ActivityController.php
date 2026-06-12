<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Activity::query();

        if ($search = $request->input('search')) {
            $query->where(fn ($q) => $q
                ->where('title', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%"));
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $activities = $query->orderBy('sort_order')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Activities/Index', [
            'activities' => $activities,
            'filters'    => $request->only(['search', 'is_active']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Activities/Form', ['activity' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['image'] = $this->handleImage($request, null);

        Activity::create($data);

        return redirect()->route('admin.activities.index')
            ->with('success', __('messages.created'));
    }

    public function edit(Activity $activity): Response
    {
        return Inertia::render('Activities/Form', ['activity' => $activity]);
    }

    public function update(Request $request, Activity $activity): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['image'] = $this->handleImage($request, $activity);

        $activity->update($data);

        return redirect()->route('admin.activities.index')
            ->with('success', __('messages.updated'));
    }

    public function destroy(Activity $activity): RedirectResponse
    {
        if ($activity->image) {
            Storage::disk('public')->delete($activity->image);
        }
        $activity->delete();

        return back()->with('success', __('messages.deleted'));
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'location'    => ['required', 'string', 'max:255'],
            'price'       => ['required', 'numeric', 'min:0'],
            'sort_order'  => ['nullable', 'integer'],
            'is_active'   => ['boolean'],
            'image'       => ['nullable', 'image', 'max:4096'],
        ]);
    }

    private function handleImage(Request $request, ?Activity $activity): ?string
    {
        if ($request->hasFile('image')) {
            if ($activity?->image) {
                Storage::disk('public')->delete($activity->image);
            }
            return $request->file('image')->store('activities', 'public');
        }

        return $activity?->image;
    }
}
