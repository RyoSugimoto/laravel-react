<?php

namespace App\Http\Controllers;

use App\Models\{User, Following};
use Illuminate\Http\Request;

class FollowingController extends Controller
{
    public function toggleMuted(string $target_name)
    {
        // user->nameからFollowingモデルを特定
        $target_id = User::where('name', '=', $target_name)->first()->id;
        // モデルのmutedをトグル
        $following = Following::where('user_id', request()->user()->id)
        ->where('followed_user_id', '=', $target_id)->first();
        $following->muted = !$following->muted;
        // セーブ
        $following->save();
    }

    public function destroy(string $target_name)
    {
        // user->nameからFollowingモデルを特定
        $target_id = User::where('name', '=', $target_name)->first()->id;
        $following = Following::where('user_id', request()->user()->id)
        ->where('followed_user_id', '=', $target_id)->first();
        // followingモデルを削除
        $following->delete();
    }
}
