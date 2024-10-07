// import AppBar from '../AppBar/AppBar';
import { Toaster } from 'react-hot-toast';


export default function Layout({ children }) {
    return (
        <div>
            {/* <AppBar /> */}
            {children}
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}