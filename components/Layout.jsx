import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer />
      <main>{children}</main>
    </>
  );
}
