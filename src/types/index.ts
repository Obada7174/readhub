import { JSX } from "react";

export type SidebarLinkType = {
    title?: string;
    links: {
      name: string;
      icon: JSX.Element;
      url?: string;
      roleShow: string[];
    }[];
  };