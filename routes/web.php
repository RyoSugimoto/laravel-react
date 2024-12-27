<?php

use App\Http\Controllers\GuestController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::controller(PostController::class)
->group(function ()
{
    Route::get('/home', 'index')
    ->name('home')
    ->middleware('auth');

    Route::prefix('/posts')
    ->name('posts.')
    ->group(function ()
    {
        Route::get('/{id}', 'show')->name('show');
        Route::post('/', 'create')->name('create');
        Route::delete('/{id}', 'destroy')->name('delete');
    });
});

Route::controller(LanguageController::class)
->name('language.')
->group(function ()
{
    Route::post('/switch-language', 'store')
    ->name('switch');
});

Route::controller(GuestController::class)
->middleware('guest')
->group(function ()
{
    Route::get('/', 'index')->name('login');
});

Route::controller(PasswordResetController::class)
->prefix('password-reset')
->group(function ()
{
    /**
     * Fortifyの設定（ `config/fortify.php` ） で
     * `'view'` を `false` にした場合、
     * 名前が `password.reset` のルートで
     * パスワード再設定用のページを表示させる必要がある。
     * @see https://laravel.com/docs/11.x/fortify#disabling-views-and-password-reset
     * TODO: トークンがない場合エラーを返す。
     */
    Route::get('/', 'store')
    ->name('password.reset');

    Route::get('/request', 'request');
});
