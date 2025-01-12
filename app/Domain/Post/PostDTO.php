<?php

namespace App\Domain\Post;

class PostDTO
{
    public function __construct(
        private int $id,
        private int $user_id,
        private string $body,
        private string $created_at,
        private string $user_name,
        private ?string $user_display_name,
        private ?string $user_icon_url
    )
    {
        //
    }

    static public function fromEntity(PostEntity $entity): self
    {
        $dto = new self(
            $entity->getId(),
            $entity->getUserId(),
            $entity->getBody(),
            $entity->getCreatedAt(),
            $entity->getUserName(),
            $entity->getUserDisplayName(),
            $entity->getUserIconUrl()
        );

        return $dto;
    }

    public function toEntity(): PostEntity
    {
        $entity = new PostEntity(
            $this->id,
            $this->user_id,
            $this->body,
            $this->created_at,
            $this->user_name,
            $this->user_display_name,
            $this->user_icon_url
        );

        return $entity;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'createdAt' => $this->created_at,
            'userName' => $this->user_name,
            'userDisplayName' => $this->user_display_name,
            'userIconUrl' => $this->user_icon_url,
        ];
    }
}
