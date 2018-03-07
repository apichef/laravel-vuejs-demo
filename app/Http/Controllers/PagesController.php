<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function wall()
    {
        return view('post.list');
    }

    public function myPosts()
    {
        return view('post.manage');
    }

    public function write()
    {
        return view('post.form');
    }

    public function edit($slug, Post $post)
    {
        return view('post.form')->with('post', $post);
    }

    public function post($slug, Post $post)
    {
        return view('post.show')->with('post', $post);
    }
}
