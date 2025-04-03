'use client'

import { db } from '@/lib/firebase/config'
import { ContactUs } from '@/models/Model'
import { addDoc, collection } from '@firebase/firestore'
import { useState } from 'react'

const ContactUsForm = () => {
  const [form, setForm] = useState<ContactUs>({
    name: '',
    email: '',
    subject: '',
    description: '',
    date: new Date(),
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form) {
      return alert('All fields are required!')
    }

    try {
      await addDoc(collection(db, 'contactUs'), form)
      alert('Submitted!')
      setForm({
        name: '',
        email: '',
        subject: '',
        description: '',
        date: new Date(),
      })
    } catch (error) {
      console.error('Error submitting contactUs', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={form?.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Email"
        value={form?.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        name="subject"
        placeholder="Subject"
        value={form?.subject}
        onChange={handleChange}
        required
      />
      <label htmlFor="message">description</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="description"
        value={form?.description}
        onChange={handleChange}
        required
      />
      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default ContactUsForm
