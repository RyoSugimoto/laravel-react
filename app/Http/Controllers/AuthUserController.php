<?php

namespace App\Http\Controllers;

use App\Domain\Services\{
    FetchingFollowingsService,
};
use App\Services\Facades\{
    GetFollowingServiceFacade,
    GetUserServiceFacade,
    GetPostServiceFacade
};
use App\Services\Post\GetPostService;
use App\Infrastructure\Laravel\{
    LaravelFollowingRepository,
    LaravelPostRepository
};
use Illuminate\Support\Facades\Auth;

class AuthUserController extends Controller
{
    protected function checkAuthenticated()
    {
        if (!Auth::check()) {
            abort(403);
        }
    }

    /**
     * ホーム画面
     */
    public function index()
    {
        $this->checkAuthenticated();

        $auth_user = Auth::user();

        $user = GetUserServiceFacade::getUserById($auth_user->id);

        // $posts = GetPostServiceFacade::getPostsByUserName($auth_user->name);
        $posts = GetPostServiceFacade::getViewablePostsByUserId($auth_user->id);

        return inertia('Dashboard', [
            'user' => $user,
            'posts' => $posts,
        ]);
    }

    /**
     * フォローしているユーザ一覧画面
     */
    public function followings()
    {
        $this->checkAuthenticated();

        $auth_user = Auth::user();

        $user = GetUserServiceFacade::getUserById($auth_user->id);

        $followings = GetFollowingServiceFacade::getFollowingsByUserId($auth_user->id);

        return inertia('Followings', [
            'user' => $user,
            'followings' => $followings,
        ]);
    }
}
