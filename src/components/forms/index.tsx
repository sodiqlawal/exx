import capitalize from '@/utils/capitalize';
import classNames from 'classnames';
import {
    ErrorMessage,
    Field,
    FormikProps,
    useField,
} from 'formik';

type MyFieldProps = React.InputHTMLAttributes<any> & {
    // You can add more input types here
    as?: 'input';
    name: string;
    formData?: FormikProps<any>;
    label?: string;
    isGray?: boolean;
  };


export const MyErrorMessage: React.FC<{ name: string}> = (props) => (


        <ErrorMessage name={props.name}>
            {(msg: string) => (
                <div className="text-sm text-red-500">{capitalize(msg).replace(/_/g, ' ')}</div>
            )}
        </ErrorMessage>

);

export const MyField = ({ className, ...props }: MyFieldProps) => {
    const [input, meta] = useField<any>(props.name);

    const isError = (meta.error && meta.touched);

    return (
        <div>
            {props.label ? <label htmlFor={props.id} className="block text-sm mb-1">{props.label}</label> : null}
            <div className='relative'>
                <Field
                    {...props}
                    {...input}
                    value={input.value ?? ''}
                    className={classNames('focus:outline-none focus:ring-0 outline-none w-full rounded-3xl py-2 px-4', {
                        'border-red-500': isError,
                        'border border-gray-100 bg-gray-100 ': props.isGray,
                        'border border-primary-600': !props.isGray
                    })}
                />
            </div>
            {
                isError ? <MyErrorMessage name={props.name} /> : null
            }
        </div>
    );
};
