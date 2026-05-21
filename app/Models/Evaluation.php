<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $fillable = ['player_id', 'coach_id', 'seance_id', 'date'];

    public function player()
    {
        return $this->belongsTo(User::class, 'player_id');
    }

    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_id');
    }

    public function seance()
    {
        return $this->belongsTo(Seance::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }
}