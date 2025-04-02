import React from 'react'

 const ContactUs = () => {
  return (
    <div>
      <h1>Contact us</h1>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" required />
        <label htmlFor="message">Message</label>
        <input type="text" id="message" name="message" required />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
}
export default ContactUs