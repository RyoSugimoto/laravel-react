<?php

namespace App\DTO;

class FollowDTO
{
    private $follow_with_user;

    public function __construct($follow_with_user)
    {
        $this->follow_with_user = $follow_with_user;
    }

    public function get()
    {
        return [
            'name' => $this->follow_with_user->name,
            'approved' => $this->follow_with_user->approved,
            'muted' => $this->follow_with_user->muted,
        ];
    }
}
