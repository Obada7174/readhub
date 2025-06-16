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

  export type DateObject ={
    getFullYear: number;
    getMonth: number;
    getDay: number;
  }
  
  export type Meta ={
      total: number,
      page: string,
      limit: string,
      total_pages: number
  }
  
  
  export interface BaseLink {
    name: string;
    icon: JSX.Element; 
    url?: string;
    roleShow?: string[];
    children?: ChildLink[]; 
  }
  
 export interface ChildLink {
    name: string;
    url: string;
    icon?: JSX.Element; 
  }
  
  export type SidebarLink = BaseLink;