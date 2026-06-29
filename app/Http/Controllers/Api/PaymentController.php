<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    /**
     * Public: the Flutter app fetches the publishable key + mode from here
     * so the payment settings live in the backend (dashboard / .env).
     */
    public function config()
    {
        return response()->json([
            'publishable_key' => config('moyasar.publishable_key'),
            'currency'        => config('moyasar.currency', 'SAR'),
            'mode'            => config('moyasar.mode', 'test'),
        ]);
    }

    /**
     * Verifies a Moyasar payment with the secret key, then creates the booking.
     * This guarantees the payment really happened (not spoofed by the client).
     */
    public function verify(Request $request)
    {
        $data = $request->validate([
            'payment_id' => 'required|string',
            'type'       => 'nullable|in:flight,hotel,package,activity',
            'price'      => 'nullable|numeric',
        ]);

        $secret = config('moyasar.secret_key');
        if (empty($secret)) {
            return response()->json(['message' => 'لم يتم ضبط مفاتيح الدفع على الخادم'], 500);
        }

        $resp = Http::withBasicAuth($secret, '')
            ->acceptJson()
            ->get("https://api.moyasar.com/v1/payments/{$data['payment_id']}");

        if (!$resp->ok()) {
            return response()->json(['message' => 'تعذّر التحقق من عملية الدفع'], 422);
        }

        $payment = $resp->json();
        if (($payment['status'] ?? null) !== 'paid') {
            return response()->json([
                'message' => 'لم تكتمل عملية الدفع',
                'status'  => $payment['status'] ?? null,
            ], 422);
        }

        $booking = Booking::create([
            'user_id' => auth('api')->id(),
            'type'    => $data['type'] ?? 'activity',
            'status'  => 'booked',
            'price'   => isset($payment['amount']) ? $payment['amount'] / 100 : ($data['price'] ?? 0),
        ]);

        return response()->json($booking, 201);
    }
}
