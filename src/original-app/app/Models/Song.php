<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'length_seconds',
        'user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function image() {
        return $this->hasOneThrough(
            Image::class,
            ImageSong::class,
            'song_id',
            'id',
            'id',
            'image_id'
        );
    }

    public function audio() {
        return $this->hasOneThrough(
            Audio::class,
            AudioSong::class,
            'song_id',
            'id',
            'id',
            'audio_id'
        );
    }

    public function createSong($form, $user_id){
        $data = Song::create([
                    'user_id' => $user_id,
                    'title' => $form['title'],
                    'length_seconds' => $form['lengthSeconds'],
                    'description' => $form['description'],
                ]);
        return $data->id;
    }
}
