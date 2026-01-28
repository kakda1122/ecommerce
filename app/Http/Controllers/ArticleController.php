<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Article::with('author')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'author_id' => 'required|exists:authors,id',
        ]);

        $article = Article::create($request->all());

        return response()->json($article->load('author'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return response()->json($article->load(['author', 'audiences', 'comments']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'author_id' => 'sometimes|exists:authors,id',
        ]);

        $article->update($request->all());

        return response()->json($article->load('author'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully']);
    }

    /**
     * Get all audiences of an article
     */
    public function audiences(Article $article)
    {
        return response()->json($article->audiences);
    }
}
