<?php
use Illuminate\Support\Facades\Route;

Route::get('/swagger.yaml', function(){
    return response(file_get_contents(base_path('swagger.yaml')), 200)->header('Content-Type','text/yaml');
});

Route::get('/docs', function(){
    return file_get_contents(public_path('swagger.html'));
});
