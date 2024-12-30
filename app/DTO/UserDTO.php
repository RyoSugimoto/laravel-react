<?php

namespace App\DTO;

use App\Models\User;

class UserDTO
{
    private $user = null;

    public function __construct(User $user)
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
            'email' => $this->user->email,
            'language' => $this->user->language,
        ];
    }
}
