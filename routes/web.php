<?php

use App\Http\Controllers\{
    GuestController,
    AuthUserController,
    LanguageController,
    PasswordResetController,
    PostController,
    UserController
};
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)
->group(function ()
{
    Route::get('/user/{name}', 'show');
});

Route::controller(AuthUserController::class)
->middleware('auth')
->group(function ()
{
    Route::get('/home', 'index')
    ->name('home');

    Route::get('/followings', 'followings')
    ->name('followings');
});

Route::controller(PostController::class)
->group(function ()
{
    Route::prefix('/posts')
    ->name('posts.')
    ->group(function ()
    {
        Route::get('/{id}', 'show')->name('show');
        Route::post('/', 'create')->name('create');
        Route::delete('/{id}', 'destroy')->name('delete');
    });
});

Route::controller(GuestController::class)
->middleware('guest')
->group(function ()
{
    Route::get('/', 'index')->name('welcome');
    Route::get('/login', 'store')->name('login');
    Route::get('/register', 'create')->name('register');
});

Route::controller(PasswordResetController::class)
->prefix('password-reset')
->group(function ()
{
    /**
     * Fortifyの設定（ `config/fortify.php` ） で `'view'` を `false` にした場合、
     * 名前が `password.reset` のルートでパスワード再設定用のページを表示させる必要がある。
     * @see https://laravel.com/docs/11.x/fortify#disabling-views-and-password-reset
     */
    Route::get('/', 'store')
    ->name('password.reset');
});

Route::controller(LanguageController::class)
->name('language.')
->group(function ()
{
    Route::post('/switch-language', 'store')
    ->name('switch');
});
