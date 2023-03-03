import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useDispatch } from 'react-redux'
import { depositWallet } from '@/redux/thunk/WalletAction'
import { MyTextInput } from './FormHook'
const FormDeposit = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <Formik
                initialValues={{ amount: 0 }}
                validationSchema={Yup.object({
                    amount: Yup.number()
                        .moreThan(0, 'Amount > 0')
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(depositWallet(values.amount))
                }}
            >
                <Form className="ng-untouched ng-pristine ng-valid">
                    <MyTextInput
                        label="Amount"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                        name="amount"
                        type="number"
                    />
                    <button type="submit" className="block w-1/2 p-3 mt-5 mx-auto text-center rounded-md text-sm bg-violet-600 text-white hover:text-black transition-all duration-100">Deposit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default FormDeposit