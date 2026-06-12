<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Booking::query()->with('user:id,name');

        if ($search = $request->input('search')) {
            $query->whereHas('user', fn ($q) => $q->where('name', 'like', "%{$search}%"));
        }

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $bookings = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'filters'  => $request->only(['search', 'type', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Bookings/Form', [
            'booking' => null,
            'users'   => $this->users(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Booking::create($this->validateData($request));

        return redirect()->route('admin.bookings.index')->with('success', __('messages.created'));
    }

    public function edit(Booking $booking): Response
    {
        return Inertia::render('Bookings/Form', [
            'booking' => $booking,
            'users'   => $this->users(),
        ]);
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $booking->update($this->validateData($request));

        return redirect()->route('admin.bookings.index')->with('success', __('messages.updated'));
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();

        return back()->with('success', __('messages.deleted'));
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'user_id'    => ['required', 'exists:users,id'],
            'type'       => ['required', 'in:flight,hotel,package,activity'],
            'status'     => ['required', 'in:pending,booked,cancelled'],
            'price'      => ['required', 'numeric', 'min:0'],
            'is_current' => ['boolean'],
            'notes'      => ['nullable', 'string'],
        ]);
    }

    private function users()
    {
        return User::orderBy('name')->get(['id', 'name']);
    }
}
