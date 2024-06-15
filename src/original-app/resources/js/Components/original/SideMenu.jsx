import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faMagnifyingGlass,
    faBook,
    faMusic,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { Link } from "@inertiajs/react";

const SideMenu = () => {
    return (
        <aside className="sidemenu">
            <ul className="select-menu1">
                <li>
                    <FontAwesomeIcon icon={faHouse} />
                    <Link href="/home">Home</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    検索
                </li>
                <li>
                    <FontAwesomeIcon icon={faBook} />
                    My Library
                </li>
            </ul>
            <ul className="select-menu2">
                <li>
                    <FontAwesomeIcon icon={faMusic} />
                    <Link href="song/create">曲をアップロード</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faList} />
                    プレイリストを作成
                </li>
            </ul>
            <ul className="playlist">
                <li>プレイリスト①</li>
                <li>プレイリスト②</li>
                <li>プレイリスト③</li>
            </ul>
        </aside>
    );
};

export default memo(SideMenu);
