import { ActionMeta, MultiValue } from 'react-select';

export interface Email {
  value: string;
  label: string;
  image: string;
}

export interface Name {
  value: string;
  label: string;
}

export interface Message {
  message: string;
}

export interface State {
  emailOptions: Email[];
  selectedEmails: Email[];
  selectedNames: Name[];
  content: string;
  errorMessage: string;
  result: Message[];
  resultCopy: Message[];
  isLoading: boolean;
}

export interface CustomOptionsProps {
  innerProps: React.HTMLProps<HTMLDivElement>;
  label: string;
  data: Email | Name;
  isEmail: boolean;
}

export interface CustomInputProps {
  type: string;
  value: Email[] | Name[];
  options: Email[] | Name[];
  handleCreate: (value: string) => void;
  handleChange: (
    newValue: MultiValue<Email> | MultiValue<Name>,
    actionMeta: ActionMeta<Email> | ActionMeta<Name>
  ) => void;
}
