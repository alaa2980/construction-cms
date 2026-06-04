<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Service;
use App\Models\Contact;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $stats = [
            'total_projects'  => Project::count(),
            'active_services' => Service::where('is_active', true)->count(),
            'unread_messages' => Contact::where('is_read', false)->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}