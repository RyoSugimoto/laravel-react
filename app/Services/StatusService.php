<?php

namespace App\Services;

use App\DTO\StatusDTO;

class StatusService
{
    static public function create()
    {
        $status = session('status', '');
        $dto = new StatusDTO($status);
        return $dto->get();
    }
}
