<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function followingsIndex()
    {
        $login_user = Auth::user();

        $follows_with_user = $login_user->getFollowsWithUser();

        // \Illuminate\Support\Facades\Log::info($follows_with_user);

        $follow_objects = $follows_with_user->map(function ($follow_with_user)
        {
            $follow_dto = new \App\DTO\FollowDTO($follow_with_user);
            return $follow_dto->get();
        });

        return inertia('Followings', [
            'followings' => $follow_objects,
        ]);
    }
}
