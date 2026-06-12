<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\FlightBooking;
use App\Models\Passenger;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['flightBooking', 'passengers'])
            ->where('user_id', auth('api')->id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($bookings);
    }

    public function show(Booking $booking)
    {
        if ($booking->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        $booking->load(['flightBooking', 'passengers']);
        return response()->json($booking);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type'                => 'required|in:flight,hotel,package,activity',
            'price'               => 'required|numeric',
            'notes'               => 'nullable|string',
            'passengers'          => 'nullable|array',
            'passengers.*.name'   => 'required_with:passengers|string',
            'passengers.*.email'  => 'nullable|email',
            'passengers.*.phone'  => 'nullable|string',
            'passengers.*.passport_number' => 'nullable|string',
            'passengers.*.passport_expiry' => 'nullable|date',
            'passengers.*.birth_date'      => 'nullable|date',
            'passengers.*.nationality'     => 'nullable|string',
            'passengers.*.gender'          => 'nullable|in:male,female',
        ]);

        $booking = Booking::create([
            'user_id' => auth('api')->id(),
            'type'    => $data['type'],
            'status'  => 'pending',
            'price'   => $data['price'],
            'notes'   => $data['notes'] ?? null,
        ]);

        foreach ($data['passengers'] ?? [] as $passenger) {
            Passenger::create(array_merge($passenger, ['booking_id' => $booking->id]));
        }

        $booking->load('passengers');
        return response()->json($booking, 201);
    }

    public function storeFlight(Request $request)
    {
        $data = $request->validate([
            'price'                    => 'required|numeric',
            'flight.airline'           => 'required|string',
            'flight.departure_airport' => 'required|string',
            'flight.arrival_airport'   => 'required|string',
            'flight.departure_time'    => 'required|string',
            'flight.arrival_time'      => 'required|string',
            'flight.departure_date'    => 'required|date',
            'flight.duration'          => 'required|string',
            'flight.stops'             => 'integer|min:0',
            'passengers'               => 'required|array|min:1',
            'passengers.*.name'           => 'required|string',
            'passengers.*.email'          => 'required|email',
            'passengers.*.phone'          => 'required|string',
            'passengers.*.passport_number' => 'required|string',
            'passengers.*.passport_expiry' => 'required|date',
            'passengers.*.birth_date'     => 'required|date',
            'passengers.*.nationality'    => 'required|string',
            'passengers.*.gender'         => 'required|in:male,female',
        ]);

        $booking = Booking::create([
            'user_id' => auth('api')->id(),
            'type'    => 'flight',
            'status'  => 'pending',
            'price'   => $data['price'],
        ]);

        FlightBooking::create(array_merge($data['flight'], ['booking_id' => $booking->id]));

        foreach ($data['passengers'] as $passenger) {
            Passenger::create(array_merge($passenger, ['booking_id' => $booking->id]));
        }

        $booking->load(['flightBooking', 'passengers']);
        return response()->json($booking, 201);
    }

    public function cancel(Booking $booking)
    {
        if ($booking->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        $booking->update(['status' => 'cancelled', 'is_current' => false]);
        return response()->json(['message' => 'تم إلغاء الحجز']);
    }
}
