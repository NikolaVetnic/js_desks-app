import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    dropdown: Yup.string().required("Please select city"),
    number1: Yup.number().required("Office is required"),
    number2: Yup.number().required("Desk number is required")
})

const AddDeskForm = () => {
    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <div>
            <h1>Add Desk Form</h1>
            <Formik initialValues={{
                dropdown: "",
                number1: 0,
                number2: 0
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="dropdown">City:</label>
                        <Field as="select" id="dropdown" name="dropdown">
                            <option value="">- Select an option -</option>
                            <option value="">- Select an option -</option>
                            <option value="">- Select an option -</option>
                            <option value="">- Select an option -</option>
                        </Field>
                        <ErrorMessage name="dropdown" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="number1">Number 1:</label>
                        <Field type="number" id="number1" name="number1" />
                        <ErrorMessage name="number1" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="number2">Number 1:</label>
                        <Field type="number" id="number2" name="number2" />
                        <ErrorMessage name="number2" component="div" className="error" />
                    </div>

                    <button>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddDeskForm