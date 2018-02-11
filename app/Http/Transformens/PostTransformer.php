<?php

namespace App\Http\Transformers;

use App\Post;
use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'author',
        'tags',
        'comments',
    ];

    public function transform(Post $post)
    {
        return [
            'id' => (int) $post->id,
            'slug' => $post->slug,
            'title' => $post->title,
            'subtitle' => $post->subtitle,
            'body' => $post->body,
            'published_at' => $post->published_at->toDateString(),
        ];
    }

    public function includeAuthor(Post $post)
    {
        return $this->item($post->author, new UserTransformer(), 'users');
    }

    public function includeTags(Post $post)
    {
        return $this->collection($post->tags, new TagTransformer(), 'tags');
    }

    public function includeComments(Post $post)
    {
        return $this->collection($post->comments, new CommentTransformer(), 'comments');
    }
}