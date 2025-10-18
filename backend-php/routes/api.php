<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IdeaController;

Route::get('/ideas', [IdeaController::class, 'index']);
Route::post('/ideas', [IdeaController::class, 'store']);
Route::get('/ideas/{id}', [IdeaController::class, 'show']);
Route::post('/ideas/{id}/vote', [IdeaController::class, 'vote']);
Route::post('/ideas/{id}/comments', [IdeaController::class, 'comment']);
Route::get('/users', function(){ return response()->json(\App\Models\User::all()); });
