<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin_MSA',
            'email' => 'admin@msa.ma',
            'password' => Hash::make('Admin2026'),
            'role' => 'admin',
            'phone' => '060000001',
        ]);

        // Coachs
        $coach1 = User::create([
            'name' => 'Coach Ahmed',
            'email' => 'ahmed@msa.ma',
            'password' => Hash::make('password'),
            'role' => 'coach',
            'speciality' => 'Football',
            'experience' => 5,
            'bio' => 'Ancien joueur professionnel, 5 ans d\'expérience en coaching.',
            'certification' => 'Licence A CAF',
            'phone' => '0645008802',
        ]);

        $coach2 = User::create([
            'name' => 'Coach Sara',
            'email' => 'sara@msa.ma',
            'password' => Hash::make('password'),
            'role' => 'coach',
            'speciality' => 'Basketball',
            'experience' => 3,
            'bio' => 'Joueuse internationale, spécialisée en formation jeunes.',
            'certification' => 'FIBA Level 2',
            'phone' => '0604567983',
        ]);

        $coach3 = User::create([
            'name' => 'Coach Mohammed',
            'email' => 'mohammed@msa.ma',
            'password' => Hash::make('password'),
            'role' => 'coach',
            'speciality' => 'Volleyball',
            'experience' => 12,
            'bio' => 'Entraîneur certifié avec 12 ans d\'expérience.',
            'certification' => 'FIVB Level 3',
            'phone' => '0630056004',
        ]);

        // Athlètes
        $noms = ['Nour', 'Omar', 'Yassin', 'Amine', 'Nadia', 'Aya', 'Mehdi', 'Samir', 'Hicham', 'Fatima'
        , 'Karim', 'Leila', 'Sami', 'Imane', 'Adnane', 'Sara', 'Youssef', 'Mouna', 'Rachid', 'Laila'
        , 'Ismaïl', 'Salma', 'Anas', 'Meryem', 'Faycal', 'Dounia', 'Adnane', 'Khadija', 'Yazid'];
        
        foreach ($noms as $index => $nom) {
                    // Email unique avec un numéro si doublon
            $emailBase = strtolower($nom) . '@msa.ma';
            $email = $emailBase;
            
            // Si l'email existe déjà, ajouter un numéro
            $counter = 1;
            while (User::where('email', $email)->exists()) {
                $email = strtolower($nom) . $counter . '@msa.ma';
                $counter++;
            }
            User::create([
                'name' => $nom,
                'email' => $email,
                'password' => Hash::make('password'),
                'role' => 'athlete',
                'age' => rand(16, 25),
                'level' => ['debutant', 'intermediaire', 'avance'][rand(0, 2)],
                'phone' => '06000000' . ($index + 10),
            
                ]);
        }
    }
}