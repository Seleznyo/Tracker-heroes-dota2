<?php

use App\Http\Controllers\HeroController;
use App\Services\StratzService;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::controller(HeroController::class)->group(function () {
    Route::get('/heroes', 'index')->name('heroes.index');
    Route::get('/heroes/{hero}', 'show')->name('heroes.show');
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
});

require __DIR__ . '/settings.php';
