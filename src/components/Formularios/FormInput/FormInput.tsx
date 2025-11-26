interface FormInputProps 
{
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  role?: string;
}

export function FormInput({ name, label, type = "text", placeholder, value, onChange, onBlur, required = false, role}: FormInputProps) 
{
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
      {label && <p>{label}:</p>}
      <input
        className="forminput"
        name={name}
        value={value}
        type={type}
        placeholder={placeholder || label}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        role={role}
      />
    </div>
  );
}