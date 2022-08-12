import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <nav className="mt-5 px-2 bg-gray-900 border-gray-700">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/LifeOnMap" className="flex items-center">
                    <img
                        src={logo}
                        className="mr-3 h-6 sm:h-10"
                        alt="Logo"
                    ></img>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Life On Map Museum
                    </span>
                </a>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-multi-level"
                >
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="/LifeOnMap"
                                className="block py-2 pr-4 pl-3 text-white rounded md:p-0 md:text-white bg-blue-600 md:bg-transparent"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/MarkHershey/LifeOnMap"
                                className="block py-2 pr-4 pl-3 rounded md:border-0  md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {};

export default Header;
