export type InputProps = {
  inputLabel: string;
  value: string | Number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired: boolean;
};

export type SelectProps = {
  inputLabel: string;
  value: string;
  dropDownList: Array<string>;
  onChange: (event: SelectChangeEvent) => void;
};

export type FormProps = {
  isRegistered: boolean;
  handleRegister: () => void;
}
