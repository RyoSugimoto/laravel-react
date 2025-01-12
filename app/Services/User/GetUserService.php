<?php

namespace App\Services\User;

use App\Domain\User\{
    UserDTO,
    UserRepository
};

class GetUserService
{
    public function __construct(
        private UserRepository $repository
    )
    {
        //
    }

    /**
     * @param array<int, string> $exceptions
     * @return array<string, mixed>
     */
    public function getUserById(int $user_id, array $exceptions = ['id']): array
    {
        $entity = $this->repository->findEntityByUserId($user_id);

        $dto = UserDTO::fromEntity($entity);

        return $dto->toArray($exceptions);
    }

    /**
     * @param array<int, string> $exceptions
     * @return array<string, mixed>
     */
    public function getUserByName(string $user_name, array $exceptions = ['id']): array
    {
        $entity = $this->repository->findEntityByUserName($user_name);

        $dto = UserDTO::fromEntity($entity);

        return $dto->toArray($exceptions);
    }
}
