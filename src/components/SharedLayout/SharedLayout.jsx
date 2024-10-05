import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';
import css from "./SharedLayout.module.css"

const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      
      <Suspense fallback={<Loader />}>
        {children} 
      </Suspense>
      <Toaster position="top-center" />
    </div>
  );
};

export default SharedLayout;
