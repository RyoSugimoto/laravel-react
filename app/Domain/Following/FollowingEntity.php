<?php

namespace App\Domain\Following;

class FollowingEntity
{
    public function __construct(
        private int $id,
        private int $user_id,
        private int $followed_user_id,
        private bool $muted,
        private bool $approved,
        private string $created_at,
        private string $followed_user_name,
        private ?string $followed_user_display_name,
        private ?string $followed_user_icon_url
    )
    {
        //
    }

    public function getId()
    {
        return $this->id;
    }


    public function getUserId()
    {
        return $this->user_id;
    }

    public function getFollowedUserId()
    {
        return $this->followed_user_id;
    }

    public function getMuted()
    {
        return $this->muted;
    }

    public function getApproved()
    {
        return $this->approved;
    }

    public function getCreatedAt()
    {
        return $this->created_at;
    }

    public function getFollowedUserName()
    {
        return $this->followed_user_name;
    }

    public function getFollowedUserDisplayName()
    {
        return $this->followed_user_display_name;
    }

    public function getFollowedUserIconUrl()
    {
        return $this->followed_user_icon_url;
    }
}
