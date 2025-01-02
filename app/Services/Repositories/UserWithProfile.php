<?php

namespace App\Services\Repositories;

use App\Models\User;

/**
 * `User` モデルに、関連する `UserProfile` モデルを結合したオブジェクト
 */
class UserWithProfile
{
    public string $id;
    public string $name;
    public string $email;
    public string $language;
    // public string $timezone;
    public string $created_at;
    public ?string $display_name;
    public ?string $profile_body;
    public ?string $icon_url;

    public function __construct(
        string $id,
        string $name,
        string $email,
        string $language,
        // string $timezone,
        string $created_at,
        ?string $display_name,
        ?string $profile_body,
        ?string $icon_url
    )
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->language = $language;
        // $this->timezone = $timezone;
        $this->created_at = $created_at;
        $this->display_name = $display_name ;
        $this->profile_body = $profile_body ;
        $this->icon_url = $icon_url;
    }

    /**
     * `User::id` から `UserWithProfile` インスタンスを生成して返す。
     */
    static public function fromUserId(string $user_id): self
    {
        $entity = User::find($user_id)
        ->with([
            'userProfile:user_id,display_name,body,icon_url',
        ])
        ->first();

        $object = new self(
            $entity->id,
            $entity->name,
            $entity->email,
            $entity->language,
            // $entity->timezone,
            $entity->created_at,
            $entity->userProfile->display_name,
            $entity->userProfile->body,
            $entity->userProfile->icon_url
        );

        return $object;
    }
}
