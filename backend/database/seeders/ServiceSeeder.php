<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::insert([
            [
                'name' => 'Plumbing',
                'description' => 'Professional plumbing services for your home or office.',
                'price' => 50.00,
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Electrical',
                'description' => 'Certified electricians for all your electrical needs.',
                'price' => 75.00,
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cleaning',
                'description' => 'Home and office cleaning services.',
                'price' => 40.00,
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
