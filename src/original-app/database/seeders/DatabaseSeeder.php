<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Audio;
use App\Models\Image;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(1)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Audio::factory()->count(10)->create();
        Image::factory()->count(10)->create();
        Playlist::factory()->count(1)->create();
        Song::factory()->count(10)->create();

        $playlist_id = 1;

        for ($i = 0; $i < 10; $i++) {
            DB::table('audio_songs')->insert([
                'song_id' => $i + 1,
                'audio_id' => $i + 1,
            ]);
            DB::table('image_songs')->insert([
                'song_id' => $i + 1,
                'image_id' => $i + 1,
            ]);
            DB::table('playlist_songs')->insert([
                'playlist_id' => $playlist_id,
                'song_id' => $i + 1
            ]);
            // DB::table('image_playlists')->insert([
            //     'playlist_id' => $i + 1,
            //     'image_id' => $i + 1,
            // ]);
        }
    }
}
