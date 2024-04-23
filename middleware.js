export {default} from "next-auth/middleware";
import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export  async function middleware(req) {
  const session = await getSession({ req })

  if (!session) {
    return NextResponse.redirect('/')
  }

  // If the user is authenticated, continue to the requested page
  return NextResponse.next()
}
/*export function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/_next')) {
      const locale = request.nextUrl.locale || i18n.defaultLocale
      request.nextUrl.searchParams.set('lang', locale)
      request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, '')
      return NextResponse.rewrite(request.nextUrl)
    }
    return NextResponse.next()
  }
*/
export const config = {matcher:["/homestay/:path*",'/user/:path*']};