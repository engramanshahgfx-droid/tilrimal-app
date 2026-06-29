<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Settings/Form', [
            'settings' => Setting::pluck('value', 'key'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'app_name'        => ['nullable', 'string', 'max:255'],
            'currency'        => ['nullable', 'string', 'max:10'],
            'support_phone'   => ['nullable', 'string', 'max:50'],
            'support_email'   => ['nullable', 'email', 'max:255'],
            'tax_percent'     => ['nullable', 'numeric', 'min:0', 'max:100'],
            'booking_enabled' => ['nullable', 'boolean'],
        ]);

        $data['booking_enabled'] = $request->boolean('booking_enabled') ? '1' : '0';

        Setting::setMany($data);

        return redirect()->route('admin.settings.edit')->with('success', __('messages.updated'));
    }
}
