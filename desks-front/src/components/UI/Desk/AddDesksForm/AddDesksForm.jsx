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
        <div className="container">
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
                    <div className="form-group">
                        <label htmlFor="dropdown">Choose location:</label>
                        <Field as="select" id="dropdown" name="dropdown" className="form-control" >
                            <option value="">- location -</option>
                            <option value="hd">Heidelberg</option>
                            <option value="md">Magdeburg</option>
                            <option value="ns">Novi Sad</option>
                        </Field>
                        <ErrorMessage name="dropdown" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="room">Room no:</label>
                        <Field type="number" id="room" name="room" className="form-control" />
                        <ErrorMessage name="room" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="desk">Desk no:</label>
                        <Field type="number" id="desk" name="desk" className="form-control" />
                        <ErrorMessage name="desk" component="div" className="text-danger" />
                    </div>

                    <button className="btn btn-primary">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddDeskForm