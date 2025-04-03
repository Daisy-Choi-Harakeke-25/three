'use client'
import { auth } from '@/lib/firebase/config'
import ContactUsForm from '@/components/ContactUsForm'
import { useAuthState } from 'react-firebase-hooks/auth'
import React from 'react'
import Link from 'next/link'

 const ContactUs = () => {
  const [user] = useAuthState(auth)
  return (
    <div>
      <h1>Contact us</h1>
      <ContactUsForm />
      <p>{user && <Link href="/contactUs/contactUsAdmin">Manage Contact Us</Link>}</p>
        <p></p>
    </div>
  )
}
export default ContactUs