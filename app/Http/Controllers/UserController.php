<?php

namespace App\Http\Controllers;

use App\Models\Following;
use App\Services\DTO\FollowingDTO;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function followings()
    {
        $login_user = Auth::user();

        $followings_with_user_data = Following::getFollowingsWithUserDataByUserId($login_user->id);

        $followings = $followings_with_user_data->map(function ($following_with_user_data)
        {
            $data = FollowingDTO::fromFollowingWithUserData($following_with_user_data)->toArrayForClient();

            return $data;
        });

        return inertia('Followings', [
            'followings' => $followings,
        ]);
    }
}
