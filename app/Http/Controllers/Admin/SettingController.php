<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->all();

        $defaultSettings = [
            'company_phone' => $settings['company_phone'] ?? '+967 772094945',
            'company_email' => $settings['company_email'] ?? 'info@constructionco.com',
            'company_address' => $settings['company_address'] ?? "60th Street, Sana'a, Yemen",
            'facebook_url' => $settings['facebook_url'] ?? '',
            'twitter_url' => $settings['twitter_url'] ?? '',
            'linkedin_url' => $settings['linkedin_url'] ?? '',
            'instagram_url' => $settings['instagram_url'] ?? '',
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $defaultSettings
        ]);
    }

    public function update(Request $request)
    {
        $inputs = $request->except('_token');

        foreach ($inputs as $key => $value) {
            
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'General settings updated successfully.');
    }
}