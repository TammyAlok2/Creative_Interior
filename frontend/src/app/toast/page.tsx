'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const notify = () => toast('This is a basic alert!');

  return (
    <div className='mt-[9rem]'>
      <button onClick={notify}>Show Alert</button>
      <ToastContainer />
    </div>
  );
};
export default App;