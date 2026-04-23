import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value; 
  
  const { pathname } = request.nextUrl;

  const isAuthPage = 
    pathname.startsWith('/pages/login') || 
    pathname.startsWith('/pages/register') || 
    pathname.startsWith('/pages/verify') ||
    pathname.startsWith('/pages/forgotpassword');
    
  const isAdminPage = pathname.startsWith('/admin');
  const isPublicPage = pathname === '/'; 

  if (pathname.includes('.') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !isAuthPage && !isPublicPage) {
    const isNextDataRequest = request.headers.get('x-nextjs-data');

    if (!isNextDataRequest) {
      return NextResponse.redirect(new URL('/pages/login', request.url));
    }
  }

  if (isAdminPage && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|tours|favicon.ico).*)'],
};