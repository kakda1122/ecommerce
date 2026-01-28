<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    protected $fillable = ['name', 'author_id'];

    // Article belongs to an author
    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    // 4. An article have many audiences (many-to-many)
    public function audiences(): BelongsToMany
    {
        return $this->belongsToMany(Audience::class, 'article_audience');
    }

    // 6. An article have many comments (polymorphic)
    public function comments(): HasMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
