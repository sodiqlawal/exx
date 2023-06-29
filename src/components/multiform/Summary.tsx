import { FC, useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

const Summary:FC<{data:string[], amount:string}> = ({data, amount}) => {

    return (
        <div>
            <div className="mb-6">
                <div className="border border-gray-200 w-full rounded-md mb-1 p-6">
                    <p className="text-sm text-gray-500">Total number of token to send</p>
                    <p className="text-primary-600 text-2xl font-medium">0.00 BNB</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <p>Token Balance <span className="text-primary-600">0 BNB</span></p>
                    <p>BNB Balance <span className="text-primary-600">0 BNB</span></p>
                </div>
            </div>

            <div className="text-sm flex items-center space-x-2 border border-warning-300 text-warning-600 rounded-md p-4 mb-6">
                <AiOutlineWarning size={22} />
                <p>Not enough token in your wallet <span className="font-medium cursor-pointer">Add funds</span></p>
            </div>

            <div className='mb-6'>
                <p className='mb-3'>List of recipients</p>
                <div className='max-h-[300px] overflow-auto'>
                    {
                        data.map((d, i) => (
                            <div key={i} className='flex items-center justify-between text-gray-600 text-sm mb-3 pb-1 border-b'>
                                <p>{d}</p>
                                <p className='text-primary-600'>{Number(amount).toFixed(1)}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Summary;