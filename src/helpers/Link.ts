import { SidebarLink,ChildLink } from "@/types";

export const isActive = (link: SidebarLink ,pathname:string ) => {
    if (link.url && pathname === link.url) return true;
    if (link.children) {
        return link.children.some((child: ChildLink) => pathname === child.url);
    }
    return false;
};