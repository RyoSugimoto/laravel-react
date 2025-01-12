<?php

namespace App\Infrastructure\Laravel;

use App\Domain\Following\{
    FollowingRepository,
    FollowingEntity
};
use Illuminate\Support\Facades\DB;

class LaravelFollowingRepository implements FollowingRepository
{
    /**
     * @return array<int, FollowingEntity>
     */
    public function findEntitiesByUserId(int $user_id): array
    {
        $data = DB::table('followings', 'f')
        ->selectRaw('f.id, f.user_id, f.followed_user_id, f.muted, f.approved, f.created_at, u.name as followed_user_name, p.display_name as followed_user_display_name, p.icon_url as followed_user_icon_url')
        ->where('f.user_id', $user_id)
        ->join('users as u', 'f.followed_user_id', '=', 'u.id')
        ->join('user_profiles as p', 'f.followed_user_id', '=', 'p.user_id')
        ->get();

        $entities = $data->map(function ($data_item)
        {
            $entity = new FollowingEntity(
                $data_item->id,
                $data_item->user_id,
                $data_item->followed_user_id,
                $data_item->muted,
                $data_item->approved,
                $data_item->created_at,
                $data_item->followed_user_name,
                $data_item->followed_user_display_name,
                $data_item->followed_user_icon_url
            );

            return $entity;
        });

        return $entities->toArray();
    }
}
