<?php

namespace App\Services\DTO;

class FollowingDTO
{
    private string $user_name;
    private string $followed_user_name;
    private ?string $followed_user_display_name;
    private ?string $followed_user_icon_url;
    private bool $approved;
    private bool $muted;
    private string $created_at;

    public function __construct(
        string $user_name,
        string $followed_user_name,
        ?string $followed_user_display_name,
        ?string $followed_user_icon_url,
        bool $approved,
        bool $muted,
        string $created_at
    )
    {
        $this->user_name = $user_name;
        $this->followed_user_name = $followed_user_name;
        $this->followed_user_display_name = $followed_user_display_name;
        $this->followed_user_icon_url = $followed_user_icon_url;
        $this->approved = $approved;
        $this->muted = $muted;
        $this->created_at = $created_at;
    }

    static public function fromFollowingWithUserData($following): self
    {
        // throw new \Exception($following);

        $dto = new self(
            $following->user->name,
            $following->followedUser->name,
            $following->followedUserProfile->display_name,
            $following->followedUserProfile->icon_url,
            $following->approved,
            $following->muted,
            $following->created_at
        );

        return $dto;
    }

    public function toArrayForClient(): array
    {
        $approved = $this->approved;

        return [
            'userName' => $this->user_name,
            'followedUserName' => $this->followed_user_name,
            'followedUserDisplayName' => $approved ? $this->followed_user_display_name : null,
            'followedUserIconUrl' => $approved ? $this->followed_user_icon_url : null,
            'approved' => $this->approved,
            'muted' => $this->muted,
            'createdAt' => $this->created_at,
        ];
    }
}