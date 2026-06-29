<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function index()
    {
        $tickets = SupportTicket::where('user_id', auth('api')->id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($tickets);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $ticket = SupportTicket::create([
            'user_id' => auth('api')->id(),
            'subject' => $data['subject'],
            'message' => $data['message'],
        ]);

        return response()->json($ticket, 201);
    }

    public function show(SupportTicket $supportTicket)
    {
        if ($supportTicket->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'غير مصرح'], 403);
        }

        return response()->json($supportTicket);
    }
}
