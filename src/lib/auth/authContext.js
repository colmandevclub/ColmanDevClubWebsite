import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/config/firebase-config.js';
import { roles } from 'src/constants/roles';
import { UserService } from 'src/services/user.service';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      console.log('You have been logged out');
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const tamirFunction = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      });

      const userData = await UserService.getById(user.uid);
      setUser({ ...user, ...userData });
      setIsLoading(true);
    };

    tamirFunction();
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, isLoading }}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
