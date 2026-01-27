<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any categories.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the category.
     */
    public function view(User $user, Category $category): bool
    {
        // Admin can view all categories
        if ($user->hasRole('admin')) {
            return true;
        }
        
        // Manager can view categories in their products
        if ($user->hasRole('manager')) {
            return $category->products()->where('created_by', $user->id)->exists();
        }
        
        // Staff can view categories assigned to them
        if ($user->hasRole('staff')) {
            return $category->assigned_to === $user->id;
        }
        
        return false;
    }

    /**
     * Determine whether the user can create categories.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('categories.create');
    }

    /**
     * Determine whether the user can update the category.
     */
    public function update(User $user, Category $category): bool
    {
        // Admin can update all categories
        if ($user->hasRole('admin')) {
            return true;
        }
        
        // Manager can update categories in their products
        if ($user->hasRole('manager') && $user->hasPermission('categories.update')) {
            return $category->products()->where('created_by', $user->id)->exists();
        }
        
        // Staff can update categories assigned to them
        if ($user->hasRole('staff') && $user->hasPermission('categories.update')) {
            return $category->assigned_to === $user->id;
        }
        
        return false;
    }

    /**
     * Determine whether the user can delete the category.
     */
    public function delete(User $user, Category $category): bool
    {
        // Admin can delete all categories
        if ($user->hasRole('admin')) {
            return true;
        }
        
        // Manager can delete categories in their products
        if ($user->hasRole('manager') && $user->hasPermission('categories.delete')) {
            return $category->products()->where('created_by', $user->id)->exists();
        }
        
        return false;
    }

    /**
     * Determine whether the user can update the category status.
     */
    public function updateStatus(User $user, Category $category): bool
    {
        return $user->hasRole('staff') && $category->assigned_to === $user->id;
    }
}
