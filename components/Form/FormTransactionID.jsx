import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import WAValidator from "wallet-address-validator"
import React from 'react'
import { useDispatch } from 'react-redux'
import { createID } from '@/redux/thunk/ProposalAction'
import { MyTextInput } from './FormHook'
const FormTransactionID = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <Formik
                initialValues={{ to: '', amount: 0 }}
                validationSchema={Yup.object({
                    to: Yup.string()
                        .required('Required')
                        .test({
                            name: 'checkAddress',
                            test: (value) => WAValidator.validate(value, 'ETH', 'testnet'),
                            message: "Wallet address invalid"
                        }),
                    amount: Yup.number()
                        .moreThan(0, 'Amount > 0')
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(createID('transaction', values))
                }}
            >
                <Form className="ng-untouched ng-pristine ng-valid">
                    <MyTextInput
                        label="To"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                        name="to"
                        type="text"
                    />
                    <MyTextInput
                        label="Amount"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                        name="amount"
                        type="number"
                    />
                    <button type="submit" className="block w-1/2 p-3 mt-5 mx-auto text-center rounded-md text-sm bg-violet-600 text-white hover:text-black transition-all duration-100">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default FormTransactionID