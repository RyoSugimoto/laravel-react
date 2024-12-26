<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\HandleLocaleSetting;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleLocaleSetting::class,
            HandleInertiaRequests::class,
        ]);
        $middleware->encryptCookies([
            // NOTE: App\Services\DateService` で、クライアントサイドでセットした `'timezone'` クッキーからタイムゾーンを取得するため、対象のキーの暗号化を除外。
            'timezone',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
