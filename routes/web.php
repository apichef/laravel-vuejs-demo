<?php

Auth::routes();

Route::get('/', 'PagesController@wall')->name('wall');

Route::get('/my-posts', 'PagesController@myPosts')->name('my-posts');

Route::get('/write', 'PagesController@write')->name('write');

Route::get('/edit/{slug}/{post}', 'PagesController@edit')->name('edit');

Route::get('/{slug}/{post}', 'PagesController@post')->name('post');
