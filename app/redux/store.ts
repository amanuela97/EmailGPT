import { createSlice, configureStore } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Email, Name, State, Message } from '../utils/types';
import { emailOptions, imgUrl, validateEmail } from '../utils/data';
import { MultiValue } from 'react-select';

const initialState: State = {
  emailOptions,
  selectedEmails: [],
  selectedNames: [],
  content: '',
  errorMessage: '',
  result: [],
  resultCopy: [],
  isLoading: false,
};

const update = (state: State, payload: { type: string; value: string }) => {
  const { type, value } = payload;

  if (!value) return;

  if (type === 'email') {
    const isNotValidEmail = validateEmail(value);
    if (isNotValidEmail) {
      state.errorMessage = isNotValidEmail;
      return;
    }
    const newEmail = {
      value,
      label: value,
      image: imgUrl,
    };
    state.selectedEmails.push(newEmail);
    state.emailOptions.push(newEmail);
  } else if (type === 'name') {
    const newName = {
      value,
      label: value,
    };
    state.selectedNames.push(newName);
  }
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    addEmailAndName: (
      state,
      action: PayloadAction<{ type: string; value: string }>
    ) => {
      update(state, action.payload);
    },
    setErrorMessage: (state, action: PayloadAction<{ message: string }>) => {
      const message = action.payload.message;
      state.errorMessage = message;
    },
    resetErrorMessage: (state) => {
      state.errorMessage = '';
    },
    updateEmailAndName: (
      state,
      action: PayloadAction<{
        value: MultiValue<Email> | MultiValue<Name>;
        type: string;
      }>
    ) => {
      const { value, type } = action.payload;
      const isEmail = type === 'email';
      if (value.length === 0) {
        isEmail ? (state.selectedEmails = []) : (state.selectedNames = []);
        return;
      }

      if (isEmail) {
        const mutableEmails: Email[] = (value as MultiValue<Email>).slice(0);
        state.selectedEmails = mutableEmails;
      } else {
        const mutableNames: Name[] = (value as MultiValue<Name>).slice(0);
        state.selectedNames = mutableNames;
      }
    },
    updateContent: (state, action: PayloadAction<{ value: string }>) => {
      const value = action.payload.value;
      state.content = value;
    },
    addResponse: (state, action: PayloadAction<{ messages: Message[] }>) => {
      const message = action.payload.messages;
      state.result = message;
      state.resultCopy = message;
    },
    updateLoadingState: (
      state,
      action: PayloadAction<{ loading: boolean }>
    ) => {
      state.isLoading = action.payload.loading;
    },
    editResult: (
      state,
      action: PayloadAction<{ content: string; idx: number }>
    ) => {
      const { idx, content } = action.payload;
      state.resultCopy[idx].message = content;
    },
  },
});

export const {
  addEmailAndName,
  resetErrorMessage,
  updateEmailAndName,
  updateContent,
  setErrorMessage,
  addResponse,
  updateLoadingState,
  editResult,
} = emailSlice.actions;

export const store = configureStore({
  reducer: emailSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
