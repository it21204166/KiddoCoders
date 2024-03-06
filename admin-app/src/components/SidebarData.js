import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { FaHistory } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { RxLapTimer } from "react-icons/rx";


export const SidebarData=[
    {
        title: "Tutorials",
        // path:  "/about-us",
        icon: <IoBookSharp />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav:[
            {
                title: "Beginners",
                path: "/tutorials/beginners",
                icon: <IoBookSharp />
            },
            {
                title: "Intermediate",
                path: "/tutorials/intermediate",
                icon: <IoBookSharp/>
            },
        ],
    },
    // {
    //     title:"Services",
    //     // path: "/services",
    //     icon: <IoIcons.IoIosPaper />,
    //     iconClosed: <RiIcons.RiArrowDownSFill />,
    //     iconOpened: <RiIcons.RiArrowUpSFill />,
        
    //     subNav:[
    //         {
    //             title: "Service 1",
    //             path: "/services/services1",
    //             icon: <IoIcons.IoIosPaper />,
    //             cName: "sub-nav",
    //         },
    //         {
    //             title: "Service 2",
    //             path: "/services/services2",
    //             icon: <IoIcons.IoIosPaper />,
    //             cName: "sub-nav"
    //         },
    //         {
    //             title: "Service 3",
    //             path: "/services/services3",
    //             icon:<IoIcons.IoIosPaper/>,
    //         },
    //     ],
    // },
    // {
    //     title: "Contact",
    //     path: "/contact",
    //     icon: <FaIcons.FaPhone />,
    // },
    {
        title: "Exersice",
        
        icon: <TfiWrite />,
       
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav:[
            {
                title:"Exersice",
                path: "/exersice",
                icon: <TfiWrite />,
            },
            {
                title:"Self Learning",
                path: "/selflearning",
                icon: <TfiWrite />,
            },
        ],
    },
    {
        title: "Challenge",
        path:  "/challenge",
        icon: <RxLapTimer/>,
    },
    // {
    //     title:"Register",
    //     path: "/register",
    //     icon: <IoIcons.IoIosPaper />,
    // },    
    // {
    //     title:"Chart",
    //     path: "/chart",
    //     icon: <IoIcons.IoMdPie />,
    // },
    


];