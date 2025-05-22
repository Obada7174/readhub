import { FiUsers } from "react-icons/fi";
import { TbBooks } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { BsFillJournalBookmarkFill, BsBuilding } from "react-icons/bs";
import { GiTrophy } from "react-icons/gi";

export const links = [
  {
    title: "dashboard",
    links: [
      {
        name: "mainDashboard",
        icon: <FaRegListAlt />,
        roleShow: ["admin", "editor"],
        url: "/",
      },
    ],
  },
  {
    title: "libraryManagement",
    links: [
      {
        name: "users",
        icon: <FiUsers />,
        url: "users",
        roleShow: ["admin", "editor"],
      },
      {
        name: "books",
        icon: <TbBooks />,
        url: "books",
        roleShow: ["admin", "editor"],
      },
      {
        name: "categories",
        icon: <MdOutlineCategory />,
        url: "categories",
        roleShow: ["admin", "editor"],
      },
      {
        name: "authors",
        icon: <BsFillJournalBookmarkFill />,
        url: "authors",
        roleShow: ["admin", "editor"],
      },
      {
        name: "publishers",
        icon: <BsBuilding />,
        url: "publishers",
        roleShow: ["admin", "editor"],
      },
      {
        name: "competitions",
        icon: <GiTrophy />,
        url: "competitions",
        roleShow: ["admin", "editor"],
      },
    ],
  },
];