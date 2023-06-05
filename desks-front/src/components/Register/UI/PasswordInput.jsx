import { ErrorMessage, Field } from "formik";

const PasswordInput = ({ label, name, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field
                type="password"
                id={name}
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
