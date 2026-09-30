<?php

use App\Http\Controllers\FavoriteHeroController;
use App\Http\Controllers\HeroController;
use App\Services\StratzService;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::controller(HeroController::class)->group(function () {
    Route::get('/heroes', 'index')->name('heroes.index');
    Route::get('/heroes/{hero}', 'show')->name('heroes.show');
});

Route::middleware('auth')->get('/auth-test', function () {
    return [
        'auth' => auth()->guard()->check(),
        'user' => auth()->guard()->user(),
    ];
});


Route::get('/stratz-test', function (StratzService $stratz) {
    $query = <<<'GRAPHQL'
    query {
        constants {
            heroes {
                id
                name
                displayName
            }
        }
    }
    GRAPHQL;

    return $stratz->query($query);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::post('/heroes/{hero}/favorite', [FavoriteHeroController::class, 'store'])->name('heroes.favorite');
});

require __DIR__ . '/settings.php';
