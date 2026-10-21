<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HeroStartingItem extends Model
{

    protected $fillable = ['hero_id', 'item_id', 'match_count', 'wins_average'];

    public function hero(): BelongsTo
    {
        return $this->belongsTo(Hero::class);
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
