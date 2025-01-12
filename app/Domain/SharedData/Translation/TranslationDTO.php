<?php

namespace App\Domain\SharedData\Translation;

class TranslationDTO
{
    public function __construct(
        private string $locale,
        private string $json,
    )
    {
        //
    }

    static public function fromEntity(TranslationEntity $entity): self
    {
        $dto = new self(
            $entity->getLocale(),
            $entity->getJson()
        );

        return $dto;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $json_array = json_decode($this->json, true);

        return [
            'locale' => $this->locale,
            'data' => $json_array,
        ];
    }
}
