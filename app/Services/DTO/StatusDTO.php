<?php

namespace App\Services\DTO;

use App\Services\DateService as Date;

class StatusDTO
{
    private $message;
    private $published_at;
    private bool $read;

    public function __construct(
        ?string $message,
        bool $read = false
    )
    {
        $this->message = $message;
        $this->read = $read;

        $date= new Date();
        $this->published_at = $date->get();
    }

    static public function fromSession(string $default = null): self
    {
        $message = session('status', $default);

        $object = new self(
            $message
        );

        return $object;
    }

    public function toArrayForClient(): array
    {
        $data = [
            'message' => $this->message,
            'publishedAt' => $this->published_at,
            'read' => $this->read,
        ];

        return $data;
    }
}
