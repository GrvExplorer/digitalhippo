import { MdOutlineSecurity } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

export const ManageAccountKeys = [
  {
    isActive: true,
    icon: <RxAvatar className="h-6 w-6" />,
    label: "profile",
    className: "py-2 font-medium px-4",
  },
  {
    isActive: false,
    icon: <MdOutlineSecurity className="h-6 w-6" />,
    label: "security",
    className: "py-2 font-medium px-4",
  },
];

export const ManageAccountValues = [
  {
    label: 'profile',
    component: () => <div>Profile</div>,
  }
]

