import { ErrorMessage, Field, useField } from "formik";

import React from "react";

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-1 flex h-[90%] min-w-[16rem] flex-col">
      <label htmlFor={field.name} className="m-2 font-sans text-lg">
        {label}
      </label>
      <Field
        as="textarea"
        className={`h-full resize-none rounded-xl px-4 py-1 font-sans text-base ${
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

export default TextArea;
