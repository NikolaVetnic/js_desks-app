import { ErrorMessage, Field } from "formik";

const PasswordInput = ({ id, label, name, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field
                type="password"
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

export default PasswordInput;
