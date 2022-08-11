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

    const avatars = shuffle(AVATARS).slice(0, NUM_PROFILES);

    return (
        <div className="absolute w-full h-full bg-slate-900 select-none">
            <Header />
            {showMap ? (
                <div
                    className="p-32 grid grid-cols-1 gap-1"
                    style={{ height: "calc(100% - 100px)" }}
                >
                    <Mapper />
                </div>
            ) : (
                <div className="container mt-6 flex flex-col flex-wrap justify-between mx-auto">
                    {avatars.map((avatar, index) => (
                        <Profile
                            key={index}
                            avatar={avatar}
                            onClick={() => setShowMap(true)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
