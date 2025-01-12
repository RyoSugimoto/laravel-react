<?php

namespace App\Domain\User;

class UserEntity{
    public function __construct(
        private int $id,
        private string $name,
        private string $email,
        private ?string $language,
        private ?string $display_name,
        private ?string $profile,
        private ?string $icon_url
    )
    {
        //
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getEmail() {
        return $this->name;
    }

    public function getLanguage() {
        return $this->name;
    }

    public function getDisplayName() {
        return $this->display_name;
    }

    public function getProfile() {
        return $this->profile;
    }

    public function getIconUrl() {
        return $this->icon_url;
    }
}
