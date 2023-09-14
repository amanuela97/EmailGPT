'use client';

import Email from './components/Email';
import Result from './components/Result';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function Home() {
  return (
    <main className="h-full px-6 pt-8 pb-2 grid grid-cols-3 gap-4 border-1 border-black/40">
      <Provider store={store}>
        <Email />
        <Result />
      </Provider>
    </main>
  );
}
