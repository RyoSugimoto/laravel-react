<?php

namespace App\Services\Post;

use App\Domain\Post\{
    PostEntity,
    PostDTO,
    PostRepository
};

class GetPostService
{
    public function __construct(
        private PostRepository $repository
    )
    {
        //
    }

    /**
     * @return array<int, mixed>
     */
    public function getPostById(int $post_id): array
    {
        $entity = $this->repository->findEntityById($post_id);

        $dto = PostDTO::fromEntity($entity);

        return $dto->toArray();
    }

    /**
     * @return array<int, mixed>
     */
    public function getPostsByUserName(string $user_name): array
    {
        $entities = $this->repository->findEntitiesByUserName($user_name);

        $entities = $this->sortEntities($entities);

        $posts = array_map(function ($entity)
        {
            $dto = PostDTO::fromEntity($entity);

            return $dto->toArray();
        }, $entities);

        return $posts;
    }

    public function getViewablePostsByUserId(int $user_id)
    {
        $entities = $this->repository->findViewableEntitiesByUserId($user_id);

        $entities = $this->sortEntities($entities);

        $posts = array_map(function ($entity)
        {
            $dto = PostDTO::fromEntity($entity);

            return $dto->toArray();
        }, $entities);

        return $posts;
    }

    /**
     * @param array<int, PostEntity>
     * @return array<int, PostEntity>
     */
    protected function sortEntities(array $entities): array
    {
        usort($entities, fn ($a, $b) => $a->getCreatedAt() < $b->getCreatedAt());

        return $entities;
    }
}
