<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProjectImage;
use Illuminate\Support\Str;

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
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', 
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        if (Project::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $validated['slug'] . '-' . uniqid();
        }

        // استخدام المكتبة الرسمية الذكية للرفع بالاعتماد على الـ Unsigned Preset الجديد
        if ($request->hasFile('cover_image')) {
            try {
                $upload = cloudinary()->upload($request->file('cover_image')->getRealPath());
                
                if ($upload && $upload->getSecurePath()) {
                    $validated['cover_image'] = $upload->getSecurePath();
                } else {
                    return redirect()->back()->withErrors(['cover_image' => 'عذراً، فشل الحصول على رابط آمن من Cloudinary.']);
                }
            } catch (\Exception $e) {
                \Log::error('Cloudinary Store Cover Error: ' . $e->getMessage());
                return redirect()->back()->withErrors(['cover_image' => 'فشل الرفع السحابي: ' . $e->getMessage()]);
            }
        }

        $project = Project::create($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                try {
                    $uploadGallery = cloudinary()->upload($image->getRealPath());
                    
                    if ($uploadGallery && $uploadGallery->getSecurePath()) {
                        ProjectImage::create([
                            'project_id' => $project->id,
                            'image_path' => $uploadGallery->getSecurePath(),
                        ]);
                    }
                } catch (\Exception $e) {
                    \Log::error('Cloudinary Store Gallery Error: ' . $e->getMessage());
                }
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
            try {
                if ($project->cover_image) {
                    $publicId = $this->getCloudinaryPublicId($project->cover_image);
                    if ($publicId) {
                        cloudinary()->destroy($publicId);
                    }
                }

                $upload = cloudinary()->upload($request->file('cover_image')->getRealPath());
                
                if ($upload && $upload->getSecurePath()) {
                    $validated['cover_image'] = $upload->getSecurePath();
                } else {
                    $validated['cover_image'] = $project->cover_image;
                }
            } catch (\Exception $e) {
                \Log::error('Cloudinary Update Cover Error: ' . $e->getMessage());
                $validated['cover_image'] = $project->cover_image;
            }
        } else {
            $validated['cover_image'] = $project->cover_image;
        }

        $project->update($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                try {
                    $uploadGallery = cloudinary()->upload($image->getRealPath());
                    
                    if ($uploadGallery && $uploadGallery->getSecurePath()) {
                        ProjectImage::create([
                            'project_id' => $project->id,
                            'image_path' => $uploadGallery->getSecurePath(),
                        ]);
                    }
                } catch (\Exception $e) {
                    \Log::error('Cloudinary Update Gallery Error: ' . $e->getMessage());
                }
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        try {
            if ($project->cover_image) {
                $coverPublicId = $this->getCloudinaryPublicId($project->cover_image);
                if ($coverPublicId) {
                    cloudinary()->destroy($coverPublicId);
                }
            }

            foreach ($project->images as $image) {
                if ($image->image_path) {
                    $galleryPublicId = $this->getCloudinaryPublicId($image->image_path);
                    if ($galleryPublicId) {
                        cloudinary()->destroy($galleryPublicId);
                    }
                }
            }
        } catch (\Exception $e) {
            \Log::error('Cloudinary Delete Assets Error: ' . $e->getMessage());
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project and all its assets deleted successfully.');
    }

    private function getCloudinaryPublicId($url)
    {
        preg_match('/\/upload\/(?:v\d+\/)?([^\.]+)/', $url, $matches);
        return isset($matches[1]) ? $matches[1] : null;
    }
}