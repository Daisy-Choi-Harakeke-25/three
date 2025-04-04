export interface Image {
  id: number
  name: string
  imageUrl: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  url: string
}

export interface ContactUs {
  name: string
  email: string
  subject: string
  description: string
  date: Date
}

