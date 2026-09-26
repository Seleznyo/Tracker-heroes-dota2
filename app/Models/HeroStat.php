<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Appends(['winrate'])]
class HeroStat extends Model
{
    protected $fillable = ['hero_id', 'month', 'win_count', 'match_count'];


    protected function winrate(): Attribute {
        return Attribute::make(
            get: function () {
                if($this->match_count == 0){
                    return 0;
                }
                return round(($this->win_count / $this->match_count) * 100, 2);
            }
        );
    }

    public function hero(): BelongsTo
    {
        return $this->belongsTo(Hero::class);
    }
}
