<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        if (!in_array($locale, ['ar', 'en'])) {
            $locale = 'en';
        }

        App::setLocale($locale);

        URL::defaults(['locale' => $locale]);
        $request->route()->forgetParameter('locale');

        return $next($request);
    }
}