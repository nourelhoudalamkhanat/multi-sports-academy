<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Critere extends Model
{
    protected $fillable = ['nom', 'sport_id'];

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }
}