<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Category;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('category')->latest()->get();
        $categories = $this->categories();

        return Inertia::render('Site/Portfolio/Index', [
            'projects' => $projects,
            'categories' => $categories
        ]);
    }

    public function show(Project $project)
    {
        $project->load(['images', 'category']);

        return Inertia::render('Site/Portfolio/Show', [
            'project' => $project
        ]);
    }

    public static function featuredProjects($limit = 4)
    {
        return Project::with('category')
            ->where('is_featured', true)->latest()
            ->take($limit)->get();
    }

    public static function categories()
    {
        return Category::get();
    }
}