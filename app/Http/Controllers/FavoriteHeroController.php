<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class FavoriteHeroController extends Controller
{
    public function store(Hero $hero) : RedirectResponse
    {
        
        /** @var User $user **/
        $user = Auth::user();

        $user->heroes()->attach($hero->id);

        return back();
    }
}
