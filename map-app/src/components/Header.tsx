import React from "react";
import PropTypes from "prop-types";

const Header = () => {
    return (
        <div className="bg-black text-white" style={{ height: "55px" }}>
            <div className="flex justify-center items-center gap-4 h-full">
                <div>Tracking 2050</div>
            </div>
        </div>
    );
};

Header.propTypes = {};

export default Header;
