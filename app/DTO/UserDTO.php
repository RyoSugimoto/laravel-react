<?php

namespace App\DTO;

use App\Models\User;

class UserDTO
{
    private $user = null;

    public function __construct(User | null $user = null)
    {
        $this->user = $user;
    }

    public function get(): array | null
    {
        if (!$this->user) {
            return null;
        }

        return [
            'name' => $this->user->name,
            'displayName' => $this->user->display_name,
            'profile' => $this->user->profile,
            'iconUrl' => $this->user->icon_url,
        ];
    }
}
