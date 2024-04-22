'use client';
import {SessionProvider, useSession} from "next-auth/react"

const AuthProvider = ({children, pageProps}) => {
  
  let session = pageProps && pageProps.session;
  if (session){
    session = {
      ...session,
       user: {
          ...session.user,
          _id: pageProps.sessionProps.user._id,
          gender: pageProps.sessionProps.user.gender,
       }
    };
  }
  
  return (

    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider