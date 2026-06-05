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

        // استخراج الرابط الأساسي لـ Supabase من الـ Endpoint تلقائياً
        $endpoint = config('filesystems.disks.s3.endpoint') ?? env('AWS_ENDPOINT');
        $supabaseUrl = str_replace('/storage/v1/s3', '', $endpoint);
        $bucketName = config('filesystems.disks.s3.bucket') ?? env('AWS_BUCKET', 'projects');

        // الرفع السحابي للملف الأساسي عبر S3 وبناء الرابط المباشر
        if ($request->hasFile('cover_image')) {
            try {
                $path = $request->file('cover_image')->store('covers', 's3');
                $validated['cover_image'] = rtrim($supabaseUrl, '/') . '/storage/v1/object/public/' . $bucketName . '/' . $path;
            } catch (\Exception $e) {
                \Log::error('Supabase Store Cover Error: ' . $e->getMessage());
                return redirect()->back()->withErrors(['cover_image' => 'فشل الرفع إلى Supabase: ' . $e->getMessage()]);
            }
        }

        $project = Project::create($validated);

        // الرفع السحابي لصور المعرض
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                try {
                    $galleryPath = $image->store('gallery', 's3');
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_path' => rtrim($supabaseUrl, '/') . '/storage/v1/object/public/' . $bucketName . '/' . $galleryPath,
                    ]);
                } catch (\Exception $e) {
                    \Log::error('Supabase Store Gallery Error: ' . $e->getMessage());
                }
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project published successfully.');
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

        $endpoint = config('filesystems.disks.s3.endpoint') ?? env('AWS_ENDPOINT');
        $supabaseUrl = str_replace('/storage/v1/s3', '', $endpoint);
        $bucketName = config('filesystems.disks.s3.bucket') ?? env('AWS_BUCKET', 'projects');

        if ($request->hasFile('cover_image')) {
            try {
                // حذف الصورة القديمة من السحاب السري لتوفير المساحة المتاحة
                if ($project->cover_image) {
                    $prefixPath = rtrim($supabaseUrl, '/') . '/storage/v1/object/public/' . $bucketName . '/';
                    $oldPath = str_replace($prefixPath, '', $project->cover_image);
                    Storage::disk('s3')->delete($oldPath);
                }

                $path = $request->file('cover_image')->store('covers', 's3');
                $validated['cover_image'] = rtrim($supabaseUrl, '/') . '/storage/v1/object/public/' . $bucketName . '/' . $path;
            } catch (\Exception $e) {
                \Log::error('Supabase Update Cover Error: ' . $e->getMessage());
                $validated['cover_image'] = $project->cover_image;
            }
        } else {
            $validated['cover_image'] = $project->cover_image;
        }

        $project->update($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                try {
                    $galleryPath = $image->store('gallery', 's3');
                    ProjectImage::create([
                        'project_id' => $project->id,
                        'image_path' => rtrim($supabaseUrl, '/') . '/storage/v1/object/public/' . $bucketName . '/' . $galleryPath,
                    ]);
                } catch (\Exception $e) {
                    \Log::error('Supabase Update Gallery Error: ' . $e->getMessage());
                }
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $endpoint = config('filesystems.disks.s3.endpoint') ?? env('AWS_ENDPOINT');
        $supabaseUrl = str_replace('/storage/v1/s3', '', $endpoint);
        $bucketName = config('filesystems.disks.s3.bucket') ?? env('AWS_BUCKET', 'projects');
        $prefixPath = rtrim($supabaseUrl, '/') . '/storage/v1/object/public/' . $bucketName . '/';

        try {
            // حذف الغلاف السحابي
            if ($project->cover_image) {
                $coverPath = str_replace($prefixPath, '', $project->cover_image);
                Storage::disk('s3')->delete($coverPath);
            }

            // حذف صور المعرض السحابية
            foreach ($project->images as $image) {
                if ($image->image_path) {
                    $galleryPath = str_replace($prefixPath, '', $image->image_path);
                    Storage::disk('s3')->delete($galleryPath);
                }
            }
        } catch (\Exception $e) {
            \Log::error('Supabase Delete Assets Error: ' . $e->getMessage());
        }

        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}