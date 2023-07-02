import Layout from '@/components/Layout'
import React from 'react'
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../lib/validation'
import { useRouter } from 'next/router';
const login = () => {
  const router = useRouter()
    const handleSignIn = async() => {
        signIn('github', {callbackUrl: 'http://localhost:3000/'})
    }

    const handleGoogle = async() => {
        signIn('google', {callbackUrl: 'http://localhost:3000/'})
    }
    
    const onSubmit = async(values) => {
      const status = await signIn('credentials', {
        redirect : false,
        email: values.email,
        password : values.password,
        callbackUrl: '/'
      })
      if(status.ok) {
        router.push(status.url)
      }
    }

    const formik = useFormik({
      initialValues : {
        email: '',
        password: ''
      },
      validate: login_validate,
      onSubmit
    })

  return (
    <Layout>
        <div className='p-5 text-center w-3/4 mx-auto flex flex-col justify-center' >
        <p className='font-bold text-lg'>Log In</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      
        <form className='flex flex-col gap-2 p-5' onSubmit={formik.handleSubmit}>
        <input  className='p-2' type='email' placeholder='email' name='email' {...formik.getFieldProps('email')}/>
        {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></>}
        <input className='p-2' name='password' type='password' {...formik.getFieldProps('password')} placeholder='password'/>
        {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></>}

        <button className='bg-gradient'>Log In</button>
        </form>

        <div>
        <button onClick={handleSignIn}>Sign In GitHub</button>

        </div>
        <div>
        <button onClick={handleGoogle}>Sign In Google</button>

        </div>
        </div>
    </Layout>
  )
}

export default login