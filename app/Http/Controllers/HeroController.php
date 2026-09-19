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
        return Inertia::render('heroes/show', ['hero' => $hero,]);
    }
}
