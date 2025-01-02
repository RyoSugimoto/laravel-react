<?php

namespace App\Http\Middleware;

use App\Services\Repositories\UserWithProfile;
use App\Services\DTO\StatusDTO;
use App\Services\DTO\SharedPropsDTO;
use App\Services\DTO\TranslationDTO;
use App\Services\DTO\UserDTO;
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
        $auth_user = Auth::user();

        $user_with_profile = UserWithProfile::fromUserId($auth_user->id);
        $user_dto = UserDTO::fromUserWithProfile($user_with_profile);

        $shared_data = SharedPropsDTO::fromDTO(
            StatusDTO::fromSession(),
            TranslationDTO::fromLocale($locale),
            $user_dto
        )->toWrappedArrayForClient();

        return array_merge(parent::share($request), $shared_data);
    }
}
