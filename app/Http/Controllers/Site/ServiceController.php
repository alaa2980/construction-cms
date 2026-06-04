<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)->latest()->get();
        
        return Inertia::render('Site/Services/Index', [
            'services' => $services
        ]);
    }

    public function show(Service $service)
    {
        return Inertia::render('Site/Services/Show', [
            'service' => $service
        ]);
    }

    public static function getForHome($limit = 6)
    {
        return Service::where('is_active', true)->latest()->take($limit)->get();
    }
}