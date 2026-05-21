<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role', 
        'speciality', 'experience', 'bio', 'certification',
        'age', 'level', 'phone', 'avatar',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Vérifier les rôles
    public function isAdmin() { return $this->role === 'admin'; }
    public function isCoach() { return $this->role === 'coach'; }
    public function isAthlete() { return $this->role === 'athlete'; }

    // Équipes coachées (si coach)
    public function equipes()
    {
        return $this->hasMany(Equipe::class, 'coach_id');
    }

    // Équipes rejointes (si athlete)
    public function equipesAthlete()
    {
        return $this->belongsToMany(Equipe::class, 'equipe_athlete', 'athlete_id', 'equipe_id');
    }
}