<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Playlist;

class PlaylistController extends Controller
{
    public function __construct(){
        $this->playlistModel = new Playlist;
    }

    public function get() {
        $playlists = $this->playlistModel->get();

        foreach ($playlists as $key => $value) {
            $image = $value->image()->first();
            $image_path = $image === null ? '' : $image->path;

            $playlists_array[$key] = [
                'id' => $value->id,
                'title' => $value->title,
                'description' => $value->description,
                'imagePath' => $image_path
            ];
        }

        return $playlists_array;
    }
}
