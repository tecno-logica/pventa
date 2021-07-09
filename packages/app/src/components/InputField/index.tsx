import classNames from "classnames";
import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  password?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  password,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let C = InputText;
  if (password) {
    C = Password;
  }
  /* const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  }; */

  return (
    <div className="p-field">
      <span className="p-float-label">
        <C
          id={field.name}
          {...field}
          className={classNames({ "p-invalid": !!error })}
        />
        <label
          htmlFor={field.name}
          className={classNames({ "p-error": !!error })}
        >
          {label}
        </label>
      </span>
      {error && <small className="p-error">{error}</small>}
    </div>
  );
};

export default InputField;
