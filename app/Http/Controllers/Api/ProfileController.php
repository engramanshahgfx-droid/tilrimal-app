<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(auth('api')->user());
    }

    public function update(Request $request)
    {
        $user = auth('api')->user();

        $data = $request->validate([
            'name'            => 'sometimes|string|max:255',
            'phone'           => 'sometimes|string',
            'nationality'     => 'sometimes|string',
            'passport_number' => 'sometimes|string',
            'passport_expiry' => 'sometimes|date',
            'birth_date'      => 'sometimes|date',
            'gender'          => 'sometimes|in:male,female',
        ]);

        $user->update($data);

        return response()->json($user);
    }

    public function changePassword(Request $request)
    {
        $user = auth('api')->user();

        $request->validate([
            'current_password' => 'required',
            'password'         => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'كلمة المرور الحالية غير صحيحة'], 422);
        }

        $user->update(['password' => $request->password]);

        return response()->json(['message' => 'تم تغيير كلمة المرور بنجاح']);
    }
}
