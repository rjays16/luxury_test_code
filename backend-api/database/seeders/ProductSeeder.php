<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $products = [
            ['name' => 'Laptop Pro 15"', 'price' => 1299.99],
            ['name' => 'Wireless Mouse', 'price' => 29.99],
            ['name' => 'Mechanical Keyboard', 'price' => 89.99],
            ['name' => 'USB-C Hub', 'price' => 49.99],
            ['name' => 'Monitor 27" 4K', 'price' => 399.99],
            ['name' => 'Webcam HD', 'price' => 79.99],
            ['name' => 'Headphones Wireless', 'price' => 149.99],
            ['name' => 'Desk Lamp LED', 'price' => 34.99],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
