import React from "react";
import Header from "./components/Header";
import Mapper from "./components/Mapper";
import Profile from "./components/Profile";
import { AVATARS } from "./assets/avatars";

const NUM_PROFILES = 6;

function shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function App() {
    const [showMap, setShowMap] = React.useState(false);
    const [currentAvatar, setCurrentAvatar] = React.useState("");
    const [currentName, setCurrentName] = React.useState("");

    const avatars = shuffle(AVATARS).slice(0, NUM_PROFILES);

    return (
        <div className="absolute w-full h-full bg-slate-900 select-none">
            <Header />
            {showMap ? (
                <>
                    <div className="container mt-10 flex justify-between mx-auto items-center">
                        <button
                            type="button"
                            onClick={() => setShowMap(false)}
                            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Go Back
                        </button>
                        <Profile avatar={currentAvatar} name={currentName} />
                    </div>

                    <div
                        className="px-32 grid grid-cols-1 gap-1"
                        style={{ height: "calc(100% - 250px)" }}
                    >
                        <Mapper />
                    </div>
                </>
            ) : (
                <div className="container mt-6 flex flex-col flex-wrap justify-between mx-auto">
                    {avatars.map((avatar, index) => (
                        <Profile
                            key={index}
                            avatar={avatar}
                            onClick={(name: string) => {
                                setShowMap(true);
                                setCurrentAvatar(avatar);
                                setCurrentName(name);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
