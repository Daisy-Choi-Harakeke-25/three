'use client'

import { ContactUs } from '@/models/Model'
import { collection, getDocs } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/config'

const ContactUsAdmin = () => {
  const [contactUs, setContactUs] = useState<ContactUs[]>([])

  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contactUs'))
        const lists: ContactUs[] = querySnapshot.docs.map(
          (doc) => doc.data() as ContactUs
        )
        setContactUs(lists)
      } catch (error) {
        console.error('Error fetching received contact us:', error)
      }
    }
    fetchContactUs()
  }, [])
  return (
    <div className='text-center'>
      <h1 className='text-[40px] text-[#009B64] font-bold'>Received Massage</h1>
      <div className='flex flex-row gap-20 justify-center text-[30px]'>
      <p>Subject</p>
      <p>Description</p>
      <p>Name</p>
      <p>Email</p>
      </div>
      {contactUs.map((item) => (
        <div className='flex flex-row gap-20 justify-center'>
          <p>{item.subject}</p>

          <p>{item.description}</p>

          <p>{item.name}</p>

          <p>{item.email}</p>

          {/* <p>{item.date.getDate()}</p> */}
        </div>
      ))}
    </div>
  )
}

export default ContactUsAdmin
