<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

// API Login route
Route::post('/login', function (Request $request) {
    $request->validate(['email'=>'required|email','password'=>'required']);

    if (!Auth::attempt($request->only('email','password'))) {
        return response()->json(['message'=>'Invalid credentials'], 401);
    }

    $user = $request->user();
    $token = $user->createToken('mobile')->accessToken;

    return response()->json(['token'=>$token]);
});

// Protected API routes
Route::middleware('auth:api')->group(function () {
    Route::get('/me', fn(Request $r) => $r->user()->load('roles'));
    
    // Products routes - manager/admin only
    Route::middleware(['can:products.create'])->post('/products', function (Request $request) {
        // Product creation logic here
        return response()->json(['message'=>'Product created successfully']);
    });
    
    // Category status update - assigned staff only (policy)
    Route::patch('/categories/{id}/status', function (Request $request, $id) {
        // Find category and authorize using policy
        $category = \App\Models\Category::findOrFail($id);
        $this->authorize('updateStatus', $category);
        
        // Update status logic here
        return response()->json(['message'=>'Category status updated successfully']);
    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(CategoryController::class)->prefix('categories') ->group(function () {

        Route::get('/', 'getCategories');
        Route::post('/', 'createCategory');
        Route::get('/{categoryId}', 'getCategory');
        Route::patch('/{categoryId}', 'updateCategory');
        Route::delete('/{categoryId}', 'deleteCategory');

    });

Route::controller(ProductController::class)->prefix('products') ->group(function () {

        Route::get('/', 'getProducts');
        Route::post('/', 'createProduct');
        Route::get('/{productId}', 'getProduct');
        Route::patch('/{productId}', 'updateProduct');
        Route::delete('/{productId}', 'deleteProduct');

    });