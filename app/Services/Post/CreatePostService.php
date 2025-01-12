<?php

namespace App\Services\Post;

use App\Domain\Post\{
    PostDTO,
    PostRepository
};

class CreatePostService
{
    public function __construct(
        private PostRepository $repository
    )
    {
        //
    }

    public function createPostByUserName(string $user_name, string $post_body)
    {
        $entity = $this->repository->createByUserName($user_name, $post_body);

        return $entity;
    }
}
