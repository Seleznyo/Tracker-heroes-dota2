<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\RouteKey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User;

#[RouteKey('slug')]
class Hero extends Model
{
    protected $fillable = ['stratz_id', 'name', 'slug', 'image'];

    public function heroStats(): HasMany
    {
        return $this->hasMany(HeroStat::class);
    }

    public function heroMatchups(): HasMany
    {
        return $this->hasMany(HeroMatchup::class);
    }

    public function opponentHeroMatchups(): HasMany {
        return $this->hasMany(HeroMatchup::class, 'opponent_hero_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorite_heroes');
    }
    
}
