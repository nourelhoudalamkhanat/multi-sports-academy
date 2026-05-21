// database/migrations/xxxx_create_presences_table.php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seance_id')->constrained('seances')->onDelete('cascade');
            $table->foreignId('athlete_id')->constrained('users')->onDelete('cascade');
            $table->boolean('present')->default(true);
            $table->string('commentaire', 191)->nullable();
            $table->timestamps();
            
            // Un joueur ne peut pas être marqué 2 fois pour la même séance
            $table->unique(['seance_id', 'athlete_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presences');
    }
};