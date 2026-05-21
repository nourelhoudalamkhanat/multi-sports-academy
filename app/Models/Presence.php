<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    protected $fillable = ['seance_id', 'athlete_id', 'present', 'commentaire'];

    public function seance()
    {
        return $this->belongsTo(Seance::class);
    }

    public function athlete()
    {
        return $this->belongsTo(User::class, 'athlete_id');
    }
}