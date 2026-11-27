<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MagazineController extends Controller
{
    /**
     * Portada de la revista con selector de números.
     */
    public function index(Request $request): Response
    {
        $allEditions = Edition::where('is_published', true)
            ->orderBy('number')
            ->get(['id', 'number', 'season', 'year', 'color_primary', 'color_secondary', 'title']);

        $selectedNumber = $request->query('numero');

        $currentEdition = null;
        if ($selectedNumber) {
            $currentEdition = Edition::where('number', $selectedNumber)
                ->where('is_published', true)
                ->with(['articles' => fn($q) => $q->where('is_published', true)->orderBy('order')])
                ->first();
        }

        // Si no seleccionó ninguno o no existe, mostrar por defecto la última edición
        if (!$currentEdition) {
            $currentEdition = Edition::where('is_published', true)
                ->orderByDesc('number')
                ->with(['articles' => fn($q) => $q->where('is_published', true)->orderBy('order')])
                ->first();
        }

        return Inertia::render('Magazine/Index', [
            'currentEdition' => $currentEdition,
            'editions' => $allEditions,
        ]);
    }

    /**
     * Lectura completa de un artículo.
     */
    public function article(string $slug): Response
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->with('edition')
            ->firstOrFail();

        // Otros artículos de la misma edición para seguir leyendo
        $relatedArticles = Article::where('edition_id', $article->edition_id)
            ->where('id', '!=', $article->id)
            ->where('is_published', true)
            ->orderBy('order')
            ->take(3)
            ->get(['id', 'title', 'slug', 'section', 'author_name', 'excerpt']);

        return Inertia::render('Magazine/ArticleShow', [
            'article' => $article,
            'edition' => $article->edition,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    /**
     * Manifiesto institucional de Club Social y Federal.
     */
    public function about(): Response
    {
        $latestEdition = Edition::where('is_published', true)->orderByDesc('number')->first();

        return Inertia::render('Magazine/About', [
            'edition' => $latestEdition,
        ]);
    }
}
