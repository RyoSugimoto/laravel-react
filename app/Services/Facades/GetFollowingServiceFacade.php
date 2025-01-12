<?php

namespace App\Services\Facades;

use App\Services\Following\GetFollowingService;
use Illuminate\Support\Facades\Facade;

/**
 * @see App\Services\Following\GetFollowingService
 */
class GetFollowingServiceFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return GetFollowingService::class;
    }
}
