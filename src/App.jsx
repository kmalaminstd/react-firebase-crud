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
import AddNote from './notes/AddNote'
import EditNote from './notes/EditNote'
import Notes from './notes/Notes'
import { NoteContextProvider } from './context/Note.context';
import EditProfile from './profile/EditProfile';


function App() {

    return(
        <>
            <AuthProvider>
                <NoteContextProvider>
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
                            <Route path="/update-profile" element={ <PrivateRoutes><EditProfile /></PrivateRoutes>  } />
                            <Route path="/add-note" element={ <PrivateRoutes><AddNote /></PrivateRoutes>  } />
                            <Route path="notes/edit-note/:id" element={ <PrivateRoutes><EditNote /></PrivateRoutes>  } />
                            <Route path="/notes" element={ <PrivateRoutes><Notes /></PrivateRoutes>  } />
                            <Route path="/forgot-password" element={
                                
                                    <ForgotPassword />
                                
                            } />
                            <Route path="/private" element={<PrivateRoutes><Private /></PrivateRoutes> } />
                            <Route path="/reset-password" element={<ResetPassword /> } />
                        </Routes>
                    </BrowserRouter>
                </NoteContextProvider>
            </AuthProvider>
        </>
    )
  
}

export default App
