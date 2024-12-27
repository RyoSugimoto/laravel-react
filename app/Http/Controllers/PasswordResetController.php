<?php

namespace App\Http\Controllers;

class PasswordResetController extends Controller
{
    public function store()
    {
        $token = request()->query('token');
        $email = request()->query('email');

        return inertia('PasswordReset', [
            'token' => $token,
            'email' => $email,
        ]);
    }

    public function request()
    {
        $email = request()->query('email');

        return inertia('PasswordResetRequest', [
            'email' => $email,
        ]);
    }
}
