<?php

use Illuminate\Support\Facades\Route;

// Route d'accueil
Route::get('/', function () {
    return inertia('Public/Home');
})->name('home');

// Route sports (pour que le lien "Sports" fonctionne)
Route::get('/sports', function () {
    return "<h1>Page Sports</h1>";
});

// Route tarifs
Route::get('/tarifs', function () {
    return "<h1>Page Tarifs</h1>";
});

// Route inscription
Route::get('/inscription', function () {
    return "<h1>Page Inscription</h1>";
});

// Routes d'authentification (Breeze)
require __DIR__.'/auth.php';