<?php

namespace App\Services\Facades;

use App\Services\User\GetUserService;
use Illuminate\Support\Facades\Facade;

/**
 * @see App\Services\User\GetUserService
 */
class GetUserServiceFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return GetUserService::class;
    }
}
