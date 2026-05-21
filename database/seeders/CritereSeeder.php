<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Critere;
use App\Models\Sport;

class CritereSeeder extends Seeder
{
    public function run(): void
    {
        $criteres = [
            // Football
            ['sport' => 'Football', 'noms' => ['Vitesse', 'Endurance', 'Dribble', 'Passe', 'Tir', 'Jeu de tête', 'Tactique']],
            // Basketball
            ['sport' => 'Basketball', 'noms' => ['Vitesse', 'Dribble', 'Passe', 'Tir 3pts', 'Lancer franc', 'Défense', 'Rebond']],
            // Volleyball
            ['sport' => 'Volleyball', 'noms' => ['Service', 'Réception', 'Passe', 'Attaque', 'Bloc', 'Défense', 'Saut']],
            // Handball
            ['sport' => 'Handball', 'noms' => ['Vitesse', 'Tir', 'Passe', 'Dribble', 'Défense', 'Saut', 'Endurance']],
        ];

        foreach ($criteres as $critereGroup) {
            $sport = Sport::where('name', $critereGroup['sport'])->first();
            foreach ($critereGroup['noms'] as $nom) {
                Critere::create([
                    'nom' => $nom,
                    'sport_id' => $sport->id,
                ]);
            }
        }
    }
}