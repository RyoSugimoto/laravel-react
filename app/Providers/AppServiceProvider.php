<?php

namespace App\Providers;

use App\Infrastructure\Laravel\{
    LaravelFollowingRepository,
    LaravelUserRepository,
    LaravelPostRepository
};
use App\Services\{
    Following\GetFollowingService,
    User\GetUserService,
    Post\GetPostService,
    Post\CreatePostService,
    Post\DeletePostService,
};
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // サービスの依存関係の解決や、サービスのインスタンス化に必要な設定

        app()->bind(GetFollowingService::class, function ()
        {
            $repository = new LaravelFollowingRepository();
            return new GetFollowingService($repository);
        });

        app()->bind(GetUserService::class, function ()
        {
            $repository = new LaravelUserRepository();
            return new GetUserService($repository);
        });

        app()->bind(GetPostService::class, function ()
        {
            $repository = new LaravelPostRepository();
            return new GetPostService($repository);
        });

        app()->bind(CreatePostService::class, function ()
        {
            $repository = new LaravelPostRepository();
            return new CreatePostService($repository);
        });

        app()->bind(DeletePostService::class, function ()
        {
            $repository = new LaravelPostRepository();
            return new DeletePostService($repository);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // イベントリスナーの登録、ルートの設定、ミドルウェアの登録など
    }
}
