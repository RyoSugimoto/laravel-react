<?php

namespace App\Domain\Post;

interface PostRepository
{
    public function findEntityById(int $id): PostEntity;

    /**
     * @return array<int, PostEntity>
     */
    public function findEntitiesByUserName(string $user_name): array;

    public function createByUserName(string $user_name, string $body): PostEntity;

    public function deleteRecordWithAuthorizationCheckById(int $post_id): void;
}
