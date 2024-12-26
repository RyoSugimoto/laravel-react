<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\PostController;

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
    Route::get('/', 'welcome')->name('login');
});

/**
 * Fortifyの設定（ `config/fortify.php` ） で
 * `'view'` を `false` にした場合、
 * 名前が `password.reset` のルートで
 * パスワード再設定用のページを表示させる必要がある。
 * @see https://laravel.com/docs/11.x/fortify#disabling-views-and-password-reset
 */
Route::get('/password-reset', function()
{
    $token = request()->query('token');
    $email = request()->query('email');
    return inertia('PasswordReset', [
        'token' => $token,
        'email' => $email,
    ]);
})
->name('password.reset');
