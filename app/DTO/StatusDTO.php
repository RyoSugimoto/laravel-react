<?php

namespace App\DTO;

use App\Services\DateService as Date;

class StatusDTO
{
    private $message;
    private $published_at;

    public function __construct(string $status)
    {
        $this->message = $status;

        $date= new Date();
        $this->published_at = $date->get();
    }

    /**
     * クライアントサイドに渡すデータを作成して返す。
     * @return array<string, mixed> | null
     */
    public function get(): array | null
    {
        if (!$this->message) {
            return null;
        }

        return [
            'message' => $this->message,
            'publishedAt' => $this->published_at,
            'read' => false,
        ];
    }
}
