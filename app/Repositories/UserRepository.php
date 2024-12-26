<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    static public function getUserByName($name): User
    {
        $user = User::where('name', $name)->first();
        return $user;
    }
}
