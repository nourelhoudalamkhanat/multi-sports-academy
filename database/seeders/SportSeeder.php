<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sport;

class SportSeeder extends Seeder
{
    public function run(): void
    {
        $sports = [
            [
                'name' => 'Football',
                'description' => 'Programme complet de football pour tous les niveaux. Technique, tactique et préparation physique.',
                'image' => '/images/sport-football.jpg',
            ],
            [
                'name' => 'Basketball',
                'description' => 'Entraînement intensif de basketball. Développement des compétences individuelles et collectives.',
                'image' => '/images/sport-basketball.jpg',
            ],
            [
                'name' => 'Volleyball',
                'description' => 'Techniques avancées de volleyball. Service, réception, attaque et défense.',
                'image' => '/images/sport-volleyball.jpg',
            ],
            [
                'name' => 'Handball',
                'description' => 'Formation complète en handball. Préparation physique et tactique de jeu.',
                'image' => '/images/sport-handball.avif',
            ],
        ];

        foreach ($sports as $sport) {
            Sport::create($sport);
        }
    }
}