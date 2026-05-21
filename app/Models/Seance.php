<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    protected $fillable = [
        'equipe_id', 'sport_id', 'coach_id', 
        'date', 'heure_debut', 'heure_fin', 'lieu'
    ];

    public function equipe()
    {
        return $this->belongsTo(Equipe::class);
    }

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function presences()
    {
        return $this->hasMany(Presence::class);
    }
}