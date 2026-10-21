<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    protected $fillable = ['stratz_id', 'name', 'displayName', 'image'];

    public function startingItems() : HasMany
    {
        return $this->hasMany(HeroStartingItem::class);
    }
    public function items() : HasMany
    {
        return $this->hasMany(HeroItem::class);
    }
}
