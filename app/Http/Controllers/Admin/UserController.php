<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query();

        if ($search = $request->input('search')) {
            $query->where(fn ($q) => $q
                ->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%"));
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->filled('phone_verified')) {
            $query->where('phone_verified', $request->boolean('phone_verified'));
        }

        $users = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users'   => $users,
            'filters' => $request->only(['search', 'is_active', 'phone_verified']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Form', ['user' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request, null);

        if (empty($data['password'])) {
            unset($data['password']);
        }

        User::create($data);

        return redirect()->route('admin.users.index')->with('success', __('messages.created'));
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Users/Form', ['user' => $user]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $this->validateData($request, $user);

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->route('admin.users.index')->with('success', __('messages.updated'));
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return back()->with('success', __('messages.deleted'));
    }

    private function validateData(Request $request, ?User $user): array
    {
        return $request->validate([
            'name'            => ['required', 'string', 'max:255'],
            'email'           => ['required', 'email', Rule::unique('users', 'email')->ignore($user?->id)],
            'phone'           => ['nullable', 'string', 'max:50'],
            'password'        => [$user ? 'nullable' : 'required', 'string', 'min:8'],
            'is_active'       => ['boolean'],
            'is_admin'        => ['boolean'],
            'phone_verified'  => ['boolean'],
            'nationality'     => ['nullable', 'string', 'max:255'],
            'passport_number' => ['nullable', 'string', 'max:255'],
            'passport_expiry' => ['nullable', 'date'],
            'birth_date'      => ['nullable', 'date'],
            'gender'          => ['nullable', 'in:male,female'],
        ]);
    }
}
