import { ErrorMessage, useField } from "formik";

import React from "react";

const BooleanField = ({ label, notReq, ...props }) => {
  const [field, meta, { setTouched }] = useField(props?.field.name);

  return (
    <div className="mb-1 flex flex-col">
      <label className="m-2 font-sans text-lg">{label}</label>
      <div className="mx-4 flex gap-4 font-sans text-base">
        <label>
          <div className="flex gap-1">
            <input
              type="radio"
              name={field.name}
              value={true}
              checked={field.value === true}
              onChange={() => {
                setTouched(true);
                field.onChange({ target: { name: field.name, value: true } });
              }}
              className="w-[20px]"
            />
            <p>Tak</p>
          </div>
        </label>
        <label>
          <div className="flex gap-1">
            <input
              type="radio"
              name={field.name}
              value={false}
              checked={field.value === false}
              onChange={() => {
                setTouched(true);
                field.onChange({ target: { name: field.name, value: false } });
              }}
              className="w-[20px]"
            />
            <p>Nie</p>
          </div>
        </label>
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="mt-2 text-cherry"
      />
    </div>
  );
};

export default BooleanField;
