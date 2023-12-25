import { ErrorMessage, useField } from "formik";

import React from "react";
import { Select } from "antd";

const SelectField = ({ label, ...props }) => {
  const [field, meta, { setTouched }] = useField(props?.field.name);

  return (
    <div className="mb-1 flex min-w-[16rem] flex-col">
      {label && (
        <label htmlFor={field.name} className="m-2 font-sans text-lg">
          {label}
        </label>
      )}

      <Select
        className={`w-full rounded-xl px-4 py-1 font-sans text-base ${
          meta.touched && meta.error && "is-invalid"
        }`}
        notFoundContent={<p className="py-1 text-center">Brak opcji</p>}
        {...props}
        onBlur={setTouched}
      />

      <ErrorMessage
        component="div"
        name={field.name}
        className="mt-2 text-cherry"
      />
    </div>
  );
};

export default SelectField;
