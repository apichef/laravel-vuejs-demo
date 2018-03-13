<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Support\Facades\DB;
use Sarala\JsonApiResponse;
use Illuminate\Http\Request;
use App\Filters\PostsFilter;
use App\Http\Transformers\PostTransformer;

class PostController extends Controller
{
    public function index(Request $request, PostsFilter $filters)
    {
        $data = Post::filter($filters)->paginateOrGet($request);

        return new JsonApiResponse($data, new PostTransformer(), 'posts');
    }

    public function show(Post $post, PostsFilter $filter)
    {
        $data = Post::filter($filter)->find($post->id);

        return new JsonApiResponse($data, new PostTransformer(), 'posts');
    }

    public function update(Request $request, Post $post)
    {
        $post->update($request->input('data.attributes'));

        return response('', 204);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response('', 204);
    }
}
