import { Head } from "@inertiajs/react";
import { memo } from "react";
import Header from "../Components/original/Header";
import SideMenu from "../Components/original/SideMenu";
import SelectCard from "../Components/original/SelectCard";
import UploadMusic from "@/Components/original/UploadMusic";
import AudioProvider from "../Components/original/AudioProvider";
import AudioControl from "../Components/original/AudioControl";

const Phonograph = ({ auth, layoutStyle, musicData }) => {
    return (
        <>
            <Head title="Welcome to Phonograph" />
            <Header user={auth.user} />
            <SideMenu />
            <AudioProvider>
                {layoutStyle === "selectcard" ? (
                    <SelectCard musicData={musicData} />
                ) : layoutStyle === "uploadmusic" ? (
                    <UploadMusic user={auth.user} />
                ) : layoutStyle === "selectgenre" ? (
                    <p>selectgenre</p>
                ) : (
                    <p>There are no components available</p>
                )}
                <AudioControl />
            </AudioProvider>
        </>
    );
};

export default memo(Phonograph);
