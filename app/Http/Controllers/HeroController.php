<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function index()
    {
        return Inertia::render('heroes/index', [
            'heroes' => Hero::orderBy('name')->get(),
        ]);
    }

    public function show(Hero $hero)
    {

        $hero->load([
            'heroStats' => function ($query) {
                $query->orderByDesc('month');
            },
            'heroMatchups' => function ($query) {
                $query->with('opponentHero')
                    ->where('match_count', '>=', 100);
            },
        ]);
        $counterPicks = $hero->heroMatchups
            ->sortBy('average_win')
            ->take(9)
            ->values()
            ->toArray();

        $goodAgainst = $hero->heroMatchups
            ->sortByDesc('average_win')
            ->take(9)
            ->values()
            ->toArray();

        //dd($hero->heroMatchups->take(5)->toArray());
        //dd($counterPicks->toArray());

        return Inertia::render('heroes/show', [
            'hero' => $hero,
            'counterPicks' => $counterPicks,
            'goodAgainst' => $goodAgainst,
        ]);
    }
}
