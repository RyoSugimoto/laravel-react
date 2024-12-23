<?php

namespace App\Services;

use Illuminate\Support\Facades\App;

class LanguageService
{
    /**
     * @var array<int, string> 有効なロケール
     * * 最初の要素をデフォルトのロケールとする。
     */
    static protected $supported_locales = [
        'ja',
        'en',
    ];

    static function setValidLocale(string $locale)
    {
        $locale_to_set = self::getValidLocale($locale);
        App::setLocale($locale_to_set);
    }

    /**
     * 受け取ったロケールが有効であればそのまま返し、無効であればデフォルトのロケールを返す（有効無効は `$supported_locales` プロパティに含まれているかどうかで判別）。
     * @param string $locale
     * @return string Valid locale
     */
    static function getValidLocale(string $locale): string
    {
        return in_array($locale, self::$supported_locales) ? $locale : self::$supported_locales[0];
    }
}
