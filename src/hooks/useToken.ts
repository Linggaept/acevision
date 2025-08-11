// hooks/useToken.ts
import { useState, useEffect, useCallback } from 'react';
import { clientTokenManager, type TokenData } from '@/utils/clientTokenManager';

interface UseTokenReturn {
  token: TokenData | null;
  isAuthenticated: boolean;
  isTokenValid: boolean;
  isLoading: boolean;
  setToken: (tokenData: TokenData) => void;
  clearToken: () => void;
  refreshToken: (refreshFunction: (refreshToken: string) => Promise<TokenData>) => Promise<boolean>;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getRemainingTime: () => number | null;
  getExpiryDate: () => Date | null;
}

export const useToken = (): UseTokenReturn => {
  const [token, setTokenState] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token saat hook pertama kali digunakan
  useEffect(() => {
    const loadToken = () => {
      try {
        const storedToken = clientTokenManager.getToken();
        setTokenState(storedToken);
      } catch (error) {
        console.error('Error loading token:', error);
        setTokenState(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  // Set token dan simpan ke cookies
  const setToken = useCallback((tokenData: TokenData) => {
    try {
      clientTokenManager.setToken(tokenData);
      setTokenState(tokenData);
    } catch (error) {
      console.error('Error setting token:', error);
      throw error;
    }
  }, []);

  // Clear token dari cookies dan state
  const clearToken = useCallback(() => {
    try {
      clientTokenManager.clearTokens();
      setTokenState(null);
    } catch (error) {
      console.error('Error clearing token:', error);
      throw error;
    }
  }, []);

  // Refresh token
  const refreshToken = useCallback(async (
    refreshFunction: (refreshToken: string) => Promise<TokenData>
  ): Promise<boolean> => {
    try {
      const currentRefreshToken = clientTokenManager.getRefreshToken();
      
      if (!currentRefreshToken) {
        console.error('No refresh token available');
        return false;
      }

      const newTokenData = await refreshFunction(currentRefreshToken);
      setToken(newTokenData);
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }, [setToken]);

  // Get access token
  const getAccessToken = useCallback((): string | null => {
    return clientTokenManager.getAccessToken();
  }, []);

  // Get refresh token
  const getRefreshToken = useCallback((): string | null => {
    return clientTokenManager.getRefreshToken();
  }, []);

  // Get remaining time until expiry
  const getRemainingTime = useCallback((): number | null => {
    return clientTokenManager.getTokenRemainingTime();
  }, []);

  // Get expiry date
  const getExpiryDate = useCallback((): Date | null => {
    return clientTokenManager.getTokenExpiryDate();
  }, []);

  // Check if user is authenticated
  const isAuthenticated = Boolean(token?.access_token);

  // Check if token is valid (exists and not expired)
  const isTokenValid = clientTokenManager.isTokenValid();

  return {
    token,
    isAuthenticated,
    isTokenValid,
    isLoading,
    setToken,
    clearToken,
    refreshToken,
    getAccessToken,
    getRefreshToken,
    getRemainingTime,
    getExpiryDate,
  };
};