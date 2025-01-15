<?php

namespace App\Services\Post;

use App\Domain\Post\{
    PostRepository
};

class DeletePostService
{
    public function __construct(
        private PostRepository $repository
    )
    {
        //
    }

    public function deletePostWithAuthorizationCheckById(int $post_id)
    {
        $this->repository->deleteRecordWithAuthorizationCheckById($post_id);
    }
}
