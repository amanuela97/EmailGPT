'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addResponse,
  resetErrorMessage,
  setErrorMessage,
  updateLoadingState,
} from '../redux/store';
import {
  updateEmailAndName,
  addEmailAndName,
  updateContent,
} from '../redux/store';
import { MultiValue } from 'react-select';
import { Email, Name } from '../utils/types';
import CustomInput from './CustomInput';
import { generateEmails } from '../utils/emailGenerator';

const Email = () => {
  const emailOptions = useAppSelector((state) => state.emailOptions);
  const selectedEmails = useAppSelector((state) => state.selectedEmails);
  const selectedNames = useAppSelector((state) => state.selectedNames);
  const content = useAppSelector((state) => state.content);
  const errorMessage = useAppSelector((state) => state.errorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!errorMessage) return;
    setTimeout(() => {
      dispatch(resetErrorMessage());
    }, 3000);
  }, [dispatch, errorMessage]);

  const handleCreate = (value: string, type: string) => {
    dispatch(addEmailAndName({ value, type }));
  };

  const handleChange = (
    newValue: MultiValue<Email> | MultiValue<Name>,
    type: string
  ) => {
    const value =
      type === 'email'
        ? (newValue as MultiValue<Email>)
        : (newValue as MultiValue<Name>);
    dispatch(updateEmailAndName({ value, type }));
  };

  const handleSubmit = async () => {
    if (!content) {
      return dispatch(
        setErrorMessage({ message: 'email content must not be empty' })
      );
    }
    if (selectedEmails.length === 0 || selectedNames.length === 0) {
      return dispatch(
        setErrorMessage({ message: 'Please provide both an Email and Name' })
      );
    }
    if (selectedEmails.length !== selectedNames.length) {
      return dispatch(
        setErrorMessage({
          message: 'Every email must have a corresponding user name',
        })
      );
    }

    dispatch(updateLoadingState({ loading: true }));
    const names = selectedNames.map((email) => email.value);
    const result = await generateEmails(content, names, selectedEmails.length);

    if (result?.data) {
      dispatch(addResponse({ messages: result.data }));
    } else if (result.error) {
      dispatch(
        setErrorMessage({
          message: 'Unable to generate emails :(',
        })
      );
    }
    dispatch(updateLoadingState({ loading: false }));
  };

  return (
    <div className="col-span-2 px-4 py-2">
      <div className="flex justify-between items-center pl-1">
        <span className="text-md font-semibold py-2">New Message</span>
        {errorMessage && (
          <span className="text-base font-semibold text-red-500 pt-1">
            {errorMessage}
          </span>
        )}
      </div>
      <CustomInput
        type="email"
        value={selectedEmails}
        options={emailOptions}
        handleChange={(value) => handleChange(value, 'email')}
        handleCreate={(value) => handleCreate(value, 'email')}
      />
      <CustomInput
        type="name"
        value={selectedNames}
        options={[]}
        handleChange={(value) => handleChange(value, 'name')}
        handleCreate={(value) => handleCreate(value, 'name')}
      />
      <textarea
        value={content}
        onChange={(e) => dispatch(updateContent({ value: e.target.value }))}
        className="w-full h-[60%] text-xl mt-4 py-2 px-4 outline outline-black/20"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="float-right text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2  mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Generate Emails
      </button>
    </div>
  );
};

export default Email;
