<?php

namespace App\DTO;

use App\Models\Post;
use App\Services\DateService as Date;

class PostDTO
{
    private $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * `Post` からクライアントサイドに渡すデータを作成して返す。
     */
    public function get(): array
    {
        $created_at = new Date($this->post['created_at']);

        return [
            'id' => $this->post['id'],
            'user' => $this->post['user']['name'],
            'body' => $this->post['body'],
            'createdAt' => $created_at->get(),
        ];
    }
}
