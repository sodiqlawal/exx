import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi'

const Search: FC<{ className?: string; action: (search: string) => void, size?: "small" | "default" }> = ({ className, action, size="default" }) => {
    const [search, setSearch] = useState('');


    useEffect(() => {
        action(search)
    }, [search])

    return (
        <div className={classNames("relative", className)}>
            <BiSearch size={22} className="absolute top-1/2 bottom-1/2 translate-y-[-50%] left-2 text-gray-600" />
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={classNames("w-full border border-gray-300 py-[10px] px-[35px] rounded-[8px] border-gray-400 focus:outline-none focus:ring-0", { "h-[38px]": size === "small", "h-[44px]": size === "default" })}
            />
        </div>
    )
}

export default Search;