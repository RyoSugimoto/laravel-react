<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Following extends Model
{
    use HasFactory;

    /**
     * 受け取ったIDのユーザによるフォロー（ `followings` ）のレコードぞれぞれにフォロー対象のユーザの情報（ `name` ）を含めたデータのコレクション返す。
     */
    static public function getFollowingsWithUserDataByUserId(string $user_id): Collection
    {
        $followings_with_followed_user_data = DB::table('followings', 'F')
        ->select([
            'F.user_id as id',
            'A.name as user_name',
            'B.name as followed_user_name',
            'F.user_id as user_id',
            'F.followed_user_id as followed_user_id',
            'F.approved as approved',
            'F.muted as muted',
            'F.created_at as created_at',
        ])
        ->leftJoin('users as A', 'F.user_id', '=', 'A.id')
        ->leftJoin('users as B', 'F.followed_user_id', '=', 'B.id')
        ->where('F.user_id', '=', $user_id)
        ->get();

        return $followings_with_followed_user_data;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function followedUser()
    {
        return $this->hasOne(User::class);
    }
}
