<?php
use Illuminate\Support\Facades\Route;

// Serve the OpenAPI YAML and Swagger UI under the API root
Route::get('/api/swagger.yaml', function(){
    return response(file_get_contents(base_path('swagger.yaml')), 200)->header('Content-Type','text/yaml');
});

Route::get('/api/docs', function(){
    return file_get_contents(public_path('swagger.html'));
});
