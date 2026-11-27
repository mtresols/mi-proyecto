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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            // Clave foránea vinculada a la tabla editions con borrado en cascada
            $table->foreignId('edition_id')->constrained('editions')->cascadeOnDelete();

            $table->string('title');
            $table->string('slug')->unique();            // URL amigable (ej: primer-editorial)
            $table->string('section')->nullable();       // Editorial, Entrevistas, Opinión...
            $table->string('author_name')->nullable();   // Nombre del autor/a
            $table->text('excerpt')->nullable();         // Bajada para la portada
            $table->longText('content');                 // Contenido completo de la nota
            $table->string('image')->nullable();         // Imagen destacada del artículo
            $table->unsignedInteger('order')->default(0);// Orden de lectura en la revista
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
