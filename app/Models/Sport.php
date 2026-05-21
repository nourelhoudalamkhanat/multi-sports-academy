<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    protected $fillable = ['name', 'description', 'image'];

    public function criteres()
    {
        return $this->hasMany(Critere::class);
    }

    public function equipes()
    {
        return $this->hasMany(Equipe::class);
    }

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}