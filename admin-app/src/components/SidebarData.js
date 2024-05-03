import React from "react";
import * as IoIcons from "react-icons/io5";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { RxLapTimer } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoReaderOutline } from "react-icons/io5";

export const SidebarData = [
    {
        title: "Tutorials",
        icon: <IoIcons.IoBookSharp />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        subNav: [
            {
                title: "Beginners",
                path: "/tutorials/beginners",
                parent: "Tutorials", // Add parent information
                icon: <IoIcons.IoBookSharp />,
            },
            {
                title: "Intermediate",
                path: "/tutorials/intermediate",
                parent: "Tutorials", // Add parent information
                icon: <IoIcons.IoBookSharp />,
            },
        ],
    },
    {
        title: "Exercise",
        path: "/exercise",
        icon: <TfiWrite />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        subNav: [
            {
                title: "Exercise Page",
                path: "/exercisemanagement/exercise",
                parent: "Exercise", // Add parent information
                icon: <TfiWrite />,
            },
            {
                title: "Self Learning",
                path: "/exercisemanagement/selflearning",
                parent: "Exercise", // Add parent information
                icon: <TfiWrite />,
            },
        ],
    },
    {
      title: "Challenge",
      path: "/challenge",
      icon: <RxLapTimer />
    },

    {
      title: "Kiddos",
      path: "/AllKiddos",
      icon: <IoIcons.IoSearchOutline  />
    }

];
