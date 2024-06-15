import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { useAudio } from "./AudioProvider";

const Card = ({ contentType, item }) => {
    const {
        isPlaying,
        setIsPlaying,
        setAudioPath,
        isPlayingCardId,
        setIsPlayingCardId,
    } = useAudio();

    const audioSelect = useCallback(() => {
        setIsPlaying(!isPlaying);
        setAudioPath(item.audioPath);
        setIsPlayingCardId(item.id);
    }, [isPlaying]);

    return (
        <div className="c-card">
            <div className="c-card-iframe">
                <img src={"/" + item.imagePath} alt="[No Image]" />
                {contentType == "song" && (
                    <button className="icon-container" onClick={audioSelect}>
                        {isPlaying && item.id == isPlayingCardId ? (
                            <FontAwesomeIcon icon={faPause} />
                        ) : (
                            <FontAwesomeIcon icon={faPlay} />
                        )}
                    </button>
                )}
                <div>テスト</div>
            </div>
            <div className="c-card-title u-cl-white">{item.title}</div>
            <div className="c-card-text u-cl-gray">{item.description}</div>
        </div>
    );
};

export default Card;
