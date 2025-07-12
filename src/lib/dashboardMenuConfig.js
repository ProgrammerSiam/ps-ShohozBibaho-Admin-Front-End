import {
  BsBagHeart,
  BsCardList,
  BsClipboardCheck,
  BsCreditCard2Front,
  BsGear,
  BsGrid,
  BsHeart,
  BsPencilSquare,
  BsPeople,
  BsPerson,
  BsPersonVcard,
  BsTable,
  BsTags,
} from "react-icons/bs";

export const dashboardMenuConfig = [
  {
    icon: <BsGrid className="text-lg" />,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: <BsPeople className="text-lg" />,
    label: "Manage Users",
    path: "#",
    children: [
      {
        label: "Users",
        path: "/manage-users/users",
      },
      {
        label: "Admins",
        path: "/manage-users/admins",
      },
    ],
  },
  // {
  //   icon: <BsHeart />,
  //   label: "Manage Books",
  //   path: "#",
  //   children: [
  //     {
  //       label: "Add Books",
  //       path: "/manage-books/add",
  //     },
  //     {
  //       label: "View Books",
  //       path: "/manage-books/view",
  //     },
  //   ],
  // },
  {
    icon: <BsPersonVcard className="text-lg" />,
    label: "Manage Biodata",
    path: "/manage-biodata",
  },
  // {
  //   icon: <BsCreditCard2Front className="text-lg" />,
  //   label: "Publishers",
  //   path: "/manage-publishers",
  // },
  // {
  //   icon: <BsCreditCard2Front className="text-lg" />,
  //   label: "Manage Orders",
  //   path: "/manage-order",
  // },
  // {
  //   icon: <BsCreditCard2Front className="text-lg" />,
  //   label: "Transactions",
  //   path: "/transactions",
  // },
  // {
  //   icon: <BsHeart />,
  //   label: "Manage Frontend",
  //   path: "#",
  //   children: [
  //     {
  //       label: "Pages",
  //       path: "/frontend-manage/pages",
  //     },
  //   ],
  // },
];
