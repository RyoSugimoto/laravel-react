<?php

namespace App\Http\Controllers;

use App\Services\Facades\{
    GetPostServiceFacade,
    CreatePostServiceFacade
};
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * 投稿ページ
     */
    public function show(string $post_id)
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
            CreatePostServiceFacade::createPostByUserName(
                $request->name,
                $request->body,
            );
        } catch(\Exception $e) {
            abort(400, $e->getMessage());
            return back(400)
            ->with([
                'status' => __('status.postCreateError'),
            ]);
        }
    }

    /**
     * 投稿を削除する。
     * @param string $id 対象の `Post` のID
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return back()
            ->setStatusCode(400)
            ->with([
                'status' => __('status.post_delete_invalid'),
            ]);
        }

        try {
            $post->delete();
            return to_route('home')
            ->with([
                'status' => __('status.post_deleted'),
            ]);
        } catch(\Exception $e) {
            return back()
            ->setStatusCode(400)
            ->with([
                'status' => __('status.post_delete_error'),
            ]);
        }
    }
}
