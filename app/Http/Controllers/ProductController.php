<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
   // --- Get /api/products
    public function getCategories()
    {
        return [
            "message" => "Getting list of products"
        ];
    }

    // --- Post /api/products
    public function createProduct()
    {
        return [
            "message" => "Creating 1 new product"
        ];
    }

    // --- Get /api/products/{productId}
    public function getProduct($productId)
    {
        return [
            "message" => "Getting 1 product base on given productId"
        ];
    }

    // --- Patch /api/products/{productId}
    public function updateProduct($productId)
    {
        return [
            "message" => "Updating 1 product base on given productId"
        ];
    }

    // --- Delete /api/products/{productId}
    public function deleteProduct($productId)
    {
        return [
            "message" => "Deleting 1 product base on given productId"
        ];
    }

    // Add store method for creating products
    public function store(Request $request)
    {
        // Ensure the user has permission to create products
        abort_unless(auth()->user()->can('products.create'), 403);

        // Logic to create a product
        return response()->json(['message' => 'Product created successfully']);
    }
}
