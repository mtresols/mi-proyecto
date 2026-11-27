<?php

use App\Models\Edition;
use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('se puede crear una edición de la revista con su pdf', function () {
    $edition = Edition::create([
        'number' => 1,
        'title' => 'Club Social y Federal - Edición Fundacional',
        'season' => 'Invierno',
        'year' => 2026,
        'pdf_path' => 'ediciones/numero-1.pdf',
        'is_published' => true,
    ]);

    expect($edition->number)->toBe(1)
        ->and($edition->title)->toBe('Club Social y Federal - Edición Fundacional')
        ->and($edition->pdf_path)->toBe('ediciones/numero-1.pdf');
});

test('una edición puede tener múltiples artículos asociados', function () {
    $edition = Edition::create([
        'number' => 2,
        'title' => 'Segunda Edición',
    ]);

    $article = Article::create([
        'edition_id' => $edition->id,
        'title' => 'Manifiesto de Club Social y Federal',
        'slug' => 'manifiesto-club-social-y-federal',
        'author_name' => 'Redacción',
        'section' => 'Editorial',
        'excerpt' => 'Nuestras bases y convicciones comunitarias.',
        'content' => 'Texto completo del manifiesto con toda la visión del club...',
        'order' => 1,
    ]);

    // Comprobamos que la edición conozca su artículo
    expect($edition->articles)->toHaveCount(1)
        ->and($edition->articles->first()->title)->toBe('Manifiesto de Club Social y Federal');

    // Comprobamos que el artículo conozca su edición
    expect($article->edition->number)->toBe(2);
});

test('si se elimina una edición, sus artículos se eliminan en cascada', function () {
    $edition = Edition::create([
        'number' => 3,
        'title' => 'Tercera Edición',
    ]);

    Article::create([
        'edition_id' => $edition->id,
        'title' => 'Artículo a eliminar',
        'slug' => 'articulo-a-eliminar',
        'content' => 'Contenido de prueba',
    ]);

    expect(Article::count())->toBe(1);

    // Eliminamos la edición
    $edition->delete();

    // Verificamos que PostgreSQL haya eliminado el artículo automáticamente
    expect(Article::count())->toBe(0);
});
