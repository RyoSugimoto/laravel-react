<?php

namespace App\Infrastructure\Laravel;

use App\Domain\Post\
{
    PostEntity,
    PostRepository
};
use App\Models\{
    Post
};
use Illuminate\Support\Facades\{
    Auth,
    DB
};

class LaravelPostRepository implements PostRepository
{
    public function findEntityById(int $id): PostEntity
    {
        $data = DB::table('posts', 'ps')
        ->selectRaw('ps.id as post_id, ps.body as post_body, ps.created_at as post_created_at, ps.user_id as post_user_id, u.id as user_id, u.name as user_name, p.user_id, p.display_name as user_display_name, p.icon_url as user_icon_url')
        ->where('ps.id', '=', $id)
        ->leftJoin('users as u', 'u.id', '=', 'ps.user_id')
        ->leftJoin('user_profiles as p', 'p.user_id', '=', 'ps.user_id')
        ->first();

        if (is_null($data)) {
            throw new \Exception('投稿データが見つかりません。');
        }

        $entity = new PostEntity(
            $data->post_id,
            $data->post_user_id,
            $data->post_body,
            $data->post_created_at,
            $data->user_name,
            $data->user_display_name,
            $data->user_icon_url,
        );

        return $entity;
    }

    /**
     * @return array<int, PostEntity>
     */
    public function findEntitiesByUserName(string $user_name): array
    {
        $data = DB::table('users', 'u')
        ->selectRaw('ps.id as post_id, ps.body as post_body, ps.created_at as post_created_at, ps.user_id as post_user_id, u.id as user_id, u.name as user_name, p.user_id, p.display_name as user_display_name, p.icon_url as user_icon_url')
        ->where('u.name', '=', $user_name)
        ->leftJoin('user_profiles as p', 'p.user_id', '=', 'u.id')
        ->join('posts as ps', 'u.id', '=', 'ps.user_id')
        ->orderBy('ps.created_at', 'desc')
        ->get();

        $entities = $data->map(function ($data_item)
        {
            return new PostEntity(
                $data_item->post_id,
                $data_item->post_user_id,
                $data_item->post_body,
                $data_item->post_created_at,
                $data_item->user_name,
                $data_item->user_display_name,
                $data_item->user_icon_url,
            );
        });

        return $entities->toArray();
    }

    public function createRecordByUserId(int $user_id, string $post_body): void
    {
        $new_post = new Post();
        $new_post->user_id = $user_id;
        $new_post->body = $post_body;

        try {

            $new_post->save();

        } catch(\Exception $e) {

            throw new \Exception($e->getMessage());

        }
    }

    public function deleteRecordWithAuthorizationCheckById(int $post_id): void
    {
        $post = Post::find($post_id);

        if (is_null($post)) {
            throw new \Exception('削除対象の投稿が見つかりません。');
        }

        if (Auth::user()->cannot('delete', $post)) {
            throw new \Exception('この投稿を削除する権限がありません。');
        }

        try {

            $post->delete();

        } catch(\Exception $e) {

            throw new \Exception($e->getMessage());

        }
    }
}
