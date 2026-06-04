<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Site\ServiceController;
use App\Http\Controllers\Site\ProjectController;
use App\Models\Project;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $services = ServiceController::getForHome(6);

        $featuredProjects = ProjectController::featuredProjects(4);
        $categories = ProjectController::categories();

        return Inertia::render('Site/Home', [
            'services' => $services,
            'featuredProjects' => $featuredProjects,
            'categories' => $categories
        ]);
    }
}