<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Author extends Model
{
    protected $fillable = ['name', 'user_id'];

    // 1. An author has one user
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    // 3. An author wrote multiple articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    // 7. An author have many comments (polymorphic)
    public function comments(): HasMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    // 9. An author has many audience (has many through)
    public function audiences(): HasManyThrough
    {
        return $this->hasManyThrough(
            Audience::class,
            Article::class,
            'author_id', // Foreign key on articles table
            'id', // Foreign key on audiences table (from article_audience)
            'id', // Local key on authors table
            'audience_id' // Local key on article_audience table
        );
    }
}
