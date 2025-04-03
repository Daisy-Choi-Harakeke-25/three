'use client'

import { ContactUs } from "@/models/Model"
import { collection, getDocs } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from '@/lib/firebase/config'

const ContactUsAdmin = () => {
const [contactUs, setContactUs] = useState<ContactUs[]>([])

useEffect(() => {
  const fetchContactUs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contactUs'))
      const lists: ContactUs[] = querySnapshot.docs.map((doc) => doc.data() as ContactUs)
      setContactUs(lists)
    } catch (error) {
      console.error('Error fetching received contact us:', error)
    }
  }
  fetchContactUs()
}, [])
  return (
    <div>
      <h1>Received</h1>
      <ol>
    {contactUs.map((item) => (
      <li key={item.name}>
        {item.subject}
        {item.description}
        {item.name}
        {item.email}
        {/* <p>{item.date.getDate()}</p> */}

      </li>
    ))}
    </ol>
    </div>
  )
}

export default ContactUsAdmin