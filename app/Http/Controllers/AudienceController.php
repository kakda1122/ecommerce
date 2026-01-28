<?php

namespace App\Http\Controllers;

use App\Models\Audience;
use App\Models\User;
use Illuminate\Http\Request;

class AudienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Audience::with('user')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
        ]);

        // Create user account
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Create audience
        $audience = Audience::create([
            'name' => $request->name,
            'user_id' => $user->id,
        ]);

        return response()->json($audience->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Audience $audience)
    {
        return response()->json($audience->load(['user', 'articles', 'comments']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Audience $audience)
    {
        $request->validate([
            'name' => 'sometimes|string',
        ]);

        $audience->update($request->only('name'));

        return response()->json($audience->load('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Audience $audience)
    {
        $audience->delete();
        return response()->json(['message' => 'Audience deleted successfully']);
    }

    /**
     * Subscribe audience to articles
     */
    public function subscribe(Request $request, Audience $audience)
    {
        $request->validate([
            'article_ids' => 'required|array',
            'article_ids.*' => 'exists:articles,id',
        ]);

        $audience->articles()->sync($request->article_ids);

        return response()->json($audience->load('articles'));
    }

    /**
     * Get all comments of an audience
     */
    public function comments(Audience $audience)
    {
        return response()->json($audience->comments()->with('user')->get());
    }
}
