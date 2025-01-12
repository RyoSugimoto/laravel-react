<?php

namespace App\Domain\SharedData\Status;

class StatusDTO
{
    public function __construct(
        private string $message,
        private string $published_at,
        private bool $read,
    )
    {
        //
    }

    static public function fromEntity(StatusEntity $entity): self
    {
        $dto = new self(
            $entity->getMessage(),
            $entity->getPublishedAt(),
            $entity->getRead(),
        );

        return $dto;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        $array = [
            'message' => $this->message,
            'publishedAt' => $this->published_at,
            'read' => $this->read,
        ];

        return $array;
    }
}
