import {DefaultSesion , DefaultUser} from "next-auth";
import {JWT , DefaultJWT} from "next-auth/jwt";

declare module "next-auth" {
   interface Session {
      user: {
         id : string,
         userName : string,
         role : string,
      } & DefaultSesion
   }

   interface User extends DefaultUser {
      role : string,
      userName : string,
   }
}

declare module "next-auth/jwt" {
   interface JWT extends DefaultJWT {
      role : string
   }
}