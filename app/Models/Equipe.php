<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    protected $fillable = ['name', 'sport_id', 'coach_id'];

    // Relation avec le sport
    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    // Relation avec le coach (users)
    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_id');
    }

    // Relation avec les athlètes (pivot equipe_athlete)
    public function athletes()
    {
        return $this->belongsToMany(User::class, 'equipe_athlete', 'equipe_id', 'athlete_id');
    }

    // Relation avec les séances
    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}