import Header from "./components/Header";
import Mapper from "./components/Mapper";

function App() {
    return (
        <div className="absolute w-full h-full bg-slate-900 select-none">
            <Header />
            <div
                className="grid grid-cols-2 gap-4"
                style={{ height: "calc(100% - 55px)" }}
            >
                <Mapper />
                <Mapper />
                <Mapper />
                <Mapper />
            </div>
        </div>
    );
}

export default App;
