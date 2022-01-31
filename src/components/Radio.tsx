import React from "react";
import "./Radio.scss";

interface Props {
  id: string;
  name: string;
  value: string;
  onChange: any;
  checked: boolean;
}

const renderInput = ({ id, name, value, onChange, checked }: Props) => {
  if (checked) {
    return (
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        // Workaround to get Radio css to display select correctly.
        checked={checked}
      />
    );
  } else {
    return (
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }
};

const Radio = (props: Props) => {
  return (
    <label className="radio-container">
      {renderInput(props)}
      <span className="checkmark"></span>
      <img className="pad-mobile" src="mobile_25.png" alt="" />
    </label>
  );
};

export default Radio;
