<?php

namespace Database\Seeders;

use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use App\Models\UserProfile;
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
        $settings = [
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
                    [
                        'id' => 2,
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
                        'id' => 0,
                        'approved' => false,
                        'muted' => false,
                    ],
                    [
                        'id' => 1,
                        'approved' => false,
                        'muted' => false,
                    ],
                    [
                        'id' => 3,
                        'approved' => false,
                        'muted' => false,
                    ],
                ],
            ],
            [
                'name' => 'Jonson',
                'email' => 'jonson@example.com',
                'password' => 'passowrd',
                'language' => null,
                'follows' => [
                    [
                        'id' => 1,
                        'approved' => false,
                        'muted' => false,
                    ],
                    [
                        'id' => 2,
                        'approved' => false,
                        'muted' => false,
                    ],
                ],
            ],
        ];

        foreach ($settings as $user_settings) {
            User::factory()->create([
                'name' => $user_settings['name'],
                'email' => $user_settings['email'],
                'password' => Hash::make($user_settings['password']),
                'language' => $user_settings['language'],
            ]);
        }

        $users = User::all();

        $users->map(function ($user, $index) use ($settings, $users)
        {
            UserProfile::factory()->create([
                'user_id' => $user->id,
            ]);

            Post::factory(5)->create([
                'user_id' => $user->id,
            ]);

            $user_follows = $settings[$index]['follows'];

            foreach($user_follows as $follow) {
                Follow::factory()->create([
                    'user_id' => $user->id,
                    'followee_id' => $users->get($follow['id'])->id,
                    'approved' => $follow['approved'],
                    'muted' => $follow['muted'],
                ]);
            }
        });
    }
}
