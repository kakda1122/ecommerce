<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    protected $fillable = ['name', 'user_id', 'commentable_id', 'commentable_type'];

    // 8. An user wrote many comments
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Polymorphic relationship - comment can belong to Article, Author, or Audience
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }
}
