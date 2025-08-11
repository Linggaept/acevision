import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { tokenManager } from '@/utils/tokenManager';

export async function requireAuth() {
  const token = await tokenManager.getAccessToken();
  const isValid = await tokenManager.isTokenValid();
  
  if (!token || !isValid) {
    redirect('/signin');
  }
  
  return token;
}

export async function getServerToken() {
  return await tokenManager.getToken();
}

export async function requireRole(allowedRoles: string[]) {
  const token = await requireAuth();
  
  // Decode token untuk mendapatkan role (ini tergantung struktur JWT Anda)
  // Contoh implementasi sederhana:
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;
    
    if (!allowedRoles.includes(userRole)) {
      redirect('/unauthorized');
    }
    
    return { token, role: userRole };
  } catch (error) {
    console.error('Error decoding token:', error);
    redirect('/signin');
  }
}