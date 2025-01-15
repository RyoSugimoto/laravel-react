<?php

namespace App\Services\Post;

use App\Domain\Post\{
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

    public function createPostByUserId(int $user_id, string $post_body)
    {
        $this->repository->createRecordByUserId($user_id, $post_body);
    }
}
