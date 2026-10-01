<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteHeroController extends Controller
{

    public function index()
    {
        /** @var User $user **/
        $user = Auth::user();

        $heroes= $user->heroes()->orderBy('id')->get();

        
        return Inertia::render('favorites/index', [
            'heroes' => $heroes,
        ]);
    }
    public function store(Hero $hero): RedirectResponse
    {

        /** @var User $user **/
        $user = Auth::user();

        $user->heroes()->attach($hero->id);

        return back();
    }

    public function destroy(Hero $hero): RedirectResponse
    {

        /** @var User $user **/
        $user = Auth::user();

        $user->heroes()->detach($hero->id);

        return back();
    }
}
