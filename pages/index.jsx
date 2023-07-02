import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import { getSession, signOut, useSession } from "next-auth/react"
import { redirect } from 'next/dist/server/api-utils'
export default function Home() {
  const {data : session} = useSession()
  const handleSingout = () => {
    signOut()
  }
  console.log(session);
  return (
    <main>
    <Head>
      <title>Home</title>
    </Head>

    {session ? AuthorizedUser({session, handleSingout}) : Guest()}
    </main>
  )
}

export const Guest = () => {
  return (
    <div>Guest Page</div>
  )
}
export const AuthorizedUser = ({session,handleSingout}) => {
  return (
    <div>
      <h2>Authorized User Page</h2>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      <button onClick={handleSingout}>signOut</button>
    </div>
  )
}

export const getServerSideProps = async({req}) => {
  const session = await getSession({req})

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: {session}
  }
}