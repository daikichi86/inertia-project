<?php

use App\Http\Controllers\SongController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'home');
Route::get('home', function (SongController $songController, PlaylistController $playlistsController) {
    return Inertia::render('Phonograph', [
        'layoutStyle' => 'selectcard',
        'musicData' => [
            'songs' => $songController->get(),
            'playlists' => $playlistsController->get()
        ]
    ]);
})->name('home');

Route::get('song', function (SongController $songController) {
    return Inertia::render('Phonograph', [
        'layoutStyle' => 'selectcard',
        'musicData' => [
            'songs' => $songController->get(),
        ]
    ]);
});

Route::get('playlist', function (PlaylistController $playlistsController) {
    return Inertia::render('Phonograph', [
        'layoutStyle' => 'selectcard',
        'musicData' => [
            'playlists' => $playlistsController->get()
        ]
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('song/create', function () {
        return Inertia::render('Phonograph', [
            'layoutStyle' => 'uploadmusic',
        ]);
    });

    Route::post('song/store', [SongController::class, 'post']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
