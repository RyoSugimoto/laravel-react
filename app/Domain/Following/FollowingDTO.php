<?php

namespace App\Domain\Following;

class FollowingDTO
{
    public function __construct(
        private int $id,
        private int $user_id,
        private int $followed_user_id,
        private bool $muted,
        private bool $approved,
        private string $created_at,
        private ?string $followed_user_name,
        private ?string $followed_user_display_name,
        private ?string $followed_user_icon_url
    )
    {
        //
    }

    static public function fromEntity(FollowingEntity $entity): self
    {
        return new self(
            $entity->getId(),
            $entity->getUserId(),
            $entity->getFollowedUserId(),
            $entity->getMuted(),
            $entity->getApproved(),
            $entity->getCreatedAt(),
            $entity->getFollowedUserName(),
            $entity->getFollowedUserDisplayName(),
            $entity->getFollowedUserIconUrl()
        );
    }

    public function toEntity(): FollowingEntity
    {
        $entity = new FollowingEntity(
            $this->id,
            $this->user_id,
            $this->followed_user_id,
            $this->muted,
            $this->approved,
            $this->created_at,
            $this->followed_user_name,
            $this->followed_user_display_name,
            $this->followed_user_icon_url
        );

        return $entity;
    }

    /**
     * クライアントに送信するためにデータを加工する。
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'muted' => $this->muted,
            'approved' => $this->approved,
            'createdAt' => $this->created_at,
            'followedUserName' => $this->followed_user_name,
            'followedUserDisplayName' => $this->followed_user_display_name,
            'followedUserIconUrl' => $this->followed_user_icon_url,
        ];
    }
}
