import { FiUsers } from "react-icons/fi";
import { TbBooks } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
// import { FaRegListAlt } from "react-icons/fa";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { GiTrophy } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { LuBell, LuBook, LuBookOpen, LuFileText, LuMessageSquare, LuSettings, LuStar, LuTrophy, LuUser } from "react-icons/lu";

export const links = [
      {
        name: "users",
        icon: <FiUsers />,
        url: "/dashboard/users",
        roleShow: ["admin", "editor"],
      },
      {
        name: "books",
        icon: <TbBooks />,
        url: "/dashboard/books",
        roleShow: ["admin", "editor"],
      },
      {
        name: "categories",
        icon: <MdOutlineCategory />,
        url: "/dashboard/categories",
        roleShow: ["admin", "editor"],
      },
      {
        name: "authors",
        icon: <BsFillJournalBookmarkFill />,
        url: "/dashboard/authors",
        roleShow: ["admin", "editor"],
      },
      
      {
        name: "competitions",
        icon: <GiTrophy />,
        url: "/dashboard/competitions",
        roleShow: ["admin", "editor"],
      },
    ]
  ;
export const sidebarLinks = [
  { href: `/panel`, label: 'Home', icon: <IoHome size={20} /> },
  { href: `/panel/profile`, label: 'Profile', icon: <LuUser size={20} /> },
  { href: `/panel/library`, label: 'Library', icon: <LuBookOpen size={20} /> },
  { href: `/panel/favorites`, label: 'Favorites', icon: <LuStar size={20} /> },
  { href: `/panel/my-book`, label: 'My Books', icon: <LuBook size={20} /> },
  { href: `/panel/pdf-reader`, label: 'Pdf Reader', icon: <LuFileText size={20} /> },
  { href: `/panel/comments`, label: 'Comments', icon: <LuMessageSquare size={20} /> },
  { href: `/panel/competitions`, label: 'Competitions', icon: <LuTrophy size={20} /> },
  { href: `/panel/settings`, label: 'Settings', icon: <LuSettings size={20} /> },
  { href: `/panel/notifications`, label: 'Notifications', icon: <LuBell size={20} /> },
];