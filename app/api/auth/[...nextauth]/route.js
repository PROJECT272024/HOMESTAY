import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import connectDB from "@/config/database";
import newUser from "@/app/model/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials:{},
            async authorize(credentials){
                const {username,password} = credentials;
                console.log(credentials)
                try {
                    await connectDB();
                    let user = null
                    if(username.includes("@")){
                        
                        user = await newUser.findOne({email:username})
                    }else{
                        user = await newUser.findOne({phone:username})
                    }
                    if(!user){
                        return null;
                    }
                    console.log(user)
                    const passwordMatched = await bcrypt.compare(password,user.password);
                    if(!passwordMatched){
                        return null;
                    }
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    };
                } catch (error) {
                    
                    console.log(error)
                    return null;
                }
            }
        })
    ],
    session:{
        strategy:"jwt" 
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/"
    },
    callbacks: {
      async session ({ session, token, user }) {
        const sanitizedToken = Object.keys(token).reduce((p, c) => {
          // strip unnecessary properties
          if (
            c !== "iat" &&
            c !== "exp" &&
            c !== "jti" &&
            c !== "apiToken"
          ) {
            return { ...p, [c]: token[c] }
          } else {
            return p
          }
        }, {})
        return { ...session, user: sanitizedToken, apiToken: token.apiToken }
      },
      async jwt ({ token, user, account, profile }) {
        if (typeof user !== "undefined") {
          // user has just signed in so the user object is populated
          return user 
        }
        return token
      }
    }

};
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}


