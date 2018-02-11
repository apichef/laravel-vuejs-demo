<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Transformers\TagTransformer;
use App\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();

        return fractal($tags, new TagTransformer())
            ->withResourceName('tags');
    }
}
