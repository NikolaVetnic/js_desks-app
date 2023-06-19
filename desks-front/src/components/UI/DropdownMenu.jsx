import React from "react";

const DropdownMenu = ({ value, options, onChange }) => {
    return (
        <div>
            Chosen option: &nbsp;
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownMenu;
