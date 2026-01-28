<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\User;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Author::with('user')->get());
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

        // Create author
        $author = Author::create([
            'name' => $request->name,
            'user_id' => $user->id,
        ]);

        return response()->json($author->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        return response()->json($author->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Author $author)
    {
        $request->validate([
            'name' => 'sometimes|string',
        ]);

        $author->update($request->only('name'));

        return response()->json($author->load('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author)
    {
        $author->delete();
        return response()->json(['message' => 'Author deleted successfully']);
    }

    /**
     * Get all articles of an author
     */
    public function articles(Author $author)
    {
        return response()->json($author->articles()->with('audiences')->get());
    }

    /**
     * Get all audiences of an author (has many through)
     */
    public function audiences(Author $author)
    {
        return response()->json($author->audiences);
    }
}
