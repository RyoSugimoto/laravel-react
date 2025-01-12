<?php

namespace App\Domain\Following;

Interface FollowingRepository
{
    /**
     * 受け取ったIDのユーザが `$user_id` と一致する（フォローしている） `FollowingEntity` を配列として返す。
     * @param int $user_id
     * @return array<int, FollowingEntity>
     */
    public function findEntitiesByUserId(int $user_id): array;
}
