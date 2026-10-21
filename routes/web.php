<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavoriteHeroController;
use App\Http\Controllers\HeroController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/heroes')->name('home');

Route::controller(HeroController::class)->group(function () {
    Route::get('/heroes', 'index')->name('heroes.index');
    Route::get('/heroes/{hero}', 'show')->name('heroes.show');
});

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/favorites', [FavoriteHeroController::class, 'index'])->name('favorites.index');
    Route::post('/heroes/{hero}/favorite', [FavoriteHeroController::class, 'store'])->name('heroes.favorite');
    Route::delete('/heroes/{hero}/favorite', [FavoriteHeroController::class, 'destroy'])->name('heroes.unfavorite');
});
