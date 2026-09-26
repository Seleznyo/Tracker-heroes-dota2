<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function index() {
        return Inertia::render('heroes/index', [
            'heroes' => Hero::orderBy('name')->get(),
        ]);
    }

    public function show(Hero $hero) {
        
        $hero->load(['heroStats' => function($query) {
            $query->orderByDesc('month');
        }]);
        //dd($hero->heroStats[0]);
        return Inertia::render('heroes/show', ['hero' => $hero]);
    }
}
