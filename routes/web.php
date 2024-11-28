<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return inertia('Welcome', [
        'message' => 'Hello world.',
    ]);
})->name('welcome');

Route::get('/home', function()
{
    $user = Auth::user();

    if (!Auth::check()) {
        return to_route('welcome');
    }

    $name = $user?->name;
    $email = $user?->email;

    return inertia('Home', [
        'name' => $name,
        'email' => $email,
    ]);
})->name('home');

Route::controller(AuthController::class)
->name('auth.')
->group(function ()
{
    Route::get('/register', 'create')->name('create');
});
