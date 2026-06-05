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

        if ($request->hasFile('cover_image')) {
            // 1. فحص هل المتغيرات مقروءة داخل لارافل أم لا؟
            dd([
                'cloud_name' => config('cloudinary.cloud_name'),
                'api_key'    => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret') ? 'موجود ومتوفر' : 'فارغ/غير مقروء',
            ]);
        }
        
        // رفع الصورة الأساسية بأمان
        if ($request->hasFile('cover_image')) {
            try {
                // كود مؤقت للتأكد من اتصال الـ SSL محلياً فقط (احذفه قبل الرفع لـ Render)
                config(['cloudinary.guzzle_options.verify' => false]);
                $upload = cloudinary()->upload($request->file('cover_image')->getRealPath());
                
                if ($upload && $upload->getSecurePath()) {
                    $validated['cover_image'] = $upload->getSecurePath();
                } else {
                    return redirect()->back()->withErrors(['cover_image' => 'عذراً، فشل الرفع السحابي وتأكد من إعدادات المتغيرات.']);
                }
            } catch (\Exception $e) {
                \Log::error('Cloudinary Store Cover Error: ' . $e->getMessage());
                return redirect()->back()->withErrors(['cover_image' => 'فشل الرفع: ' . $e->getMessage()]);
            }
        }

        $project = Project::create($validated);

        // رفع صور المعرض بأمان
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $image) {
                try {
                    // كود مؤقت للتأكد من اتصال الـ SSL محلياً فقط (احذفه قبل الرفع لـ Render)
                    config(['cloudinary.guzzle_options.verify' => false]);
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
                // حذف الصورة القديمة من Cloudinary مباشرة إن وجدت
                if ($project->cover_image) {
                    $publicId = $this->getCloudinaryPublicId($project->cover_image);
                    if ($publicId) {
                        cloudinary()->destroy($publicId);
                    }
                }

                // كود مؤقت للتأكد من اتصال الـ SSL محلياً فقط (احذفه قبل الرفع لـ Render)
                config(['cloudinary.guzzle_options.verify' => false]);
                // رفع الصورة الجديدة
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
                    // كود مؤقت للتأكد من اتصال الـ SSL محلياً فقط (احذفه قبل الرفع لـ Render)
                    config(['cloudinary.guzzle_options.verify' => false]);
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
            // 1. حذف الغلاف من Cloudinary
            if ($project->cover_image) {
                $coverPublicId = $this->getCloudinaryPublicId($project->cover_image);
                if ($coverPublicId) {
                    cloudinary()->destroy($coverPublicId);
                }
            }

            // 2. حذف صور المعرض من Cloudinary
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

        // 3. حذف السجل من قاعدة البيانات (سيقوم بحذف صور الـ Gallery إذا كان هناك Cascade Delete)
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project and all its assets deleted successfully.');
    }

    /**
     * دالة مساعدة لاستخراج الـ Public ID الخاص بالملف من رابط Cloudinary الآمن
     */
    private function getCloudinaryPublicId($url)
    {
        // استخراج اسم الملف مع المسار الفرعي بعد مجلد الـ upload/vXXXXXXXX/
        preg_match('/\/upload\/(?:v\d+\/)?([^\.]+)/', $url, $matches);
        return isset($matches[1]) ? $matches[1] : null;
    }
}