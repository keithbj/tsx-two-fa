import React from "react";

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: any;
  autoComplete: string;
  error: string;
}

const Input = ({ type, name, value, onChange, autoComplete, error }: Props) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        autoComplete={autoComplete}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
