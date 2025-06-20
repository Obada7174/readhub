import { FiHelpCircle, FiUsers } from "react-icons/fi";
import { TbBooks } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { GiShoppingCart, GiTrophy } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { LuBell, LuBook, LuBookOpen, LuFileQuestion, LuFileText, LuMessageSquare, LuSettings, LuStar, LuTag, LuTrophy, LuUser } from "react-icons/lu";
import { GiPodiumWinner } from "react-icons/gi";
import { MdOutlineAssignmentTurnedIn, MdOutlineQuiz } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";

export const links = [
      {
        name: "users",
        icon: <FiUsers />,
        url: "/dashboard/users",
        roleShow: ["admin"],
      },
      {
        name: "books",
        icon: <TbBooks />,
        url: "/dashboard/books",
        roleShow: ["admin"],
      },
      {
        name: "categories",
        icon: <MdOutlineCategory />,
        url: "/dashboard/categories",
        roleShow: ["admin"],
      },
      {
        name: "competitions",
        icon: <GiTrophy />,
        url: "/dashboard/competitions",
        children: [
          { name: "quizzes", url: "/dashboard/competitions/quizzes", icon: <LuFileQuestion />},
          { name: "winners", url: "/dashboard/competitions/quizzes-winners", icon: <GiPodiumWinner />},
          { name: "questions", url: "/dashboard/competitions/book-questions", icon: <MdOutlineQuiz />},
          { name: "results", url: "/dashboard/competitions/quizzes-results", icon: <MdOutlineAssignmentTurnedIn /> },
          { name: "answers", url: "/dashboard/competitions/quizzes-answers", icon: <IoDocumentTextOutline /> }
        ],
        roleShow: ["admin"],
      },
      {
        name: "Copons",
        icon:<LuTag />,
        url: "/dashboard/copons",
        roleShow: ["admin"],
      },
      {
        name: "Carts",
        icon: <GiShoppingCart />,
        url: "/dashboard/carts",
        roleShow: ["admin"],
      },
      {
        name: "Faqs",
        icon:  <FiHelpCircle />,
        url: "/dashboard/faqs",
        roleShow: ["admin"],
      },
      {
        name: "StaticPages",
        icon: <CgWebsite />,
        url: "/dashboard/static-pages",
        roleShow: ["admin"],
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