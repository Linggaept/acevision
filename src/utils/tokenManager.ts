// utils/tokenManager.ts
import { cookies } from 'next/headers';

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
}

export interface CookieOptions {
  maxAge?: number; // in seconds
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
  domain?: string;
}

class TokenManager {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly TOKEN_EXPIRES_KEY = 'token_expires';
  private readonly TOKEN_TYPE_KEY = 'token_type';

  // Default cookie options
  private readonly defaultOptions: CookieOptions = {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };

  /**
   * CREATE - Menyimpan token ke cookies
   */
  async setToken(tokenData: TokenData, options?: Partial<CookieOptions>): Promise<void> {
    const cookieOptions = { ...this.defaultOptions, ...options };
    const cookieStore = await cookies();

    try {
      // Set access token
      cookieStore.set(this.ACCESS_TOKEN_KEY, tokenData.access_token, cookieOptions);

      // Set refresh token jika ada
      if (tokenData.refresh_token) {
        cookieStore.set(this.REFRESH_TOKEN_KEY, tokenData.refresh_token, cookieOptions);
      }

      // Set expiry time jika ada
      if (tokenData.expires_at) {
        cookieStore.set(this.TOKEN_EXPIRES_KEY, tokenData.expires_at.toString(), cookieOptions);
      }

      // Set token type jika ada
      if (tokenData.token_type) {
        cookieStore.set(this.TOKEN_TYPE_KEY, tokenData.token_type, cookieOptions);
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
  async getToken(): Promise<TokenData | null> {
    const cookieStore = await cookies();

    try {
      const accessToken = cookieStore.get(this.ACCESS_TOKEN_KEY)?.value;
      
      if (!accessToken) {
        return null;
      }

      const refreshToken = cookieStore.get(this.REFRESH_TOKEN_KEY)?.value;
      const expiresAt = cookieStore.get(this.TOKEN_EXPIRES_KEY)?.value;
      const tokenType = cookieStore.get(this.TOKEN_TYPE_KEY)?.value;

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt ? parseInt(expiresAt) : undefined,
        token_type: tokenType,
      };
    } catch (error) {
      console.error('Gagal mengambil token:', error);
      return null;
    }
  }

  /**
   * READ - Mengambil hanya access token
   */
  async getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    
    try {
      return cookieStore.get(this.ACCESS_TOKEN_KEY)?.value || null;
    } catch (error) {
      console.error('Gagal mengambil access token:', error);
      return null;
    }
  }

  /**
   * READ - Mengambil hanya refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    
    try {
      return cookieStore.get(this.REFRESH_TOKEN_KEY)?.value || null;
    } catch (error) {
      console.error('Gagal mengambil refresh token:', error);
      return null;
    }
  }

  /**
   * UPDATE - Memperbarui access token
   */
  async updateAccessToken(newAccessToken: string, options?: Partial<CookieOptions>): Promise<void> {
    const cookieOptions = { ...this.defaultOptions, ...options };
    const cookieStore = await cookies();

    try {
      cookieStore.set(this.ACCESS_TOKEN_KEY, newAccessToken, cookieOptions);
      console.log('Access token berhasil diperbarui');
    } catch (error) {
      console.error('Gagal memperbarui access token:', error);
      throw new Error('Failed to update access token');
    }
  }

  /**
   * UPDATE - Memperbarui refresh token
   */
  async updateRefreshToken(newRefreshToken: string, options?: Partial<CookieOptions>): Promise<void> {
    const cookieOptions = { ...this.defaultOptions, ...options };
    const cookieStore = await cookies();

    try {
      cookieStore.set(this.REFRESH_TOKEN_KEY, newRefreshToken, cookieOptions);
      console.log('Refresh token berhasil diperbarui');
    } catch (error) {
      console.error('Gagal memperbarui refresh token:', error);
      throw new Error('Failed to update refresh token');
    }
  }

  /**
   * DELETE - Menghapus semua token
   */
  async clearTokens(): Promise<void> {
    const cookieStore = await cookies();

    try {
      cookieStore.delete(this.ACCESS_TOKEN_KEY);
      cookieStore.delete(this.REFRESH_TOKEN_KEY);
      cookieStore.delete(this.TOKEN_EXPIRES_KEY);
      cookieStore.delete(this.TOKEN_TYPE_KEY);
      console.log('Semua token berhasil dihapus');
    } catch (error) {
      console.error('Gagal menghapus token:', error);
      throw new Error('Failed to clear tokens');
    }
  }

  /**
   * DELETE - Menghapus hanya access token
   */
  async clearAccessToken(): Promise<void> {
    const cookieStore = await cookies();

    try {
      cookieStore.delete(this.ACCESS_TOKEN_KEY);
      console.log('Access token berhasil dihapus');
    } catch (error) {
      console.error('Gagal menghapus access token:', error);
      throw new Error('Failed to clear access token');
    }
  }

  /**
   * Utility - Mengecek apakah token sudah expired
   */
  async isTokenExpired(): Promise<boolean> {
    const cookieStore = await cookies();

    try {
      const expiresAt = cookieStore.get(this.TOKEN_EXPIRES_KEY)?.value;
      
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
  async isTokenValid(): Promise<boolean> {
    try {
      const token = await this.getAccessToken();
      if (!token) return false;

      const isExpired = await this.isTokenExpired();
      return !isExpired;
    } catch (error) {
      console.error('Gagal mengecek validitas token:', error);
      return false;
    }
  }

  /**
   * Utility - Mendapatkan waktu expiry dalam format Date
   */
  async getTokenExpiryDate(): Promise<Date | null> {
    const cookieStore = await cookies();

    try {
      const expiresAt = cookieStore.get(this.TOKEN_EXPIRES_KEY)?.value;
      
      if (!expiresAt) {
        return null;
      }

      return new Date(parseInt(expiresAt) * 1000); // Convert from seconds to milliseconds
    } catch (error) {
      console.error('Gagal mengambil tanggal expiry:', error);
      return null;
    }
  }
}

// Export instance singleton
export const tokenManager = new TokenManager();

// Export class untuk custom usage
export default TokenManager;