<?php

use App\Http\Controllers\MagazineController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Rutas públicas de la Revista Fanzine Club Social y Federal
Route::get('/', [MagazineController::class, 'index'])->name('magazine.index');
Route::get('/articulo/{slug}', [MagazineController::class, 'article'])->name('magazine.article');
Route::get('/quienes-somos', [MagazineController::class, 'about'])->name('magazine.about');

// Rutas de administración / Auth existentes de Breeze
Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
