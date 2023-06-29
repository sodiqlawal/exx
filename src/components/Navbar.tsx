'use client'
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenuFold, AiOutlineClose } from 'react-icons/ai';
import Sidebar from "./Sidebar";

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="w-full relative">

            <div className="w-full flex items-center justify-between h-[60px] border-b px-3 sm:px-10 border-gray-200">
                <div>
                    {isSidebarOpen ? <AiOutlineClose size={26} className="cursor-pointer sm:hidden" onClick={() => setSidebarOpen(false)} /> : <AiOutlineMenuFold size={26} className="cursor-pointer sm:hidden" onClick={() => setSidebarOpen(true)} />}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm border rounded-md border-gray-300 flex w-fit py-2 space-x-2 px-4 cursor-pointer">
                        <Image src="/assets/zap.svg" alt="setting" width={20} height={20} />
                        <p>Upgrade now</p>
                    </div>
                    <Image src="/assets/settings.svg" alt="setting" width={20} height={20} />
                    <Image src="/assets/notification.svg" alt="notification" width={20} height={20} />
                    <Image src="/assets/profile.png" alt="profile" className="object-cover" width={40} height={40} />
                </div>
            </div>

            <div className={classNames("absolute z-50 transition-all duration-1000", {
                '-left-[100%]': !isSidebarOpen,
                'left-0': isSidebarOpen
            })}>
                <Sidebar />
            </div>
        </div>
    )
}

export default Navbar;