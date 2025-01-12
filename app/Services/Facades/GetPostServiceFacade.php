<?php

namespace App\Services\Facades;

use App\Services\Post\GetPostService;
use Illuminate\Support\Facades\Facade;

/**
 * @see App\Services\Post\GetPostService
 */
class GetPostServiceFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return GetPostService::class;
    }
}
