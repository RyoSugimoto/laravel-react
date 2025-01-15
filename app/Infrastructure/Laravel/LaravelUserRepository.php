<?php

namespace App\Infrastructure\Laravel;

use App\Domain\User\{
    UserEntity,
    UserRepository,
};
use Illuminate\Support\Facades\{
    Auth,
    DB
};

class LaravelUserRepository implements UserRepository
{
    public function findEntityByUserId(int $user_id): ?UserEntity
    {
        $result = DB::table('users', 'u')
        ->selectRaw('u.id,u.name,u.email,u.language,p.display_name,p.user_id,p.body as profile,p.icon_url')
        ->where('u.id', $user_id)
        ->leftJoin('user_profiles as p', 'p.user_id', '=', 'u.id')
        ->first();

        if (empty($result)) {
            return null;
        }

        $entity = new UserEntity(
            $result->id,
            $result->name,
            $result->email,
            $result->language,
            $result->display_name,
            $result->profile,
            $result->icon_url
        );

        return $entity;
    }

    public function findEntityByUserName(string $user_name): UserEntity
    {
        $result = DB::table('users', 'u')
        ->selectRaw('u.id,u.name,u.email,u.language,p.display_name,p.user_id,p.body as profile,p.icon_url')
        ->where('u.name', $user_name)
        ->leftJoin('user_profiles as p', 'p.user_id', '=', 'u.id')
        ->first();

        if (empty($result)) {
            return null;
        }

        $entity = new UserEntity(
            $result->id,
            $result->name,
            $result->email,
            $result->language,
            $result->display_name,
            $result->profile,
            $result->icon_url
        );

        return $entity;
    }

    public function findAuthenticatedUserEntity(): ?UserEntity
    {
        $user = Auth::user();

        if (is_null($user)) {
            return null;
        }

        $entity = new UserEntity(
            $user->id,
            $user->name,
            $user->email,
            $user->language,
            $user->userProfile->display_name,
            $user->userProfile->body,
            $user->userProfile->icon_url
        );

        return $entity;
    }
}
