<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'language',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * 受け取ったユーザ名の `User` を返す。
     * ユーザが見つからない場合は `null` を返す。
     * @param string $user_name
     * @return User | null
     */
    static public function getUserByName(string $user_name): User | null
    {
        $user = User::where('name', $user_name)->first();

        if (!$user) {
            return null;
        }

        return $user;
    }

    /**
     * `followings` テーブルとの関連
     */
    public function following()
    {
        return $this->hasMany(Following::class);
    }

    /**
     * `posts` テーブルとの関連
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
