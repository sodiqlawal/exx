'use client'
import { MENU_LIST } from "@/constant";
import Image from "next/image";
import Search from "./Search";
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import classNames from "classnames";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [selectedList, setSelectedList] = useState('Dashboard');
    const [filteredList, setFilteredList] = useState<typeof MENU_LIST>([]);

    const toggleSelectedList = (txt:string) => {
        if(txt === selectedList) {
            setSelectedList('')
        } else {
            setSelectedList(txt)
        }
    }

    const search = (val:string) => {
        const lists = [...MENU_LIST].filter((l) => l.text.toLowerCase().includes(val.toLowerCase()));
        setFilteredList(lists)
    }

    useEffect(() => {
        setFilteredList(MENU_LIST)
    },[])

    return (
        <div className="min-w-[250px] bg-white max-w-[20%] h-full py-8 px-5 shadow">
            <div>
                <Image src="/assets/logo.png" alt="logo" width={40} height={40} className="mb-6" />
                <div className="mb-6">
                    <Search action={search} size="small" />
                </div>
            </div>

            <div className="flex flex-col justify-between h-[88%]">
                <div>
                    {
                        filteredList.map((list, i) => (
                            <div key={i}>
                                <div className="mb-3">
                                    <div className={classNames("flex justify-between items-center mb-3 px-3 py-2 cursor-pointer", { "text-primary-600 bg-primary-50 rounded-md": list.text === 'Dashboard' })} onClick={() => toggleSelectedList(list.text)}>
                                        <div className="flex items-center space-x-2">
                                            <Image src={`/assets/${list.icon}.svg`} alt="logo" width={24} height={24} />
                                            <p>{list.text}</p>
                                        </div>
                                        {list.isSubList && (list.text === selectedList ? <BsChevronDown className={classNames("mt-1", { "text-primary-600": list.text === 'Dashboard' })} /> : <BsChevronRight className={classNames("mt-1", { "text-primary-600": list.text === 'Dashboard' })} />)}
                                    </div>
                                    {
                                        (list?.isSubList && list.text === selectedList) &&
                                        <div className="mb-4 ml-12"> {list.subLists.map((sublist, i) => (
                                            <p key={i} className={classNames("mb-3 cursor-pointer", { "text-primary-600": sublist === 'Sender' })}>{sublist}</p>
                                        ))}
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div className="mb-6">
                        {
                            ['Support', 'Settings'].map((l, i) => (
                                <div key={i} className="flex items-center space-x-2 mb-3 cursor-pointer px-3 py-1">
                                    <Image src={`/assets/${l.toLowerCase()}.svg`} alt="logo" width={24} height={24} />
                                    <p>{l}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className="border-top border-t-2 border-gray-200">

                        <div className="flex px-3 py-4">
                            <div className="mr-1">
                                <Image src="/assets/profile.png" alt="profile" className="object-cover" width={40} height={40} />
                            </div>
                            <div className="text-sm">
                                <div className="flex items-center justify-between">
                                    <p>Olivia Rhyne</p>
                                    <Image src="/assets/logout.svg" alt="logout" width={16} height={16} className='cursor-pointer' />
                                </div>
                                <p className="text-gray-500">olivia@untitledui.com</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;