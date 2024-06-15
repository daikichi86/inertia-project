import { createContext, useContext, useState, useCallback } from "react";

const AudioContext = createContext();

export const useAudio = () => {
    return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
    const [audioPath, setAudioPath] = useState(null); // オーディファイルのパス
    const [isPlaying, setIsPlaying] = useState(false); // 再生状態
    const [isPlayingCardId, setIsPlayingCardId] = useState(0); //再生中のカードID

    // シーク位置・総時間変換
    const formatTime = useCallback((unconvertedSeconds) => {
        const seconds = Math.floor(unconvertedSeconds / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }, []);

    return (
        <AudioContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                audioPath,
                setAudioPath,
                isPlayingCardId,
                setIsPlayingCardId,
                formatTime,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;
