import './InputText.css';

const InputText = ({ placeholder, value, onChange, type = 'text', name, background = '#295c69' }) => {
    return (
        <div className="floating-input-group">
            <input
                type={type}
                name={name}
                id={name}
                className="floating-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
            <label
                htmlFor={name}
                className="floating-label"
                style={{ backgroundColor: background }}
            >
                {placeholder}
            </label>
        </div>
    );
};

export default InputText;
