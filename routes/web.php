<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\LanguageController;

Route::controller(LanguageController::class)
->name('language.')
->group(function ()
{
    Route::post('/switch-language', 'store')
    ->name('switch');
});

Route::get('/', function ()
{
    return inertia('Auth', [
        /**
         * 新パスワードの設定が成功した場合に返すメッセージ
         * @see https://laravel.com/docs/11.x/fortify#handling-the-password-reset-response
         * パスワード再設定のリクエストが成功した場合に返すメッセージ
         * @see https://laravel.com/docs/11.x/fortify#handling-the-password-reset-link-request-response
         */
        'status' => session('status', ''),
    ]);
})
->name('login')
->middleware('guest');

Route::get('/home', function ()
{
    $user = Auth::user();

    return inertia('Dashboard', [
        'name' => $user?->name,
        'email' => $user?->email,
        'language' => $user?->language ?? '',
    ]);
})
->name('home')
->middleware('auth');

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
