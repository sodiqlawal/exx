import { SAMPLE_DATA } from "@/constant";
import useModal from "@/hooks/useModal";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { MyField } from "../forms";
import Modal from "../Modal";

const Prepare: FC<{ onChange: (files: FileList) => void, setAddresses: (a: string[]) => void, setData: (a: string[]) => void, addresses: string[], errors: string[], setErrors:(a:string[]) => void }> = ({ onChange, addresses, setAddresses, setData, errors, setErrors }) => {
    const [value, setValue] = useState('');

    const [checked, setChecked] = useState(false);

    const modalController = useModal();

    const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setValue(val)
        setAddresses(val.split('\n'));
        setData(val.split('\n'));
        setErrors([])
    }

    return (
        <div>

            <div className="mb-4">
                <MyField type="text" placeholder="Type address" name="address" label="Enter Address" id="address" />
                <div className="flex justify-end">
                    <p className="text-sm mt-1 text-gray-500">Token Balance <span className="text-primary-600">0 BNB</span></p>
                </div>
            </div>

            <div className="mb-6">
                <p className="mb-1 text-sm">List Addresses in CSV</p>
                <div className="border border-primary-600 relative rounded-xl overflow-x-auto min-h-[200px] max-h-[400px] flex h-full overflow-y-auto">
                    <div className="w-[40px] text-primary-600 bg-primary-50 border-r border-r-1 border-primary-600 min-h-[200px] h-full py-3 px-2">
                        {
                            addresses.map((c, i) => (
                                <p key={i}>{i + 1}</p>
                            ))
                        }
                    </div>
                    <textarea name="data" id="" value={addresses.join("\n")} className="w-full whitespace-nowrap text-gray-500 outline-none border-none py-3 px-2" onChange={handleValueChange}>
                    </textarea>
                    <div className="absolute right-3 top-3 z-[100] cursor-pointer">
                        <Image src="/assets/expand.svg" alt="expand" width={16} height={16} />
                    </div>
                </div>
                <div className="text-primary-600 flex items-center justify-between mt-2">
                    <p className="text-sm cursor-pointer" onClick={modalController.open}>Show sample CSV</p>
                    <label htmlFor="upload">
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <Image src="/assets/add.svg" alt="add" width={24} height={24} />
                            <p>Upload CSV</p>
                        </div>
                        <input
                            onChange={e => onChange(e.target.files!)}
                            id="upload"
                            name="upload"
                            type="File"
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="address" className="block text-sm">*Enter same amount for all addresses</label>
                    <div className="switch">
                        <input type="checkbox" onChange={e => setChecked(e.target.checked)} id="switch" />
                        <label htmlFor="switch">Toggle</label>
                    </div>
                </div>
                <div>
                    <MyField type="number" placeholder="0" name="amount" id="amount" isGray />
                </div>
            </div>

            {errors.length > 0 ?<div className="p-4 border border-red-500 bg-red-50 mb-6 rounded-md">
                {
                    errors.map((e, i) => (
                        <p key={i} className="text-sm text-red-500">{e}</p>
                    ))
                }
            </div> : null}

            <Modal controller={modalController} title="Example CSV">
                <div className="border border-primary-600 rounded-xl overflow-x-auto min-h-[200px] max-h-[400px] flex">
                    <div className="w-[40px] text-primary-600 bg-primary-50 border-r border-r-1 border-primary-600 min-h-[200px] h-full py-3 px-2">
                        {
                            SAMPLE_DATA.map((c, i) => (
                                <p key={i}>{i + 1}</p>
                            ))
                        }
                    </div>
                    <textarea name="data" id="" value={SAMPLE_DATA.join("\n")} className="w-full h-full whitespace-nowrap text-gray-500 outline-none border-none py-3 px-2 min-h-[200px]" onChange={e => setValue(e.target.value)}>
                    </textarea>
                </div>
            </Modal>
        </div>
    )
}

export default Prepare;