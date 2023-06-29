import { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & { text: string, isOutlined?: boolean, loading?: boolean; isWhite?: boolean; }> = ({ text, className, loading, isWhite, ...props }) => {
    return (
        <button type={props.type || 'button'} className={classNames('flex items-center w-full text-lg justify-center space-x-2 py-4 px-7 rounded-3xl', className, { '': props.disabled, 'bg-white': props.isOutlined, 'bg-white border border-dark': isWhite, 'bg-primary-600 border border-primary-600 text-white': !isWhite })} {...props}>
            <span>{text}</span>
            {loading ? <div>...</div> : null}
        </button>
    )
}

export default Button;