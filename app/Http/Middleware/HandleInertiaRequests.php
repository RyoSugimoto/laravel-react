<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var String 状況に応じて決定される翻訳ロケール */
        $locale = $request->getPreferredLanguage() ?? config('app.locale');

        try {
            // 対象の翻訳ファイル（ `<ロケール名>.json` ）の `/lang` からの相対パスを指定
            $json = lang_path("frontend/{$locale}.json");
            $content = file_get_contents($json);
            /** @var Array 翻訳データの内容（連想配列） */
            $translation_data = json_decode($content, true);
        } catch(\Exception $e) {
            throw new \Exception("ロケール `{$locale}` の翻訳ファイル {$json} が見つかりません。{$e->getMessage()}");
        }

        return array_merge(parent::share($request), [
            'translation' => [
                'data' => $translation_data ?? [],
                'locale' => $locale,
            ],
        ]);
    }
}
