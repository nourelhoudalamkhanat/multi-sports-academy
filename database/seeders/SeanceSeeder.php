<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Seance;
use App\Models\Equipe;
use App\Models\Sport;
use App\Models\Presence;

class SeanceSeeder extends Seeder
{
    public function run(): void
    {
        $equipes = Equipe::all();

        foreach ($equipes as $equipe) {
            // Créer 3 séances par équipe
            for ($i = 0; $i < 3; $i++) {
                $date = now()->addDays(rand(1, 30));
                
                $seance = Seance::create([
                    'equipe_id' => $equipe->id,
                    'sport_id' => $equipe->sport_id,
                    'coach_id' => $equipe->coach_id,
                    'date' => $date->format('Y-m-d'),
                    'heure_debut' => sprintf('%02d:00:00', rand(8, 16)),
                    'heure_fin' => sprintf('%02d:00:00', rand(17, 20)),
                    'lieu' => ['Terrain A', 'Terrain B', 'Salle 1', 'Salle 2'][rand(0, 3)],
                ]);

                // AJOUTER CE BLOC : Créer les présences pour chaque athlète de l'équipe
                $athletes = $equipe->athletes;
                
                foreach ($athletes as $athlete) {
                    // 80% de chance d'être présent
                    $present = rand(1, 100) <= 80;
                    
                    Presence::create([
                        'seance_id' => $seance->id,
                        'athlete_id' => $athlete->id,
                        'present' => $present,
                        'commentaire' => $present ? null : ['Blessé', 'Malade', 'Absent non justifié'][rand(0, 2)],
                    ]);
                }
            }
        }
    }
}