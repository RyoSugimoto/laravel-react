<?php

namespace App\Domain\User;

class UserDTO
{
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

    static public function fromEntity(UserEntity $entity): self
    {
        $dto = new self(
            $entity->getId(),
            $entity->getName(),
            $entity->getEmail(),
            $entity->getLanguage(),
            $entity->getDisplayName(),
            $entity->getProfile(),
            $entity->getIconUrl()
        );

        return $dto;
    }

    public function toEntity(): UserEntity
    {
        $entity = new UserEntity(
            $this->id,
            $this->name,
            $this->email,
            $this->language,
            $this->display_name,
            $this->profile,
            $this->icon_url
        );

        return $entity;
    }

    /**
     * @param array<int, string> $exceptions 除外するプロパティ名の配列）
     * @return array<string, mixed>
     */
    public function toArray(array $exceptions = []): array
    {
        $array = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'language' => $this->language,
            'displayName' => $this->display_name,
            'profile' => $this->profile,
            'iconUrl' => $this->icon_url
        ];

        foreach ($exceptions as $key) {
            if (key_exists($key, $array)) {
                unset($array[$key]);
            }
        }

        return $array;
    }
}
