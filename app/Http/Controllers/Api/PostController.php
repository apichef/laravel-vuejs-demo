<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Transformers\PostTransformer;
use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query();

        if ($request->filled('include')) {
            $query->with(explode(',', $request->get('include')));
        }

        if ($request->filled('page')) {
            $posts = $query->paginate($request->input('page.size'), null, null, $request->input('page.number'));
        } else {
            $posts = $query->get();
        }

        return fractal($posts, new PostTransformer())
            ->withResourceName('posts')
            ->parseIncludes($request->get('include'));
    }

    public function show(Post $post, Request $request)
    {
        if ($request->filled('include')) {
            $post->load(explode(',', $request->get('include')));
        }

        return fractal($post, new PostTransformer())
            ->withResourceName('posts')
            ->parseIncludes($request->get('include'));
    }
}
