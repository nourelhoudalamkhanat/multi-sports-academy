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
        Schema::create('notes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('evaluation_id')->constrained('evaluations')->onDelete('cascade');
    $table->string('critere');    // Nom du critère (Vitesse, Endurance...)
    $table->integer('valeur');    // Note de 1 à 10
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
