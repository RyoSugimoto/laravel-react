<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use App\Services\LanguageService as Lang;

use Inertia\Inertia;

class LanguageController extends Controller
{
    public function switch(Request $request)
    {
        $locale = $request->get('language');

        if (Auth::check()) {
            $user = Auth::user();
            $user->language = $locale;
            $user->save();
        } else {
            session(['language' => $locale]);
            Cookie::queue('language', $locale, 60 * 24 * 30);
        }

        Lang::setValidLocale($locale);

        $locale_label = __("status.locale_labels.$locale", []);
        $flash_message = __('status.language_switched', [
            'locale_label' => $locale_label,
        ]);

        session()->flash('status', $flash_message);

        return Inertia::location(url()->previous());
    }
}
