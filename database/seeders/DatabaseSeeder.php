<?php

namespace Database\Seeders;

use App\Models\Following;
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
                'name' => 't_suzuki_19790618',
                'display_name' => '鈴木太郎',
                'email' => 'suzuki@example.com',
                'password' => 'password',
                'language' => 'ja',
                'followings' => [
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
                'name' => 'john_smith_new_york',
                'display_name' => 'John Smith',
                'email' => 'smith@example.com',
                'password' => 'fugafuga',
                'language' => 'en',
                'followings' => [
                    [
                        'id' => 0,
                        'approved' => true,
                        'muted' => true,
                    ],
                ],
            ],
            [
                'name' => 'nabetchee35',
                'display_name' => 'Ken Watanabe',
                'email' => 'watanabe@example.com',
                'password' => 'hogehoge',
                'language' => null,
                'followings' => [
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
                'name' => 'jonson2980',
                'display_name' => null,
                'email' => 'jonson@example.com',
                'password' => 'passowrd',
                'language' => null,
                'followings' => [
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
                'display_name' => $settings[$index]['display_name'],
            ]);

            Post::factory(5)->create([
                'user_id' => $user->id,
            ]);

            $user_followings = $settings[$index]['followings'];

            foreach($user_followings as $following) {
                Following::factory()->create([
                    'user_id' => $user->id,
                    'followed_user_id' => $users->get($following['id'])->id,
                    'approved' => $following['approved'],
                    'muted' => $following['muted'],
                ]);
            }
        });
    }
}
