<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $staffRole = Role::firstOrCreate(['name' => 'staff']);
        
        // Create permissions
        $permissions = [
            'users.manage',
            'products.create',
            'products.update', 
            'products.delete',
            'categories.create',
            'categories.update',
            'categories.delete',
        ];
        
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
        
        // Assign all permissions to admin
        $adminRole->permissions()->sync(Permission::pluck('id'));
        
        // Assign product management permissions to manager
        $managerRole->permissions()->sync(
            Permission::whereIn('name', [
                'products.create', 'products.update', 'products.delete',
                'categories.create', 'categories.update', 'categories.delete'
            ])->pluck('id')
        );
        
        // Assign limited permissions to staff (can update categories assigned to them)
        $staffRole->permissions()->sync(
            Permission::whereIn('name', ['categories.update'])->pluck('id')
        );
        
        // Create admin user
        $admin = User::firstOrCreate([
            'email' => 'admin@gmail.com'
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);
        $admin->roles()->sync([$adminRole->id]);
        
        // Create manager user
        $manager = User::firstOrCreate([
            'email' => 'manager@gmail.com'
        ], [
            'name' => 'Manager User',
            'password' => Hash::make('manager123'),
            'email_verified_at' => now(),
        ]);
        $manager->roles()->sync([$managerRole->id]);
        
        // Create staff users
        $staff1 = User::firstOrCreate([
            'email' => 'staff1@gmail.com'
        ], [
            'name' => 'Staff One',
            'password' => Hash::make('staff123'),
            'email_verified_at' => now(),
        ]);
        $staff1->roles()->sync([$staffRole->id]);
        
        $staff2 = User::firstOrCreate([
            'email' => 'staff2@gmail.com'
        ], [
            'name' => 'Staff Two',
            'password' => Hash::make('staff123'),
            'email_verified_at' => now(),
        ]);
        $staff2->roles()->sync([$staffRole->id]);
        
        $this->command->info('Users created successfully!');
        $this->command->info('Admin: admin@gmail.com / admin123');
        $this->command->info('Manager: manager@gmail.com / manager123');
        $this->command->info('Staff: staff1@gmail.com / staff123');
        $this->command->info('Staff: staff2@gmail.com / staff123');
    }
}
