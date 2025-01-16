<?php

namespace App\Http\Controllers;

use App\Services\Facades\{
    GetPostServiceFacade,
    CreatePostServiceFacade,
    GetUserServiceFacade,
};
use App\Services\Post\DeletePostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * 投稿ページ
     */
    public function show(string $user_name, string $post_id)
    {
        try {

            $post = GetPostServiceFacade::getPostById($post_id);

            return inertia('Post', [
                'post' => $post,
            ]);

        } catch(\Exception $e) {

            abort(404, $e->getMessage());

        }
    }

    /**
     * 投稿を作成する。
     * TODO: バリデーション実装
     */
    public function create(Request $request)
    {
        try {
            $user_entity = GetUserServiceFacade::getAuthenticatedUserEntity();

            CreatePostServiceFacade::createPostByUserId(
                $user_entity->getId(),
                $request->body,
            );

        } catch(\Exception $e) {

            abort(400, $e->getMessage());

        }
    }

    /**
     * 投稿を削除する。
     * @param string $id 対象の `Post` のID
     */
    public function destroy(string $post_id)
    {

        $delete_service = app()->make(DeletePostService::class);

        try {

            $delete_service->deletePostWithAuthorizationCheckById($post_id);

            return to_route('home')
            ->with([
                'status' => __('status.post_deleted'),
            ]);

        } catch(\Exception $e) {

            abort(403, $e->getMessage());

        }
    }
}
