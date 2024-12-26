<?php

namespace App\DTO;

use App\Services\DateService as Date;

class StatusDTO
{
    private $status_message;

    public function __construct(string $status)
    {
        $this->status_message = $status;
    }

    /**
     * クライアントサイドに渡すデータを作成して返す。
     */
    public function get(): array
    {
        $date= new Date();

        return [
            'message' => $this->status_message,
            'publishedAt' => $date->get(),
            'read' => false,
        ];
    }
}
