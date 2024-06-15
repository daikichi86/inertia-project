<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\AudioFile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class SongController extends CoreController
{
    public function __construct(){
        $this->songModel = new Song;
    }

    public function get() {
        $songs = $this->songModel->get();

        foreach ($songs as $key => $value) {
            $image = $value->image()->first();
            $image_path = $image === null ? '' : $image->path;

            $audio = $value->audio()->first();
            $audio_path = $audio === null ? '' : $audio->path;

            $songs_array[$key] = [
                'id' => $value->id,
                'title' => $value->title,
                'description' => $value->description,
                'lengthSeconds' => $value->length_seconds,
                'imagePath' => $image_path,
                'audioPath' => $audio_path
            ];
        }
        return $songs_array;
    }

    public function post(Request $request){
        $form = $request->all();
        $user_id = $this->getUserId();
        dd($form, $user_id);

        try {
            DB::beginTransaction();
            $song_id = $this->songModel->createsong($form, $user_id);
            if(!$song_id) throw new Exception('songsテーブルへの保存に失敗');
            // if($request->hasFile('image')){
            //     $image_hash = $request->file('image')->store('public/song_image');
            //     if(!$image_hash) throw new Exception('Storageへの保存に失敗');

            //     $image_id = $this->image->createImage("song", basename($image_hash));
            //     if(!$image_id) throw new Exception('imagesテーブルへの保存に失敗');

            //     $song = song::find($song_id);
            //     $song->songImage()->sync($image_id);
            //     if(!$song) throw new Exception('intermsテーブル（中間）への保存に失敗');
            // }
            DB::commit();
            return redirect()->route('home');
        } catch(Exception $e) {
            DB::rollback();
            // Log::debug($e->getMessage());
            // return redirect()->route('song.get')->withErrors('スレッドの投稿に失敗しました。');
        }
    }
}
