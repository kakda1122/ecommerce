<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Audience extends Model
{
    protected $fillable = ['name', 'user_id'];

    // 2. An audience has one user
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    // An audience belongs to many articles (many-to-many)
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_audience');
    }

    // 5. An audience have many comments (polymorphic)
    public function comments(): HasMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
