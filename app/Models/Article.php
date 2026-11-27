<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'edition_id',
        'title',
        'slug',
        'section',
        'author_name',
        'excerpt',
        'content',
        'image',
        'order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    /**
     * Un artículo pertenece a una edición específica.
     */
    public function edition(): BelongsTo
    {
        return $this->belongsTo(Edition::class);
    }
}
