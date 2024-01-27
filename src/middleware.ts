import { url } from 'inspector';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
     const path = request.nextUrl.pathname;
     const isPublicPath = path === '/signup' || path === '/login'
     const token = request.cookies.get("userToken")?.value

     if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
     }
     if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
     } 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*'
  ],
}