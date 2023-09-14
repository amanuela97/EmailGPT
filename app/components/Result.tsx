import React, { CSSProperties } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import Loader from './Loader';
import { editResult } from '../redux/store';

const Result = () => {
  const isLoading = useAppSelector((state) => state.isLoading);
  const result = useAppSelector((state) => state.result);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center outline-black/40">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full outline-black/40 overflow-y-scroll">
      <ul>
        {result &&
          result.map((message, i) => {
            return (
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  e.currentTarget.textContent &&
                  dispatch(
                    editResult({ content: e.currentTarget.textContent, idx: i })
                  )
                }
                key={i}
                style={{ '--idx': i } as CSSProperties}
                className="result text-sm p-2 m-2 border border-black/40 rounded-lg"
              >
                {message.message}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Result;
