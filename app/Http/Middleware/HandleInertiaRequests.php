<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use App\Models\Setting;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    // public function share(Request $request): array
    // {
    //     return [
    //         ...parent::share($request),
    //         'auth' => [
    //             'user' => $request->user(),
    //         ],
    //     ];
    // }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */

    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $direction = $locale === 'ar' ? 'rtl' : 'ltr';

        $langPath = base_path("lang/{$locale}.json");
        $translations = file_exists($langPath) 
            ? json_decode(file_get_contents($langPath), true) 
            : [];

        $settings = Setting::pluck('value', 'key')->all();

        return array_merge(parent::share($request), [

            'auth' => [
                'user' => $request->user(),
            ],

            'locale' => [
                'current' => $locale,
                'dir' => $direction,
                'translations' => $translations,
            ],

            'settings' => $settings,
        ]);
    }
}
