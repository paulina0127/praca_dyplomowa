import { ErrorMessage, useField } from "formik";

import { useState } from "react";

const FileField = ({ label, accept, ...props }) => {
  const [field, meta] = useField(props);

  const onChange = (e) => {
    field.onChange({
      target: {
        name: field.name,
        value: e.target.files[0],
      },
    });
  };

  return (
    <div className="form-group mb-3">
      <input
        id={field.name}
        accept={accept}
        className={`form-control rounded-pill border-2 px-4 shadow-sm ${
          meta.touched && meta.error && "is-invalid"
        }`}
        onChange={onChange}
        hidden
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error text-danger mt-2"
      />
    </div>
  );
};

export default FileField;