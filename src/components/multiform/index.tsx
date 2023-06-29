'use client'
import { FORM_TAB } from '@/constant';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { BsRecordCircle } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai'
import Button from '../Button';
import Prepare from './Prepare';
import Papa from "papaparse";
import Summary from './Summary';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from "yup";
import { isAlphanumeric } from '@/utils/isAlphanumeric';

const validationSchema = yup.object({
    amount: yup.string().required("Amount is required"),
    address: yup.string().optional().test('Check if address is valid', 'Valid characters: a-f, 0-9', (val) => {
        if(val) {
            return isAlphanumeric(val)
        }
        return true;
    }).length(40),
});

const allowedExtensions = ["csv"];


const MultiForm = () => {
    const [tab, setTab] = useState(FORM_TAB.PREPARE);
    const [form, setForm] = useState({
        address: '', amount: ''
    })

    const [errors, setErrors] = useState<string[]>([]);

    // addresses to be displayed on the text area
    const [addresses, setAddresses] = useState<string[]>([]);


    // This state will store the parsed data
    const [data, setData] = useState<string[]>([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    // const [file, setFile] = useState<Blob | string>("");

    const handleParse = (file: File) => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }: any) => {
            let res: string[] = [];
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data as { [key: string]: string }[];

            res.push(Object.keys(parsedData[0]).toString());

            parsedData.forEach((d) => {
                const columns = Object.values(d);
                res.push(columns.toString());
            })
            setData(res);
            setAddresses(res)
        };
        reader.readAsText(file as Blob);
    };

    // This function will be called when
    // the file input changes
    const handleFileChange = useCallback((files: FileList) => {
        setError("");
        setErrors([])

        // Check if user has entered the file
        if (files.length) {
            const inputFile = files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            handleParse(inputFile);
        }

    }, []);


    const submit = (val: typeof form, helpers:FormikHelpers<typeof form>) => {
        setData([...data, `${val.address}, ${val.amount}`]);
        setAddresses([...addresses, `${val.address}, ${val.amount}`])
        helpers.resetForm()
    }

    const goToSummary = () => {
        if(!addresses.length) {
            const msg = "Address list is empty";

            if(!errors.includes(msg)) {
                setErrors([...errors, msg])
            }
            return
        }

        setTab(FORM_TAB.SUMMARY)
    }


    return (

        <div className="w-full flex flex-col items-center">
            <div className="flex items-center text-gray-400 w-full max-w-[300px] mb-[60px]">
                <div className="flex flex-col items-center relative text-primary-600 cursor-pointer">
                    {tab === FORM_TAB.PREPARE ? <BsRecordCircle size={22} /> : <AiOutlineCheckCircle size={25} />}
                    <p className="absolute top-6">Prepare</p>
                </div>

                <div className={classNames("w-full h-[2px]", { "bg-primary-600": tab === FORM_TAB.SUMMARY, "bg-gray-200": tab === FORM_TAB.PREPARE })}></div>

                <div className={classNames("flex flex-col items-center relative cursor-pointer", { "text-primary-600": tab === FORM_TAB.SUMMARY })}>
                    <BsRecordCircle size={22} />
                    <p className="absolute top-6">Summary</p>
                </div>
            </div>

            <Formik initialValues={form} onSubmit={submit} validationSchema={validationSchema}>
                {
                    ({values}) => (
                        <Form className='bg-white border rounded-lg w-full border-gray-100 p-3 md:p-10 max-w-[800px]'>
                            <p className='text-3xl mb-8'>Sender</p>
                            <div>
                                {tab === FORM_TAB.PREPARE && <Prepare onChange={handleFileChange} addresses={addresses} setAddresses={setAddresses} setData={setData} errors={errors} setErrors={setErrors} />}
                                {tab === FORM_TAB.SUMMARY && <Summary data={data} amount={form.amount} />}
                            </div>
                            <div className='flex space-x-3'>
                                {tab === FORM_TAB.SUMMARY && <Button text='Go Back' type='button' onClick={() => setTab(FORM_TAB.PREPARE)} isWhite />}
                                {(tab === FORM_TAB.PREPARE && values.address ) && <Button text='Merge' type='submit' isWhite />}
                                <Button text='Proceed' type='button' onClick={goToSummary} />
                            </div> 
                        </Form>
                    )
                }
            </Formik>

        </div>
    )
}

export default MultiForm;