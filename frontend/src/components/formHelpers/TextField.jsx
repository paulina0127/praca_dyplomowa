import { ErrorMessage, useField } from "formik";

const TextField = ({ label, classes, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-1 flex min-w-[16rem] flex-col">
      <label htmlFor={field.name} className="m-2 font-sans text-lg">
        {label}
      </label>

      <input
        className={`w-full rounded-xl px-4 py-1 font-sans text-base ${classes} ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="mt-2 text-cherry"
      />
    </div>
  );
};

export default TextField;
