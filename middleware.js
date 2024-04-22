export {default} from "next-auth/middleware";
import { NextResponse } from 'next/server';

export function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/_next')) {
      const locale = request.nextUrl.locale || i18n.defaultLocale
      request.nextUrl.searchParams.set('lang', locale)
      request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, '')
      return NextResponse.rewrite(request.nextUrl)
    }
    return NextResponse.next()
  }

export const config = {matcher:["/homestay/:path*",'/api/:path*','/user/:path*']};