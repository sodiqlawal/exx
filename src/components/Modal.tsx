import type { FC, PropsWithChildren } from 'react'
import { ModalController } from '@/hooks/useModal'
import { GrClose } from 'react-icons/gr';
import classNames from 'classnames';

const Modal: FC<
    PropsWithChildren<{ controller: ModalController; title?: string; className?: string }>
> = ({ controller, children, title, className }) => {
    if (!controller.isOpen) return null
    return (
        <div className="fixed z-[100] top-0 right-0 bottom-0 left-0 flex justify-center items-center modal">
            <div className={classNames("min-w-[80%] md:min-w-[700px] md:max-w-[1000px] max-h-[90%] bg-white py-5 px-4 sm:px-10 rounded-xl paper relative", className)}>
                <div className="flex justify-between items-center" onClick={controller.close}>
                <p className='font-medium text-xl'>{title}</p>
                    <GrClose className='text-gray-600 cursor-pointer' />
                </div>
                <div className='overflow-auto max-h-[80vh] pt-8'>
                    {children}
                </div>
            </div>
            <style>
                {`
              .modal {
                  background-color: rgba(0,0,0,0.4)
              }

              .paper {
                max-width: 95%
              }
          `}
            </style>
        </div>
    )
}

export default Modal
