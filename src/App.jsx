import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Login from './Login'  
import Register from './Register';
import Profile from './Profile'
import ForgotPassword from './ForgotPassword'
import Private from './Private';
import ResetPassword from './ResetPassword'
import Nav from './Nav';
import Home from './Home'
import { AuthProvider, authContext } from './context/Auth.context';
import { useContext } from 'react';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { Public } from '@mui/icons-material';


function App() {

    return(
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route
                            path='/' element={
                                <PublicRoutes>
                                    <Home />
                                </PublicRoutes>
                            }
                        />
                        <Route path="/login" element={
                            <PublicRoutes>
                                <Login /> 
                            </PublicRoutes>
                        } />
                        <Route path="/register" element={
                            <PublicRoutes>
                                <Register /> 
                            </PublicRoutes>
                        } />
                        <Route path="/profile" element={ <PrivateRoutes><Profile /></PrivateRoutes>  } />
                        <Route path="/forgot-password" element={
                            
                                <ForgotPassword />
                            
                        } />
                        <Route path="/private" element={<PrivateRoutes><Private /></PrivateRoutes> } />
                        <Route path="/reset-password" element={<ResetPassword /> } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
  
}

export default App
