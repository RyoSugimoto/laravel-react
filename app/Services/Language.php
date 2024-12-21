<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class Language {
    static protected $locales = [
        'ja',
        'en',
    ];

    /**
     * 優先順位にしたがって言語を選択し返す。
     * 優先順位
     * 1. ログインしている場合はユーザの `language` カラム値
     * 2. セッションに `language` キーがある場合はその値
     * 3. HTTPヘッダの送信する `Accept-Language`
     * 4. アプリケーション設定の `locale`
     * 上記で決定したものが対応したロケールではない場合は、このクラスの `$locales` プロパティから最初の要素が設定される。
     */
    static public function get(): string
    {
        $user_language = Auth::user()?->language;
        $locale = $user_language ?? session('language') ?? Request::getPreferredLanguage() ?? config('app.locale');
        $locale = in_array($locale, self::$locales) ? $locale : self::$locales[0];

        return $locale;
    }
}
