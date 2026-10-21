<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'items' => function ($query) {
                $query
                    ->orderByDesc('match_count')
                    ->limit(6)
                    ->with('item');
            },
            'startingItems' => function ($query) {
                $query
                    ->orderByDesc('match_count')
                    ->limit(6)
                    ->with('item');
            }
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

        /** @var User $user **/
        $user = Auth::user();
        $isFavorite = Auth::check()
            ? $user->heroes()->where('hero_id', $hero->id)->exists()
            : false;

        //dd($hero->toArray());
        //dd($counterPicks->toArray());

        return Inertia::render('heroes/show', [
            'hero' => $hero,
            'counterPicks' => $counterPicks,
            'goodAgainst' => $goodAgainst,
            'isFavorite' => $isFavorite
        ]);
    }
}
