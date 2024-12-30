<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

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
     * ユーザによるフォローレコードと、それぞれのレコードに紐づいたユーザ情報を返す。
     */
    public function getFollowing(): \Illuminate\Support\Collection
    {
        $followings = DB::table('follows')
        ->selectRaw('follows.followee_id, follows.approved, follows.muted, users.name')
        ->join('users', 'follows.followee_id', '=', 'users.id')
        ->where('follows.id', '=', $this->id)
        ->get();

        return $followings;
    }

    public function follow()
    {
        return $this->hasMany(Follow::class);
    }

    public function posts()
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
}
