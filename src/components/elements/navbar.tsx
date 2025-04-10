import { Avatar } from "./Avatar";
import { Link } from 'react-router-dom';

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
    <div className="sticky top-0 z-30 w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm relative">
      <Link to="/" className="text-2xl font-bold text-pink-500 font-serif">FluffyNet <span className="text-xl">☁️</span></Link>

      
      <div className="flex items-center space-x-24 mx-auto">
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
