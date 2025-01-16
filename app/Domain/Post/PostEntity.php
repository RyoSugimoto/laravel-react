<?php

namespace App\Domain\Post;

class PostEntity
{
    public function __construct(
        private int $id,
        private int $user_id,
        private string $title,
        private string $slug,
        private string $body,
        private string $created_at,
        private string $user_name,
        private ?string $user_display_name,
        private ?string $user_icon_url
    )
    {
        //
    }

    public function getId() {
        return $this->id;
    }

    public function getUserId() {
        return $this->user_id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getSlug() {
        return $this->slug;
    }

    public function getBody() {
        return $this->body;
    }

    public function getCreatedAt() {
        return $this->created_at;
    }

    public function getUserName() {
        return $this->user_name;
    }

    public function getUserDisplayName() {
        return $this->user_display_name;
    }

    public function getUserIconUrl() {
        return $this->user_icon_url;
    }

    /**
     * 投稿が削除される際に実行する処理
     */
    public function delete()
    {
        //
    }
}
