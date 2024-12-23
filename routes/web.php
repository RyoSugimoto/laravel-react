<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\LanguageController;
use App\Models\Post;
use Illuminate\Support\Carbon;

Route::delete('/posts/{id}', function ($id)
{
    $post = Post::find($id);

    if ($post) {
        $post->delete();
        $post->save();
        session()->flash('status', __('status.post_deleted'));
    } else {
        session()->flash('status', __('status.post_deleted_error'));
    }

    return Inertia::location(url()->previous());
});

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

    // $posts = $user->posts()->get();

    $posts = Post::where('user_id', $user->id)->with('user:id,name')->get()->toArray();

    $posts_to_return = array_map(function ($post)
    {
        $created_at_with_locale = Carbon::parse($post['created_at'])->locale(App::getLocale());
        $created_at_formatted = $created_at_with_locale->isoFormat('LLL');
        return [
            'id' => $post['id'],
            'user' => $post['user']['name'],
            'body' => $post['body'],
            'createdAt' => $created_at_formatted,
        ];
    }, $posts);

    return inertia('Dashboard', [
        'name' => $user?->name,
        'email' => $user?->email,
        'language' => $user?->language ?? '',
        'posts' => $posts_to_return,
        'status' => session('status', ''),
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
