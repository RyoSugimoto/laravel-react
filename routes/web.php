<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\support\Facades\Auth;

Route::get('/', function ()
{
    return inertia('Auth', []);
})->name('login')->middleware('guest');

Route::get('/home', function ()
{
    $user = Auth::user();
    return inertia('Dashboard', [
        'name' => $user?->name,
        'email' => $user?->email,
    ]);
})->middleware('auth');
