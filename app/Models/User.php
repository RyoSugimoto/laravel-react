<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
     * `UserProfile` との関連
     */
    public function userProfile(): BelongsTo
    {
        return $this->belongsTo(UserProfile::class, 'id', 'user_id');
    }

    /**
     * `Following` との関連
     */
    public function following(): HasMany
    {
        return $this->hasMany(Following::class);
    }

    /**
     * `Post` との関連
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

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
     * @return ?User
     */
    static public function getUserByName(string $user_name): ?User
    {
        $user = User::where('name', $user_name)->first();

        if (!$user) {
            return null;
        }

        return $user;
    }
}
