import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/Schema";
import {compare} from 'bcryptjs'
export default NextAuth({
  providers: [
      GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
      CredentialsProvider({
        name: 'Credentials',
        async authorize(credential, req) {
          connectMongo().catch(error => {error: 'Connection Failed!'})

          const result = await Users.findOne({email : credential.email})
          if(!result) {
            throw new Error ('No user found')
          }

          const checkPassword = await compare(credential.password, result.password)
          if (!checkPassword || result.email !== credential.email) {
            throw new Error ('user password did not match')
          }
          return result
        }
      })
  ],
  secret: "psvvoJUUT1AlOPqkk32LBqQST4Zd3ElLIRVbdC3WgGA="
})
