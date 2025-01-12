<?php

namespace App\Domain\SharedData\Status;

class StatusEntity
{
    public function __construct(
        private string $message,
        private string $published_at,
        private bool $read = false
    )
    {
        //
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function getPublishedAt()
    {
        return $this->published_at;
    }

    public function getRead()
    {
        return $this->read;
    }
}
