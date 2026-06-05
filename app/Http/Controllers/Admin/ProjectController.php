<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProjectImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('category')->latest()->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Projects/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'client_name' => 'nullable|string|max:255',
            'completion_date' => 'nullable|date',
            'is_featured' => 'required|boolean',
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // حد أقصى 5 ميجا للصورة
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        if (Project::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $validated['slug'] . '-' . uniqid();
        }

        if ($request->hasFile('cover_image')) {
            $uploadedFileUrl = Cloudinary::upload($request->file('cover_image')->getRealPath())->getSecurePath();
            $validated['cover_image'] = $uploadedFileUrl;
        }

        $project = Project::create($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                $uploadedGalleryUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();
                
                ProjectImage::create([
                    'project_id' => $project->id,
                    'image_path' => $uploadedGalleryUrl,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project published successfully with its gallery.');
    }

    public function show(Project $project)
    {
        $project->load(['images', 'category']);

        return Inertia::render('Admin/Projects/Show', [
            'project' => $project
        ]);
    }

    public function edit(Project $project)
    {
        $project->load('images');
        $categories = Category::all();

        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'client_name' => 'nullable|string|max:255',
            'completion_date' => 'nullable|date',
            'is_featured' => 'required|boolean',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        if ($project->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
            if (Project::where('slug', $validated['slug'])->where('id', '!=', $project->id)->exists()) {
                $validated['slug'] = $validated['slug'] . '-' . uniqid();
            }
        }

        if ($request->hasFile('cover_image')) {
            $oldCoverPath = str_replace('/storage/', '', $project->cover_image);
            Storage::disk('public')->delete($oldCoverPath);

            $uploadedFileUrl = Cloudinary::upload($request->file('cover_image')->getRealPath())->getSecurePath();
            $validated['cover_image'] = $uploadedFileUrl;
        }
        else {
            $validated['cover_image'] = $project->cover_image;
        }

        $project->update($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                $uploadedGalleryUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();
                ProjectImage::create([
                    'project_id' => $project->id,
                    'image_path' => $uploadedGalleryUrl,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $coverPath = str_replace('/storage/', '', $project->cover_image);
        Storage::disk('public')->delete($coverPath);

        foreach ($project->images as $image) {
            $galleryPath = str_replace('/storage/', '', $image->image_path);
            Storage::disk('public')->delete($galleryPath);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project and all its assets deleted successfully.');
    }
}