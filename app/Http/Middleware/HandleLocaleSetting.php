<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as RequestFacade;
use Symfony\Component\HttpFoundation\Response;
use App\Services\LanguageService as Lang;

class HandleLocaleSetting
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $this->setLocale();
        return $next($request);
    }

    /**
     * 優先順にしたがって、アプリケーションのロケールを設定する。
     */
    protected function setLocale()
    {
        $primary_locale =
            Auth::user()?->language
            ??
            session('language')
            ??
            request()->cookie('language', null)
            ??
            RequestFacade::getPreferredLanguage()
            ??
            config('app.locale')
            ;

        Lang::setValidLocale($primary_locale);
    }
}
