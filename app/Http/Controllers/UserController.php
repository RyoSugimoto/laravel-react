<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function followingsIndex()
    {
        $login_user = Auth::user();

        $followings = $login_user->getFollowing();

        return inertia('Followings', [
            'followings' => $followings->map(function ($following)
            {
                return [
                    'name' => $following->name,
                    'muted' => $following->muted,
                    'approved' => $following->approved,
                ];
            }),
        ]);
    }
}
