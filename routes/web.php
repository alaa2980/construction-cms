<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SettingController;

use App\Http\Controllers\Site\HomeController as SiteHomeController;
use App\Http\Controllers\Site\AboutController as SiteAboutController;
use App\Http\Controllers\Site\ServiceController as SiteServiceController;
use App\Http\Controllers\Site\ProjectController as SiteProjectController;
use App\Http\Controllers\Site\ContactController as SiteContactController;

Route::get('/', function () {
    return redirect()->to('/en');
});

Route::prefix('{locale}')
    ->where(['locale' => 'ar|en']) // حصر البادئة بـ ar أو en فقط
    ->middleware([\App\Http\Middleware\SetLocale::class])
    ->group(function () {

    Route::get('/', [SiteHomeController::class, 'index'])->name('site.home');

    Route::get('/about', [SiteAboutController::class, 'index'])
    ->name('site.about');

    Route::get('/services', [SiteServiceController::class, 'index'])
    ->name('site.services.index');

    Route::get('/services/{service}/show', [SiteServiceController::class, 'show'])
    ->name('site.services.show');

    Route::get('/portfolio', [SiteProjectController::class, 'index'])
    ->name('site.portfolio.index');

    Route::get('/portfolio/{project:slug}/show', [SiteProjectController::class, 'show'])
    ->name('site.portfolio.show');

    Route::get('/contact', [SiteContactController::class, 'index'])
    ->name('site.contact.index');

    Route::post('/contact-submit', [SiteContactController::class, 'store'])
    ->name('site.contact.store');

});

Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    
    /* Dashboard route */
    Route::get('/dashboard', DashboardController::class)->name('admin.dashboard');

    /* Service routes */
    Route::get('/services', [ServiceController::class, 'index'])->name('admin.services.index');
    Route::get('/services/create', [ServiceController::class, 'create'])->name('admin.services.create');
    Route::post('/services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::get('/services/{service}/edit', [ServiceController::class, 'edit'])->name('admin.services.edit');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('admin.services.destroy');
    
    /* Project routes */
    Route::get('/projects', [ProjectController::class, 'index'])->name('admin.projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
    Route::get('/projects/{project}/show', [ProjectController::class, 'show'])->name('admin.projects.show');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');

    /* Category routes */
    Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    /* Message routes */
    Route::get('/messages', [ContactController::class, 'index'])->name('admin.messages.index');
    Route::patch('/messages/{message}/read', [ContactController::class, 'markAsRead'])->name('admin.messages.read');
    Route::delete('/messages/{message}', [ContactController::class, 'destroy'])->name('admin.messages.destroy');

    /* Setting routes */
    Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('admin.settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';