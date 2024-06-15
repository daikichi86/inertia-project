<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaylistSongsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $playlist_id = 1;
        for ($i = 0; $i < 7; $i++) {
            DB::table('playlist_songs')->insert([
                'playlist_id' => $playlist_id,
                'song_id' => $i + 1
            ]);
        }
    }
}