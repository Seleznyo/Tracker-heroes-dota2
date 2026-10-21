<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HeroMatchup extends Model
{
    protected $fillable = [
        'hero_id',
        'opponent_hero_id',
        'match_count',
        'win_count',
        'average_win'
    ];

    public function hero() : BelongsTo{
        return $this->belongsTo(Hero::class);
    }

    public function opponentHero() : BelongsTo{
        return $this->belongsTo(Hero::class, 'opponent_hero_id');
    }
}
