<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupportTicketController extends Controller
{
    public function index(Request $request): Response
    {
        $query = SupportTicket::query()->with('user:id,name');

        if ($search = $request->input('search')) {
            $query->where('subject', 'like', "%{$search}%")
                ->orWhereHas('user', fn ($q) => $q->where('name', 'like', "%{$search}%"));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $tickets = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('SupportTickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function edit(SupportTicket $supportTicket): Response
    {
        $supportTicket->load('user:id,name,email');

        return Inertia::render('SupportTickets/Form', ['ticket' => $supportTicket]);
    }

    public function update(Request $request, SupportTicket $supportTicket): RedirectResponse
    {
        $data = $request->validate([
            'status'      => ['required', 'in:open,in_progress,closed'],
            'admin_reply' => ['nullable', 'string'],
        ]);

        $supportTicket->update($data);

        return redirect()->route('admin.support-tickets.index')->with('success', __('messages.updated'));
    }

    public function destroy(SupportTicket $supportTicket): RedirectResponse
    {
        $supportTicket->delete();

        return back()->with('success', __('messages.deleted'));
    }
}
