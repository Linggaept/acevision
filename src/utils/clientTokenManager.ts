// utils/clientTokenManager.ts
// Client-side token manager untuk digunakan di komponen React

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
}

export interface CookieOptions {
  maxAge?: number; // in seconds
  expires?: Date;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
  domain?: string;
}

class ClientTokenManager {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly TOKEN_EXPIRES_KEY = 'token_expires';
  private readonly TOKEN_TYPE_KEY = 'token_type';

  // Default cookie options
  private readonly defaultOptions: CookieOptions = {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };

  /**
   * Utility function untuk set cookie
   */
  private setCookie(name: string, value: string, options: CookieOptions): void {
    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += `; secure`;
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  /**
   * Utility function untuk get cookie
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      return null; // SSR protection
    }

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  /**
   * Utility function untuk delete cookie
   */
  private deleteCookie(name: string): void {
    if (typeof document === 'undefined') {
      return; // SSR protection
    }

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * CREATE - Menyimpan token ke cookies
   */
  setToken(tokenData: TokenData, options?: Partial<CookieOptions>): void {
    const cookieOptions = { ...this.defaultOptions, ...options };

    try {
      // Set access token
      this.setCookie(this.ACCESS_TOKEN_KEY, tokenData.access_token, cookieOptions);

      // Set refresh token jika ada
      if (tokenData.refresh_token) {
        this.setCookie(this.REFRESH_TOKEN_KEY, tokenData.refresh_token, cookieOptions);
      }

      // Set expiry time jika ada
      if (tokenData.expires_at) {
        this.setCookie(this.TOKEN_EXPIRES_KEY, tokenData.expires_at.toString(), cookieOptions);
      }

      // Set token type jika ada
      if (tokenData.token_type) {
        this.setCookie(this.TOKEN_TYPE_KEY, tokenData.token_type, cookieOptions);
      }

      console.log('Token berhasil disimpan ke cookies');
    } catch (error) {
      console.error('Gagal menyimpan token:', error);
      throw new Error('Failed to save token to cookies');
    }
  }

  /**
   * READ - Mengambil token dari cookies
   */
  getToken(): TokenData | null {
    try {
      const accessToken = this.getCookie(this.ACCESS_TOKEN_KEY);
      
      if (!accessToken) {
        return null;
      }

      const refreshToken = this.getCookie(this.REFRESH_TOKEN_KEY);
      const expiresAt = this.getCookie(this.TOKEN_EXPIRES_KEY);
      const tokenType = this.getCookie(this.TOKEN_TYPE_KEY);

      return {
        access_token: accessToken,
        refresh_token: refreshToken || undefined,
        expires_at: expiresAt ? parseInt(expiresAt) : undefined,
        token_type: tokenType || undefined,
      };
    } catch (error) {
      console.error('Gagal mengambil token:', error);
      return null;
    }
  }

  /**
   * READ - Mengambil hanya access token
   */
  getAccessToken(): string | null {
    try {
      return this.getCookie(this.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Gagal mengambil access token:', error);
      return null;
    }
  }

  /**
   * READ - Mengambil hanya refresh token
   */
  getRefreshToken(): string | null {
    try {
      return this.getCookie(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Gagal mengambil refresh token:', error);
      return null;
    }
  }

  /**
   * UPDATE - Memperbarui access token
   */
  updateAccessToken(newAccessToken: string, options?: Partial<CookieOptions>): void {
    const cookieOptions = { ...this.defaultOptions, ...options };

    try {
      this.setCookie(this.ACCESS_TOKEN_KEY, newAccessToken, cookieOptions);
      console.log('Access token berhasil diperbarui');
    } catch (error) {
      console.error('Gagal memperbarui access token:', error);
      throw new Error('Failed to update access token');
    }
  }

  /**
   * UPDATE - Memperbarui refresh token
   */
  updateRefreshToken(newRefreshToken: string, options?: Partial<CookieOptions>): void {
    const cookieOptions = { ...this.defaultOptions, ...options };

    try {
      this.setCookie(this.REFRESH_TOKEN_KEY, newRefreshToken, cookieOptions);
      console.log('Refresh token berhasil diperbarui');
    } catch (error) {
      console.error('Gagal memperbarui refresh token:', error);
      throw new Error('Failed to update refresh token');
    }
  }

  /**
   * DELETE - Menghapus semua token
   */
  clearTokens(): void {
    try {
      this.deleteCookie(this.ACCESS_TOKEN_KEY);
      this.deleteCookie(this.REFRESH_TOKEN_KEY);
      this.deleteCookie(this.TOKEN_EXPIRES_KEY);
      this.deleteCookie(this.TOKEN_TYPE_KEY);
      console.log('Semua token berhasil dihapus');
    } catch (error) {
      console.error('Gagal menghapus token:', error);
      throw new Error('Failed to clear tokens');
    }
  }

  /**
   * DELETE - Menghapus hanya access token
   */
  clearAccessToken(): void {
    try {
      this.deleteCookie(this.ACCESS_TOKEN_KEY);
      console.log('Access token berhasil dihapus');
    } catch (error) {
      console.error('Gagal menghapus access token:', error);
      throw new Error('Failed to clear access token');
    }
  }

  /**
   * Utility - Mengecek apakah token sudah expired
   */
  isTokenExpired(): boolean {
    try {
      const expiresAt = this.getCookie(this.TOKEN_EXPIRES_KEY);
      
      if (!expiresAt) {
        return false; // Jika tidak ada expiry, anggap belum expired
      }

      const expiryTime = parseInt(expiresAt);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      
      return currentTime >= expiryTime;
    } catch (error) {
      console.error('Gagal mengecek expiry token:', error);
      return true; // Jika ada error, anggap expired untuk keamanan
    }
  }

  /**
   * Utility - Mengecek apakah token valid (ada dan belum expired)
   */
  isTokenValid(): boolean {
    try {
      const token = this.getAccessToken();
      if (!token) return false;

      const isExpired = this.isTokenExpired();
      return !isExpired;
    } catch (error) {
      console.error('Gagal mengecek validitas token:', error);
      return false;
    }
  }

  /**
   * Utility - Mendapatkan waktu expiry dalam format Date
   */
  getTokenExpiryDate(): Date | null {
    try {
      const expiresAt = this.getCookie(this.TOKEN_EXPIRES_KEY);
      
      if (!expiresAt) {
        return null;
      }

      return new Date(parseInt(expiresAt) * 1000); // Convert from seconds to milliseconds
    } catch (error) {
      console.error('Gagal mengambil tanggal expiry:', error);
      return null;
    }
  }

  /**
   * Utility - Mendapatkan waktu remaining sampai token expired (dalam detik)
   */
  getTokenRemainingTime(): number | null {
    try {
      const expiresAt = this.getCookie(this.TOKEN_EXPIRES_KEY);
      
      if (!expiresAt) {
        return null;
      }

      const expiryTime = parseInt(expiresAt);
      const currentTime = Math.floor(Date.now() / 1000);
      
      const remaining = expiryTime - currentTime;
      return remaining > 0 ? remaining : 0;
    } catch (error) {
      console.error('Gagal mengambil waktu remaining token:', error);
      return null;
    }
  }

  /**
   * Utility - Auto refresh token jika mendekati expired
   */
  async autoRefreshToken(
    refreshTokenFunction: (refreshToken: string) => Promise<TokenData>,
    thresholdMinutes: number = 5
  ): Promise<boolean> {
    try {
      if (!this.isTokenValid()) {
        console.log('Token sudah tidak valid');
        return false;
      }

      const remainingTime = this.getTokenRemainingTime();
      if (!remainingTime) {
        console.log('Tidak dapat menentukan waktu expiry token');
        return false;
      }

      const thresholdSeconds = thresholdMinutes * 60;
      
      if (remainingTime <= thresholdSeconds) {
        console.log(`Token akan expired dalam ${remainingTime} detik, melakukan refresh...`);
        
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
          console.error('Refresh token tidak tersedia');
          return false;
        }

        const newTokenData = await refreshTokenFunction(refreshToken);
        this.setToken(newTokenData);
        
        console.log('Token berhasil di-refresh');
        return true;
      }

      return false; // Tidak perlu refresh
    } catch (error) {
      console.error('Gagal melakukan auto refresh token:', error);
      return false;
    }
  }
}

// Export instance singleton
export const clientTokenManager = new ClientTokenManager();

// Export class untuk custom usage
export default ClientTokenManager;