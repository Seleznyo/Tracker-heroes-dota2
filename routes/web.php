<?php

use App\Http\Controllers\HeroController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/heroes', [HeroController::class, 'index'])->name('heroes');

Route::get('/heroes/{name}', [HeroController::class, 'show'])->name('heroes.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
