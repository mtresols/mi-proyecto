<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Edition extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'title',
        'season',
        'year',
        'cover_image',
        'pdf_path',
        'published_at',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'is_published' => 'boolean',
        ];
    }

    /**
     * Una edición contiene muchos artículos ordenados por su índice.
     */
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class)->orderBy('order');
    }
}
