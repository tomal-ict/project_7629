<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index()
    {
        return view('admin.messages.index', ['items' => ContactMessage::latest()->get()]);
    }

    public function markRead(Request $request, ContactMessage $message)
    {
        $message->update(['is_read' => true]);

        return redirect()->route('admin.messages.index')->with('status', 'Message marked as read.');
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('status', 'Message deleted.');
    }
}