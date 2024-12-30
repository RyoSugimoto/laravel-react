<?php

namespace App\Http\Controllers;

class PasswordResetController extends Controller
{
    public function store()
    {
        // TODO: トークンがない場合エラーを返す。
        $token = request()->query('token');
        $email = request()->query('email');

        return inertia('PasswordReset', [
            'token' => $token,
            'email' => $email,
        ]);
    }
}
