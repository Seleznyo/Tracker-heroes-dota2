<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $fillable = ['stratz_id', 'name', 'slug', 'image'];

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
