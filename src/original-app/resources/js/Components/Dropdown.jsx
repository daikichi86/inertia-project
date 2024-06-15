import { useState } from "react";
import { Link } from "@inertiajs/react";

const Dropdown = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <>
                    <div className="" onClick={() => setIsOpen(false)}></div>
                    <div className="">
                        <div className="">{children}</div>
                    </div>
                </>
            )}
        </>
    );
};

const DropdownLink = ({ children, ...props }) => {
    return <Link {...props}>{children}</Link>;
};

Dropdown.Link = DropdownLink;

export default Dropdown;
