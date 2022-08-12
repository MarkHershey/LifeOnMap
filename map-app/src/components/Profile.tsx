import { NAMES } from "../assets/names";
import { AVATARS } from "../assets/avatars";

interface Props {
    name?: string;
    year?: number;
    month?: number;
    avatar?: string;
    onClick?: (name: string) => void;
}

const Profile = (props: Props) => {
    // random name
    const name = props.name || NAMES[Math.floor(Math.random() * NAMES.length)];
    // random year
    const year = props.year || Math.floor(Math.random() * (2022 - 1990)) + 1990;
    // random month
    const month = props.month || Math.floor(Math.random() * 12) + 1;
    // convert month to long string
    const monthString = new Date(0, month, 1).toLocaleString("en-us", {
        month: "short",
    });
    // random avatar
    const avatar =
        props.avatar || AVATARS[Math.floor(Math.random() * AVATARS.length)];

    return (
        <div>
            <div className="m-6 flex items-center space-x-4">
                <img
                    className="p-1 w-20 h-20 rounded-full ring-2 ring-gray-500 hover:ring-blue-500 hover:animate-pulse hover:scale-105"
                    src={avatar}
                    alt="bordered avatar"
                ></img>
                <div className="font-medium dark:text-white">
                    <div>{name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Joined in {monthString} {year}
                    </div>
                </div>
                {props.onClick !== undefined ? (
                    <button
                        type="button"
                        className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                        onClick={() => props.onClick && props.onClick(name)}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
