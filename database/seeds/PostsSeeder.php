<?php

use App\Comment;
use App\Post;
use App\Tag;
use App\User;
use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Tag::class, 20)->create();

        factory(User::class, 10)->create()->each(function (User $user) {
            $post = factory(Post::class)->create(['author_id' => $user->id]);
            factory(Comment::class, rand(1, 5))->create(['post_id' => $post->id]);
            $post->tags()->attach(Tag::all()->random(rand(1, 5))->pluck('id')->all());
        });
    }
}
