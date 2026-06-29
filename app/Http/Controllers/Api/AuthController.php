<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'phone'    => 'nullable|string|unique:users',
        ], [
            'name.required'     => 'الاسم مطلوب',
            'email.required'    => 'البريد الإلكتروني مطلوب',
            'email.email'       => 'صيغة البريد الإلكتروني غير صحيحة',
            'email.unique'      => 'هذا البريد الإلكتروني مسجّل بالفعل',
            'password.required' => 'كلمة المرور مطلوبة',
            'password.min'      => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق',
            // 'phone.required'    => 'رقم الجوال مطلوب',
            'phone.unique'      => 'رقم الجوال مسجّل بالفعل',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => $data['password'],
            'phone'    => $data['phone'] ?? null,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'بيانات الدخول غير صحيحة'], 401);
        }

        $user = auth('api')->user();

        if (!$user->is_active) {
            auth('api')->logout();
            return response()->json(['message' => 'الحساب موقوف، تواصل مع الدعم'], 403);
        }

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح']);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function refresh()
    {
        $token = auth('api')->refresh();
        return response()->json(['token' => $token]);
    }

    public function sendOtp(Request $request)
    {
        $request->validate(['phone' => 'required|string']);

        $user = User::where('phone', $request->phone)->first();

        if (!$user) {
            return response()->json(['message' => 'رقم الهاتف غير مسجل'], 404);
        }

        $otp = rand(1000, 9999);
        $user->update([
            'otp'            => $otp,
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        // هنا تقدر تضيف إرسال SMS
        return response()->json(['message' => 'تم إرسال رمز التحقق', 'otp' => $otp]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp'   => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user || $user->otp !== $request->otp || now()->isAfter($user->otp_expires_at)) {
            return response()->json(['message' => 'رمز التحقق غير صحيح أو منتهي'], 422);
        }

        $user->update(['otp' => null, 'otp_expires_at' => null, 'phone_verified' => true]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }
}
