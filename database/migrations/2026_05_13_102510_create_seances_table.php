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
        Schema::create('seances', function (Blueprint $table) {
    $table->id();
    $table->foreignId('equipe_id')->constrained('equipes')->onDelete('cascade');
    $table->foreignId('sport_id')->constrained('sports')->onDelete('cascade');
    $table->foreignId('coach_id')->constrained('users')->onDelete('cascade');
    $table->date('date');
    $table->time('heure_debut');
    $table->time('heure_fin');
    $table->string('lieu')->nullable();
    
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};
