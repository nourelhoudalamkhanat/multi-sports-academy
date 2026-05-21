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
       Schema::create('feedbacks', function (Blueprint $table) {
    $table->id();
    $table->foreignId('evaluation_id')->constrained('evaluations')->onDelete('cascade');
    $table->text('message');
    $table->boolean('generated_by_ai')->default(false);
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
