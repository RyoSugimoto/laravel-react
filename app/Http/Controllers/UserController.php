<?php

namespace App\Http\Controllers;

use App\Services\Facades\{
    GetPostServiceFacade,
    GetUserServiceFacade
};

class UserController extends Controller
{
    public function show(string $user_name)
    {
        $user = GetUserServiceFacade::getUserByName($user_name, ['id', 'email', 'language']);
        $posts = GetPostServiceFacade::getPostsByUserName($user_name);

        return inertia('User', [
            'user' => $user,
            'posts' => $posts,
        ]);
    }
}
