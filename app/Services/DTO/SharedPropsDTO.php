<?php

namespace App\Services\DTO;

class SharedPropsDTO
{
    private ?array $status;
    private ?array $translation;
    private array $user;

    public function __construct(
        $status,
        $translation,
        $user
    )
    {
        $this->status = $status;
        $this->translation = $translation;
        $this->user = $user;
    }

    static public function fromDTO(
        StatusDTO $status_dto,
        TranslationDTO $translation_dto,
        UserDTO $user_dto
    ): self
    {
        $object = new self(
            $status_dto->toArrayForClient(),
            $translation_dto->toArrayForClient(),
            $user_dto->toArrayForAuthClient()
        );

        return $object;
    }

    public function toArrayForClient(): array
    {
        $data = [
            'status' => $this->status,
            'translationData' => $this->translation['data'],
            'translationLocale' => $this->translation['locale'],
            'user' => $this->user,
        ];

        return $data;
    }

    public function toWrappedArrayForClient(string $prop_name = 'shared'): array
    {
        return [
            $prop_name => $this->toArrayForClient(),
        ];
    }
}
