import { ErrorMessage, Field } from "formik";

const TextInput = ({ id, label, name, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field
                type="text"
                id={id}
                name={name}
                className="form-control"
                {...rest}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="error-message text-danger"
            />
        </div>
    );
};

export default TextInput;
