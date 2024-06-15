import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";

const Header = ({ user }) => {
    const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(false);

    useEffect(() => {
        function checkPath() {
            setIsBackButtonDisabled(window.location.pathname === "/");
        }

        window.addEventListener("popstate", checkPath);
        checkPath();

        return () => {
            window.removeEventListener("popstate", checkPath);
        };
    }, []);

    return (
        <header className="header">
            <div>
                <button
                    id="backButton"
                    disabled={isBackButtonDisabled}
                    onClick={() => window.history.back()}
                >
                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                </button>
                <button onClick={() => window.history.forward()}>
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                </button>
            </div>
            {user ? (
                <Dropdown
                    trigger={
                        <button type="button" className="">
                            {user.name}
                        </button>
                    }
                >
                    <Dropdown.Link href={route("profile.edit")}>
                        プロフィール
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        ログアウト
                    </Dropdown.Link>
                </Dropdown>
            ) : (
                <Dropdown
                    trigger={
                        <button type="button" className="">
                            <FontAwesomeIcon icon={faCircleUser} />
                        </button>
                    }
                >
                    <Dropdown.Link href={route("register")} as="button">
                        新規作成
                    </Dropdown.Link>
                    <Dropdown.Link href={route("login")} as="button">
                        ログイン
                    </Dropdown.Link>
                </Dropdown>
            )}
        </header>
    );
};

export default Header;
