<?php

use App\User;
use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    return [
        'title' => $faker->sentences(1, true),
        'subtitle' => $faker->sentences(2, true),
        'body' => $faker->paragraphs(3, true),
        'published_at' => $faker->dateTimeBetween('-1 months', '+1 months'),
        'author_id' => function() {
            return factory(User::class)->create()->id;
        }
    ];
});
