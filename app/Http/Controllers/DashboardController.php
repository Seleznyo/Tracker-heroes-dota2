<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;



class DashboardController extends Controller
{
    
    public function index() {
        
         /** @var User $user **/
        $user = Auth::user();

        $heroes= $user->heroes()->latest('favorite_heroes.created_at')->get();

        
        return Inertia::render('dashboard', [
            'heroes' => $heroes->take(3),
            'favoriteCount' => $heroes->count()
        ]);
    }
}
