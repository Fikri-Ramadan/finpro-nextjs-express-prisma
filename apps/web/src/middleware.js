import { NextResponse } from 'next/server';
import { getCookies } from 'next-client-cookies/server';

const protectedRoutes = ['/example', '/event/create', '/dashboard'];
const organizerOnly = ['/event/create', '/dashboard'];

export default async function middleware(req) {
  if (req.nextUrl.pathname.includes('/login')) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    const cookies = getCookies();
    const token = cookies.get('token');

    if (token) {
      return NextResponse.redirect(absoluteURL.toString());
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/verifyToken', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return NextResponse.next();
      }

      return NextResponse.redirect(absoluteURL.toString());
    } catch (error) {
      console.log(error);
      return NextResponse.next();
    }
  }

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    const cookies = getCookies();
    const token = cookies.get('token');

    if (!token) {
      return NextResponse.redirect(absoluteURL.toString());
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/verifyToken', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return NextResponse.redirect(absoluteURL.toString());
      }

      const { results } = await res.json();

      if (
        organizerOnly.includes(req.nextUrl.pathname) &&
        results.role !== 'ORGANIZER'
      ) {
        return NextResponse.redirect(absoluteURL.toString());
      }

      NextResponse.next();
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
