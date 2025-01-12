<?php

namespace App\Services\Following;

use App\Domain\Following\{
    FollowingDTO,
    FollowingRepository
};

class GetFollowingService
{
    public function __construct(
        private FollowingRepository $repository
    )
    {
        //
    }

    public function getFollowingsByUserId(int $user_id)
    {
        $entities = $this->repository->findEntitiesByUserId($user_id);

        $followings = array_map(function ($entity)
        {
            $dto = FollowingDTO::fromEntity($entity);

            return $dto->toArray();
        }, $entities);

        return $followings;
    }
}
