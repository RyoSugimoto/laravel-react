<?php

namespace App\Services\SharedData;

use App\Domain\SharedData\Status\{
    StatusDTO,
    StatusEntity
};
use Illuminate\Support\Carbon;

class StatusService
{
    const STATUS_MESSAGE = 'status';
    const STATUS_PUBLISHED_AT = 'status_published_at';

    /**
     * @return ?array<string, mixed>
     */
    public function getStatusData(): ?array
    {
        $entity = self::getStatus();

        if (is_null($entity)) {
            return null;
        }

        $dto = StatusDTO::fromEntity($entity);

        return $dto->toArray();
    }

    static public function setStatus(string $message): void
    {
        $published_at = Carbon::now();

        session()->flash(self::STATUS_MESSAGE, $message);
        session()->flash(self::STATUS_PUBLISHED_AT, $published_at);
    }

    static public function getStatus(): ?StatusEntity
    {
        $message = session(self::STATUS_MESSAGE, null);

        if (is_null($message)) {
            return null;
        }

        $published_at = session(self::STATUS_PUBLISHED_AT, Carbon::now());

        return new StatusEntity(
            $message,
            $published_at,
            false
        );
    }
}
