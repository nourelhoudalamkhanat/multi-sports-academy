<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            SportSeeder::class,
            CritereSeeder::class,
            EquipeSeeder::class,
            SeanceSeeder::class,
        ]);
    }
}