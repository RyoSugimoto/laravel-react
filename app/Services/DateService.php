<?php

namespace App\Services;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class DateService
{
    protected $datetime;
    protected $client_timezone;
    /**
     * @var string 「ISO 8601」の日付フォーマット
     * @see https://ja.wikipedia.org/wiki/ISO_8601
     * * PHPの日付フォーマットとは書式が異なる。
     */
    protected $ISO8601Format = 'LL HH:mm:ss';
    protected $locale;

    /**
     * @param string $datetime 日時の文字列（指定しない場合は現在の日時が採用される）
     */
    public function __construct(string $datetime = '')
    {
        $this->datetime = $datetime ? Carbon::parse($datetime) : Carbon::now();
        $this->client_timezone = $this->getPrimaryTimezone('UTC');
        $this->locale = App::getLocale();

        $this->getDatetime()
        ->locale($this->getLocale())
        ->setTimezone($this->getTimezone());
    }

    public function getTimezoneFromClientCookie($default): string
    {
        // NOTE: Cookieはミドルウエアで暗号化されるため、クライアント側でセットした値は取得できない。
        /**
         * クライアントで保存されたCookieは `EncryptCookies` ミドルウエアで暗号化されるため、 `Request::cookie` メソッドで正常に取得できない（ `null` が返る）。
         * 下記のいずれかの方法でそれが回避できる。
         * 1. スーパーグローバルの `$_COOKIE` から取得する。
         * 2. `EncryptCookies` ミドルウエアの `$except` プロパティに暗号化しないキー名を追加する（ `bootstrap/app.php` で行なう）。
         */
        // 方法1
        // return $_COOKIE['timezone'] ?? $default;

        // 方法2
        // NOTE: `bootstrap/app.php` で `EncryptCookies` の `$except` に `'timezone'` を追加することが前提。こちらの方法の方が、Laravelの作法に則っているため採用。
        $timezone = request()->cookie('timezone', $default);
        session(['timezone' => $timezone]);
        return $timezone;
    }

    public function getPrimaryTimezone(string $default): string
    {
        $user = Auth::user();

        $primary_timezone =
        $user->timezone
        ??
        session('timezone', null)
        ??
        $this->getTimezoneFromClientCookie($default);

        return $primary_timezone;
    }

    public function getDatetime(): Carbon
    {
        return $this->datetime;
    }

    public function getTimezone()
    {
        return $this->client_timezone;
    }

    public function getLocale()
    {
        return $this->locale;
    }

    public function setFormat(string $format)
    {
        $this->ISO8601Format = $format;
    }

    /**
     * ISO 8601形式でフォーマットされた日時を返す。
     */
    public function get()
    {
        return $this->getDatetime()
        ->isoFormat($this->ISO8601Format);
    }
}
