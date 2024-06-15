import { memo, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Howl } from "howler";
import { useAudio } from "./AudioProvider";

const AudioControl = () => {
    const soundRef = useRef(null); // Howlインスタンスを保持
    const intervalRef = useRef(null); // タイマーIDを保持

    const [playPosition, setPlayPosition] = useState(0); // シーク位置
    const [totalDuration, setTotalDuration] = useState(0); // 音声ファイルの総再生時間

    const { audioPath, isPlaying, setIsPlaying, formatTime } = useAudio(); // Global State;

    useEffect(() => {
        if (!audioPath) return;

        const sound = new Howl({
            src: [audioPath],
            interrupt: true,
            onend: () => {
                setIsPlaying(false);
                setPlayPosition(0);
            },
            onload: () => {
                setTotalDuration(sound.duration() * 1000);
            },
        });

        soundRef.current = sound;

        if (!isPlaying) setIsPlaying(true);

        return () => sound.unload();
    }, [audioPath]);

    useEffect(() => {
        if (!soundRef.current) return;

        if (isPlaying) {
            soundRef.current.play();
            intervalRef.current = setInterval(() => {
                setPlayPosition(soundRef.current.seek() * 1000);
            }, 400);
        } else {
            soundRef.current.pause();
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isPlaying]);

    // 再生／一時停止ボタン
    const togglePlayback = useCallback(() => {
        // if (!soundRef.current) return;
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // シーク位置の更新（ただし再生位置は変更しない）
    const handleSeekChange = useCallback((e) => {
        setPlayPosition(parseInt(e.target.value));
    }, []);

    // マウスダウン時は再生状態の停止とタイマーID(Interval)の削除
    const handleMouseDown = useCallback(() => {
        if (!soundRef.current) return;

        if (isPlaying) soundRef.current.pause();
        clearInterval(intervalRef.current);
    }, [isPlaying]);

    // マウスアップ時にシーク位置を設定し再生を再開
    const handleMouseUp = useCallback(() => {
        if (!soundRef.current) return;

        soundRef.current.seek(playPosition / 1000);
        if (isPlaying) {
            soundRef.current.play();
            intervalRef.current = setInterval(() => {
                setPlayPosition(soundRef.current.seek() * 1000);
            }, 400);
        }
    }, [isPlaying, playPosition]);

    const formattedDuration = useMemo(
        () => formatTime(totalDuration),
        [totalDuration]
    );

    return (
        <footer className="footer">
            {formatTime(playPosition)}
            <input
                type="range"
                min={0}
                max={totalDuration}
                step={100}
                value={playPosition}
                onChange={handleSeekChange}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
            {formattedDuration}
            <div>
                <button onClick={togglePlayback}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>
        </footer>
    );
};

export default memo(AudioControl);
