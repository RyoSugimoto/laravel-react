<?php

namespace App\Domain\Post;

interface PostRepository
{
    public function findEntityById(int $id): PostEntity;

    /**
     * @return array<int, PostEntity>
     */
    public function findEntitiesByUserName(string $user_name): array;

    /**
     * @return array<int, PostEntity>
     */
    public function findViewableEntitiesByUserId(int $user_id): array;

    public function createRecordByUserId(int $user_id, string $body): void;

    public function deleteRecordWithAuthorizationCheckById(int $post_id): void;
}
