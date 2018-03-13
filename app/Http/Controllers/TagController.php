<?php

namespace App\Http\Controllers;

use App\Tag;
use Sarala\JsonApiResponse;
use App\Http\Transformers\TagTransformer;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();

        return new JsonApiResponse($tags, new TagTransformer(), 'tags');
    }
}
