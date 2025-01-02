<?php

namespace App\Services\DTO;

use App\Services\Repositories\UserWithProfile;

class UserDTO
{
    private $name;
    private $email;
    private $language;
    // private $timezone;
    private $display_name;
    private $profile_body;
    private $icon_url;

    public function __construct(
        $name,
        $email,
        $language,
        // $timezone,
        $display_name,
        $profile_body,
        $icon_url
    )
    {
        $this->name = $name;
        $this->email = $email;
        $this->language = $language;
        // $this->timezone = $timezone;
        $this->display_name = $display_name;
        $this->profile_body = $profile_body;
        $this->icon_url = $icon_url;
    }

    static public function fromUserWithProfile(UserWithProfile $user_with_profile): self
    {
        $dto = new self(
            $user_with_profile->name,
            $user_with_profile->email,
            $user_with_profile->language,
            // $user_with_profile->timezone,
            $user_with_profile->display_name,
            $user_with_profile->profile_body,
            $user_with_profile->icon_url
        );

        return $dto;
    }

    public function toArrayForClient(): array
    {
        $data = [
            'name' => $this->name,
            'display_name' => $this->display_name,
            'profile' => $this->profile_body,
            'iconUrl' => $this->icon_url,
        ];

        return $data;
    }

    public function toArrayForAuthClient()
    {
        $data = [
            'name' => $this->name,
            'email' => $this->email,
            'language' => $this->language,
            // 'timezone' => $this->timezone,
            'displayName' => $this->display_name,
            'profile' => $this->profile_body,
            'iconUrl' => $this->icon_url,
        ];

        return $data;
    }
}
