<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;

    public function song(){
        return $this->belongsToMany(Song::class, 'playlist_songs', 'playlist_id', 'song_id');
    }

    public function image() {
        return $this->hasOneThrough(
            Image::class,
            ImagePlaylist::class,
            'playlist_id',
            'id',
            'id',
            'image_id'
        );
    }
}
