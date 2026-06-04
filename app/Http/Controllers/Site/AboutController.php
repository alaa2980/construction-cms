<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Site/About', [
            'settings' => $settings
        ]);
    }
}