import { useEffect } from 'react';
import { getToken } from './authService';
import { redirect } from 'next/navigation';

const useAuthGuard = (): void => {
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      redirect('/login');
    }
  }, []);
};

export default useAuthGuard;
