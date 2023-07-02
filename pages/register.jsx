import React from 'react'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import {register_validate} from '../lib/validation'
import { useRouter } from 'next/router'
const register = () => {
  const router = useRouter()

  const onSubmit = async(values) => {
    const options = {
      method: 'POST', 
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify(values)
    }
    await fetch('http://localhost:3000/api/auth/signup', options).then((res) => res.json()).then((data) => {
      if (data) router.push('http://localhost:3000')
    })
  }
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: register_validate,
    onSubmit
  })
  return (
    <Layout>
        <div className='text-center p-2'>
        <h2 className='font-bold text-lg'>Register</h2>
        <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>

        <form action="" className='w-3/4 mx-auto px-5 py-10 gap-2 flex flex-col' onSubmit={formik.handleSubmit}>
        <input className='p-2' type="text" placeholder='username' label="username" name='username' {...formik.getFieldProps('username')}/>
        {formik.errors.username && formik.touched.username ? <span>{formik.errors.username}</span> : <></>}

        <input className='p-2' type="email" placeholder='email' label="email" name='email' {...formik.getFieldProps('email')}/>
        {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></>}
        <input className='p-2' type="password" placeholder='password' label="password" name='password' {...formik.getFieldProps('password')}/>
        {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></>}

        <input className='p-2' type="password" placeholder='Confirm password' label="password" name='cpassword' {...formik.getFieldProps('cpassword')}/>
        {formik.errors.cpassword && formik.touched.cpassword ? <span>{formik.errors.cpassword}</span> : <></>}
        <button className='bg-green-200' type='submit'>Register</button> 
        </form>
    </Layout>
  )
}

export default register