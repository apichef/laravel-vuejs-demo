<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostTagController extends Controller
{
    public function update(Post $post, Request $request)
    {
        $tagIds = collect($request->get('data'))->pluck('id')->all();
        $post->tags()->sync($tagIds);

        return response('', 204);
    }
}
