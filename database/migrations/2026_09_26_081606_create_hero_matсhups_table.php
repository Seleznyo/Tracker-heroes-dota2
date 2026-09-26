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
        Schema::create('hero_matchups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hero_id')
            ->constrained('heroes')
            ->onDelete('cascade');

            $table->foreignId('opponent_hero_id')
            ->constrained('heroes')
            ->onDelete('cascade');

            $table->unsignedInteger('match_count');
            $table->unsignedInteger('win_count');
            $table->float('average_win');
            $table->timestamps();

            $table->unique(['hero_id', 'opponent_hero_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_matchups');
    }
};
