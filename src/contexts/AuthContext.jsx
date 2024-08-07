import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        token: localStorage.getItem("authToken"),
        isAuthenticated: localStorage.getItem("authToken") ? true : false,
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token) => {
            dispatch({ type: ACTIONS.LOGIN, payload: token });
            localStorage.setItem("authToken", token);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            navigate("/login");
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };

/*

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, user: null, token: null });
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token'); 
      if (token) { 
        getProfile(token).then(user => setAuthState({ isAuthenticated: true, user, token })) //setAuthState({ isAuthenticated: true, user, token })
        .catch(() => {
          setAuthState({ isAuthenticated: false, user: null, token: null });
          navigate('/HomePage');   //navigate('/login');
        });
      }  
    } , [navigate]);
    
    
    const login = async (username, password) => {
      const { token, user } = await loginUser(username, password);
      localStorage.setItem('token', token);
      setAuthState({ isAuthenticated: true, user, token });
    };

    const logout = () => {
      localStorage.removeItem('token');
      setAuthState({ isAuthenticated: false, user: null, token: null });
      navigate('/HomePAge');
    };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
*/

