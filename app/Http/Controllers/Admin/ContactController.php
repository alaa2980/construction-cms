<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $messages = Contact::orderBy('is_read', 'asc')->latest()->get();

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages
        ]);
    }

    public function markAsRead(Contact $message)
    {
        $message->update(['is_read' => true]);
        
        return redirect()->back()->with('success', 'Message marked as read.');
    }

    public function destroy(Contact $message)
    {
        $message->delete();
        
        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}