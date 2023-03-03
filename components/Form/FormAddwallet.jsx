import { Form, Formik } from 'formik'
import WAValidator from "wallet-address-validator"
import * as Yup from 'yup'
import React from 'react'
import { useDispatch } from 'react-redux'
import { MyTextInput } from './FormHook'
import { addWallet } from '@/redux/thunk/UserAction'

const FormAddwallet = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <Formik
                initialValues={{ address: '' }}
                validationSchema={Yup.object({
                    address: Yup.string()
                        .required('Required')
                        .test({
                            name: 'checkAddress',
                            test: (value) => WAValidator.validate(value, 'ETH', 'testnet'),
                            message: "Wallet address invalid"
                        })
                })}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(addWallet(values.address))
                }}
            >
                <Form className="ng-untouched ng-pristine ng-valid">
                    <MyTextInput
                        label="Address"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                        name="address"
                        type="text"
                    />
                    <button type="submit" className="block w-1/2 p-3 mt-5 mx-auto text-center rounded-md text-sm bg-violet-600 text-white hover:text-black transition-all duration-100">Add Wallet</button>
                </Form>
            </Formik>
        </div>
    )
}

export default FormAddwallet