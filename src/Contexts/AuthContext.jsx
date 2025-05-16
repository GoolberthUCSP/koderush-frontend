import { createContext, useContext, createSignal } from 'solid-js';

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = createSignal(false);
    const [userData, setUserData] = createSignal({
        username: "",
        name: "",
        profilePicture: "",
        location: "",
        email: "",
        bio: "",
    });

    const login = (userData) => {
        setIsLoggedIn(true);
        setUserData(userData);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setUserData({
            username: "",
            name: "",
            profilePicture: "",
            location: "",
            email: "",
            bio: "",
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userData, setUserData }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};