<?php

namespace App\Http\Controllers;

use Illuminate\support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\DTO\PostDTO;

class PostController extends Controller
{
    /**
     * ホーム画面
     */
    public function index()
    {
        $user = Auth::user();

        $posts = Post::where('user_id', $user->id)
        ->with('user:id,name')
        ->orderBy('created_at', 'desc')
        ->get();

        $posts_data = $posts->map(function ($post)
        {
            $dto = new PostDTO($post);
            return $dto->get();
        });

        return inertia('Dashboard', [
            'name' => $user?->name,
            'email' => $user?->email,
            'language' => $user?->language ?? '',
            'posts' => $posts_data,
        ]);
    }

    /**
     * 投稿ページ
     */
    public function show(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            $dto = new PostDTO($post);
            $data = $dto->get();
            return inertia('Post', [
                'post' => $data,
            ]);
        } catch(\Exception $e) {
            abort(404);
        }
    }

    /**
     * 投稿を作成する。
     * TODO: バリデーション実装
     */
    public function create(Request $request)
    {
        $post = new Post();

        $name = $request->name;

        try {
            $user = User::getUserByName($name);
            $post->user_id = $user->id;
            $post->body = $request->body;
            $post->save();
        } catch(\Exception $e) {
            return back()
            ->setStatusCode(400)
            ->with([
                'status' => __('status.postCreateError'),
            ]);
        }

        return back();
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
