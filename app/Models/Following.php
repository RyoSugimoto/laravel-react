<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Following extends Model
{
    use HasFactory;

    /**
     * 受け取ったIDのユーザによるフォロー（ `followings` ）のレコードぞれぞれにフォロー対象のユーザの情報（ `name` ）を含めたデータのコレクション返す。
     */
    static public function getFollowingsWithUserDataByUserId(string $user_id)
    {
        $followings_with_user_data = self::where('user_id', $user_id)
        ->with([
            'user:id,name',
            'followedUser:id,name',
            'followedUserProfile:user_id,display_name,icon_url'
        ])
        ->get();

        return $followings_with_user_data;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function followedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'followed_user_id', 'id');
    }

    public function followedUserProfile(): BelongsTo
    {
        return $this->belongsTo(UserProfile::class, 'followed_user_id', 'user_id');
    }
}
