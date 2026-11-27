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
        Schema::create('editions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('number')->unique(); // 1, 2, 3...
            $table->string('title');                     // Título o lema del número
            $table->string('season')->nullable();        // Invierno, Verano, Otoño, etc.
            $table->unsignedSmallInteger('year')->nullable(); // 2026
            $table->string('cover_image')->nullable();   // Ruta de la imagen de portada
            $table->string('pdf_path')->nullable();      // Archivo PDF para descargar
            $table->date('published_at')->nullable();    // Fecha de publicación
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('editions');
    }
};
