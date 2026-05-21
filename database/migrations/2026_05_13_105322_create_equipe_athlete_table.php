<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipe_athlete', function (Blueprint $table) {
    $table->id();
    $table->foreignId('equipe_id')->constrained('equipes')->onDelete('cascade');
    $table->foreignId('athlete_id')->constrained('users')->onDelete('cascade');
    $table->timestamps();
    
    // Un athlète ne peut pas être 2 fois dans la même équipe
    $table->unique(['equipe_id', 'athlete_id']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipe_athlete');
    }
};
