<?php

namespace App\Policies;

use App\Models\{
    Post,
    User
};

class PostPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function create()
    {

    }

    public function delete(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }
}
