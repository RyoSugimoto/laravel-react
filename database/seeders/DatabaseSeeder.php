<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Suzuki',
            'email' => 'suzuki@example.com',
            'password' => Hash::make('hogehoge'),
            'language' => 'ja',
        ]);

        User::factory()->create([
            'name' => 'Smith',
            'email' => 'smith@example.com',
            'password' => Hash::make('fugafuga'),
            'language' => 'en',
        ]);

        User::factory()->create([
            'name' => 'Hoge',
            'email' => 'hoge@example.com',
            'password' => Hash::make('hogehoge'),
            'language' => null,
        ]);

        $users = User::all();

        foreach ($users as $user) {
            Post::factory(5)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
