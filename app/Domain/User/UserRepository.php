<?php

namespace App\Domain\User;

interface UserRepository
{
    public function findEntityByUserId(int $user_id): ?UserEntity;

    public function findEntityByUserName(string $user_name): ?UserEntity;

    public function findAuthenticatedUserEntity(): ?UserEntity;
}
