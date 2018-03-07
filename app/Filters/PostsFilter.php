<?php

namespace App\Filters;

use Sarala\FilterAbstract;

class PostsFilter extends FilterAbstract
{
    protected $lookup = [
        'my' => 'composedByMe'
    ];

    public function composedByMe()
    {
        return $this->builder->composedBy(auth()->user());
    }
}