'use client';
import { Link } from "@/i18n/navigation";
import NavLink from "@/components/NavLink";
import { SiShopware } from "react-icons/si";
import { links } from "@/assets/files/json";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [activeMenu, setActiveMenu] = useState(true); 
    const currentColor = "#3B82F6";

    useEffect(() => {
        setScreenWidth(window.innerWidth);

        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCloseSidebar = () => {
        if (activeMenu && screenWidth <= 900) {
            setActiveMenu(false); 
        }
    };

    const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-blue-600 `;
    const normalLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 max-w-[240px] ">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link
                            href="/"
                            onClick={handleCloseSidebar}
                            className="items-center mt-4 flex text-xl tracking-tight font-extrabold dark:text-white text-slate-900 ml-3 gap-3"
                        >
                            <SiShopware /> <span>Shoppy</span>
                        </Link>
                        <Tooltip title="Menu" placement="bottom" arrow>
                            <button
                                type="button"
                                onClick={() => {
                                    setActiveMenu(false); 
                                }}
                                className="text-xl rounded-full p-3 hover:bg-light-gray block md:hidden mt-4"
                            >{}
                                <MdOutlineCancel style={{ color: currentColor }} />
                            </button>
                        </Tooltip>
                    </div>

                    <div className="mt-10">
                        <div>
                            {links.map((item) => (
                                <div key={item.title}>
                                    <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                                    {item.links.map((link) => (
                                        <NavLink
                                            key={link.name}
                                            href={`/dashboard/${link.url || link.name.toLowerCase()}`}
                                            // onClick={handleCloseSidebar}
                                            className={(isActive) =>
                                                isActive ? activeLink : normalLink
                                            }
                                            style={(isActive) => ({
                                                backgroundColor: isActive ? currentColor : "",
                                            })}
                                        >
                                            {link.icon}
                                            <span className="capitalize">{link.name}</span>
                                    </NavLink>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <NavLink
                            href="/"
                            className={(isActive ) =>
                                isActive ? `${activeLink} text-center m-3 mt-10` : `${normalLink} text-center m-3 mt-10`
                            }
                            style={( isActive ) => ({
                                backgroundColor: isActive ? currentColor : "",
                            })}
                        >
                            GO to Website
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
}