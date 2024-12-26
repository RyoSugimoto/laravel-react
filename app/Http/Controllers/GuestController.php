<?php

namespace App\Http\Controllers;

use App\Services\StatusService as Status;

class GuestController extends Controller
{
    public function welcome()
    {
        $status = Status::create();
        return inertia('Auth', [
            /**
             * 新パスワードの設定が成功した場合に返すメッセージ
             * @see https://laravel.com/docs/11.x/fortify#handling-the-password-reset-response
             * パスワード再設定のリクエストが成功した場合に返すメッセージ
             * @see https://laravel.com/docs/11.x/fortify#handling-the-password-reset-link-request-response
             */
            'status' => $status,
        ]);
    }
}
