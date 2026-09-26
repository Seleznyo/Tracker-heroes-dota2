<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\RouteKey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function OpponentHeroMatchups(): HasMany {
        return $this->hasMany(HeroMatchup::class, 'opponent_hero_id');
    }
}
