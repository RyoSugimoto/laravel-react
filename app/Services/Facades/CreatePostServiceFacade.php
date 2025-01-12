<?php

namespace App\Services\Facades;

use App\Services\Post\CreatePostService;
use Illuminate\Support\Facades\Facade;

/**
 * @see App\Services\Post\CreatePostService
 */
class CreatePostServiceFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return CreatePostService::class;
    }
}
