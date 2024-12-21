<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use App\Models\User;

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
        $user = Auth::user();
        /**
         * @var string[] アプリケーションで対応するロケール
         * * `\Illuminate\Http\Request::getPreferredLanguage` に渡す値
         * * 適切なロケールがない場合は最初の要素が選ばれる。
         * * つまり、必ずこの配列内のいずれかのロケールが採用される。
         */
        $locales = ['ja', 'en'];
        /**
         * @var string 翻訳ロケール
         * 優先順位
         * 1. ログインしている場合はユーザの `language` カラム値
         * 2. セッションに `language` キーがある場合はその値
         * 3. HTTPヘッダの送信する `Accept-Language`
         * 4. アプリケーション設定の `locale`
         */
        $locale = config('app.locale');
        if (Auth::check() && $user->language && in_array($user->language, $locales)) {
            $locale = $user->language;
        } else if ($request->session()->exists('language') && in_array(session('language'), $locales)) {
            $locale = session('language');
        } else if ($request->getPreferredLanguage($locales)) {
            $locale = $request->getPreferredLanguage($locales);
        }

        try {
            /**
             * @var string 翻訳ファイルの絶対パス
             * * `lang_path` の引数には、対象の翻訳ファイル（ `<ロケール名>.json` ）の `/lang` ディレクトリからの相対パスを指定する。
             */
            $json = lang_path("frontend/{$locale}.json");
            $content = file_get_contents($json);
            /** @var array<string, mixed> 翻訳データの内容の連想配列 */
            $translation_data = json_decode($content, true);
        } catch(\Exception $e) {
            // 翻訳ファイルが存在しない場合
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
