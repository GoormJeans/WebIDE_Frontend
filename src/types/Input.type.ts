export type InputType = {
  type: string;
  placeholder: string;
  label: string;
};

export type InputTagProps = {
  inputType: InputType;
  value?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isErrored: boolean;
  disabled?: boolean;
};