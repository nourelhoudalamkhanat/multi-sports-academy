<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipe;
use App\Models\Sport;
use App\Models\User;

class EquipeSeeder extends Seeder
{
    public function run(): void
    {
        $football = Sport::where('name', 'Football')->first();
        $basketball = Sport::where('name', 'Basketball')->first();
        $volleyball = Sport::where('name', 'Volleyball')->first();

        $coachAhmed = User::where('email', 'ahmed@msa.ma')->first();
        $coachSara = User::where('email', 'sara@msa.ma')->first();
        $coachMohammed = User::where('email', 'mohammed@msa.ma')->first();

        // Équipe A - Football
        $equipeA = Equipe::create([
            'name' => 'Leicester City',
            'sport_id' => $football->id,
            'coach_id' => $coachAhmed->id,
        ]);

        // Équipe B - Basketball
        $equipeB = Equipe::create([
            'name' => 'Sunderland',
            'sport_id' => $basketball->id,
            'coach_id' => $coachSara->id,
        ]);

        // Équipe C - Volleyball
        $equipeC = Equipe::create([
            'name' => 'Haikyuu',
            'sport_id' => $volleyball->id,
            'coach_id' => $coachMohammed->id,
        ]);

        // Récupérer tous les athlètes
        $athletes = User::where('role', 'athlete')->get();
        
        // Football : 11 athlètes (index 0 à 10)
        $equipeA->athletes()->attach($athletes->slice(0, 11)->pluck('id'));
        
        // Basketball : 4 athlètes (index 11 à 14)
        $equipeB->athletes()->attach($athletes->slice(11, 4)->pluck('id'));
        
        // Volleyball : 6 athlètes (index 15 à 20)
        $equipeC->athletes()->attach($athletes->slice(15, 6)->pluck('id'));
    }
}