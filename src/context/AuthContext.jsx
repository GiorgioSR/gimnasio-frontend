import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Intentar leer la sesión desde localStorage al iniciar
    try {
      const savedAuth = localStorage.getItem('auth');
      return savedAuth ? JSON.parse(savedAuth) : {};
    } catch (error) {
      return {};
    }
  });

  const login = (userData) => {
    // Guardamos el objeto completo de autenticación
    const authData = {
      id: userData.id,
      email: userData.email,
      nombre: userData.nombre,
      rol: userData.rol,
      token: userData.token,
    };
    localStorage.setItem('auth', JSON.stringify(authData));
    setAuth(authData);
  };

  // La función de registro ahora solo necesita llamar a login
  // después de que el backend haya hecho su trabajo.
  // La mantenemos para compatibilidad, pero el flujo principal lo maneja el componente.
  const registerAndLogin = async (registerData) => {
    // Esta lógica ya la maneja el componente Register, que luego llama a login.
    // La mantenemos aquí por si se usa en otro lugar, pero la clave es la función `login`.
    // En un futuro, se podría refactorizar para que este sea el único punto de verdad.
  };

  const logout = useCallback(() => {
    setAuth({});
    // Limpiamos todo al cerrar sesión
    localStorage.removeItem('auth');
    localStorage.removeItem('token'); // por si acaso
  }, []);

  // Ya no necesitamos el useEffect para leer el token,
  // se hace en la inicialización del estado con useState.

  return (
    <AuthContext.Provider value={{ auth, login, logout, registerAndLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;