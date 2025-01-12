<?php

namespace App\Http\Middleware;

use App\Services\SharedData\GetSharedDataService
;
use App\Services\DTO\StatusDTO;
use App\Services\DTO\SharedPropsDTO;
use App\Services\DTO\TranslationDTO;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
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
        $shared = new GetSharedDataService();
        $shared_data = $shared->getSharedData();

        return array_merge(parent::share($request), [
            'shared' => $shared_data,
        ]);
    }
}
