<?php

namespace App\DTO;

class FollowingDTO
{
    private $user_name;
    private $followed_user_name;
    private $approved;
    private $muted;
    private $created_at;

    public function __construct(
        string $user_name,
        string $followed_user_name,
        bool $approved,
        bool $muted,
        string $created_at
    )
    {
        $this->user_name = $user_name;
        $this->followed_user_name = $followed_user_name;
        $this->approved = $approved;
        $this->muted = $muted;
        $this->created_at = $created_at;
    }

    static public function createFromFollowingWithUserData($following)
    {
        $dto = new self(
            $following->user_name,
            $following->followed_user_name,
            $following->approved,
            $following->muted,
            $following->created_at
        );

        return $dto;
    }

    public function toArrayForClient()
    {
        return [
            'userName' => $this->user_name,
            'followedUserName' => $this->followed_user_name,
            'approved' => $this->approved,
            'muted' => $this->muted,
            'createdAt' => $this->created_at,
        ];
    }
}
