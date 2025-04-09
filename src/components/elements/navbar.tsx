import { Avatar } from "./Avatar";

interface NavbarProps {
  activeIcon: string; 
}

export const Navbar = ({ activeIcon }: NavbarProps) => {
  const centerIcons = [
    { name: "news", src: "news.svg" },
    { name: "friend", src: "friend.svg" },
    { name: "upload", src: "upload.svg" },
    { name: "noti", src: "noti.svg" },
  ];

  const rightIcons = [
    { src: "mess.svg" },
    { src: "more.svg" },
  ];

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white shadow-sm relative">
      {/* Left */}
      <div className="absolute left-6">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <img
            src="src/assets/img/search.svg"
            alt="Search"
            className="w-4 h-4 mr-2 opacity-60"
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-base text-gray-600 placeholder-gray-400 w-45 h-7"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center space-x-20 mx-auto">
        {centerIcons.map((icon, index) => {
          const isActive = icon.name === activeIcon;
          const iconSrc = `src/assets/img/${isActive ? `${icon.name}-active.svg` : icon.src}`;
          return (
            <img
              key={index}
              src={iconSrc}
              alt={icon.name}
              className="w-8 h-8 cursor-pointer transition hover:opacity-90"
            />
          );
        })}
        <Avatar user_id={1} />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-6 absolute right-8">
        {rightIcons.map((icon, index) => (
          <img
            key={index}
            src={`src/assets/img/${icon.src}`}
            alt=""
            className="w-8 h-8 cursor-pointer hover:opacity-80"
          />
        ))}
      </div>
    </div>
  );
};
