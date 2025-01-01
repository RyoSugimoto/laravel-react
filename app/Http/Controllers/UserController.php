<?php

namespace App\Http\Controllers;

use App\DTO\FollowingDTO;
use App\Models\Following;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function followings()
    {
        $login_user = Auth::user();

        $followings_with_user_data = Following::getFollowingsWithUserDataByUserId($login_user->id);

        $followings = $followings_with_user_data->map(function ($following_with_user_data)
        {
            $data = FollowingDTO::createFromFollowingWithUserData($following_with_user_data)->toArrayForClient();

            return $data;
        });

        return inertia('Followings', [
            'followings' => $followings,
        ]);
    }
}
