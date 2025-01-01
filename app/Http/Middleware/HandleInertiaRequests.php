<?php

namespace App\Http\Middleware;

use App\DTO\UserDTO;
use App\Models\User;
use App\Services\StatusService as Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
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
        $locale = App::getLocale();

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

        $auth_user = Auth::user();

        return array_merge(parent::share($request), [
            /**
             * 次のメッセージを含む `Status` オブジェクト。
             * * 新パスワードの設定が成功した場合に返すメッセージ
             *  @see https://laravel.com/docs/11.x/fortify#handling-the-password-reset-response
             * * パスワード再設定のリクエストが成功した場合に返すメッセージ
             *  @see https://laravel.com/docs/11.x/fortify#handling-the-password-reset-link-request-response
             */
            'status' => Status::create(),
            'translation' => [
                'data' => $translation_data ?? [],
                'locale' => $locale,
            ],
            'user' => $auth_user ? $this->getAuthUserDataById($auth_user->id) : null,
        ]);
    }

    protected function getAuthUserDataById($user_id)
    {
        $user_with_profile = User::getUserWithProfileById($user_id);
        $dto = UserDTO::createFromUserWithProfile($user_with_profile);
        $user_data = $dto->toArrayForAuthClient();

        return $user_data;
    }
}
