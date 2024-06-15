import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { debounce } from "throttle-debounce";
import { router } from "@inertiajs/react";
import GenerateColumn from "./GenerateColumn";

const SelectCard = ({ musicData }) => {
    const [displayCount, setDisplayCount] = useState(null);

    useEffect(() => {
        const handleResize = () =>
            setDisplayCount(updateWindowWidth(window.innerWidth));

        const debouncedHandleResize = debounce(200, handleResize);

        if (Object.keys(musicData).length > 1)
            window.addEventListener("resize", debouncedHandleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);

    const updateWindowWidth = (width) => {
        if (width >= 1600) return 7;
        else if (width >= 1400) return 6;
        else if (width >= 1200) return 5;
        else if (width >= 992) return 4;
        else if (width >= 768) return 3;
        else if (width >= 576) return 2;
        else return 1;
    };

    if (!displayCount) return;

    const onViewAll = (value) => router.get(`${value}`);

    return (
        <main className="main">
            <Container>
                {Object.keys(musicData).length > 1 ? (
                    <>
                        {musicData.songs && (
                            <CategoryDisplay
                                contentType={"song"}
                                data={musicData.songs}
                                displayCount={displayCount}
                            >
                                <div className="main-category-header">
                                    <h3>NewSong</h3>
                                    <button onClick={() => onViewAll("song")}>
                                        すべて表示
                                    </button>
                                </div>
                            </CategoryDisplay>
                        )}
                        {musicData.playlists && (
                            <CategoryDisplay
                                contentType={"playlist"}
                                data={musicData.playlists}
                                displayCount={displayCount}
                            >
                                <div className="main-category-header">
                                    <h3>PlayList</h3>
                                    <button
                                        onClick={() => onViewAll("playlist")}
                                    >
                                        すべて表示
                                    </button>
                                </div>
                            </CategoryDisplay>
                        )}
                        {!musicData.songs && !musicData.playlists && (
                            <p>データが不正です。</p>
                        )}
                    </>
                ) : musicData.songs ? (
                    <>
                        <CategoryDisplay
                            contentType={"song"}
                            data={musicData.songs}
                        >
                            <h3>すべての曲</h3>
                        </CategoryDisplay>
                    </>
                ) : musicData.playlists ? (
                    <>
                        <CategoryDisplay
                            contentType={"playlist"}
                            data={musicData.playlists}
                        >
                            <h3>すべてのプレイリスト</h3>
                        </CategoryDisplay>
                    </>
                ) : (
                    <p>データがありません</p>
                )}
            </Container>
        </main>
    );
};

const CategoryDisplay = ({ contentType, data, displayCount, children }) => {
    return (
        <>
            {children}
            <Row>
                <GenerateColumn
                    contentType={contentType}
                    data={data}
                    displayCount={displayCount}
                />
            </Row>
        </>
    );
};

export default SelectCard;

// musicData object
// data array
// song object
