<?php

namespace Database\Seeders;

use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
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
        $data = [
            [
                'name' => 'Suzuki',
                'email' => 'suzuki@example.com',
                'password' => 'password',
                'language' => 'ja',
                'follows' => [
                    [
                        'id' => 1,
                        'approved' => true,
                        'muted' => false,
                    ],
                ],
            ],
            [
                'name' => 'Smith',
                'email' => 'smith@example.com',
                'password' => 'fugafuga',
                'language' => 'en',
                'follows' => [
                    [
                        'id' => 0,
                        'approved' => true,
                        'muted' => true,
                    ],
                ],
            ],
            [
                'name' => 'Watanabe',
                'email' => 'watanabe@example.com',
                'password' => 'hogehoge',
                'language' => null,
                'follows' => [
                    [
                        'id' => 2,
                        'approved' => false,
                        'muted' => false,
                    ],
                ],
            ],
        ];

        foreach ($data as $item) {
            User::factory()->create([
                'name' => $item['name'],
                'email' => $item['email'],
                'password' => Hash::make($item['password']),
                'language' => $item['language'],
            ]);

            $users = User::all()->toArray();
        }

        foreach ($users as $index => $user) {
            Post::factory(5)->create([
                'user_id' => $user['id'],
            ]);

            $user_follows = $data[$index]['follows'];

            foreach($user_follows as $follow) {
                Follow::factory()->create([
                    'user_id' => $user['id'],
                    'followee_id' => $users[$follow['id']]['id'],
                    'approved' => $follow['approved'],
                    'muted' => $follow['muted'],
                ]);
            }
        }
    }
}
