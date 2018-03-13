<?php

Auth::routes();

Route::get('/', 'PagesController@wall')->name('wall');

Route::get('/my-posts', 'PagesController@myPosts')->name('my-posts');

Route::get('/write', 'PagesController@write')->name('write');

Route::get('/read/{slug}/{post}', 'PagesController@post')->name('post');
