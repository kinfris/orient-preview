import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const getCurrentTime = () => {
  return new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow', // Укажи нужный тебе часовой пояс
    hour12: false, // 24-часовой формат
  })
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()
    const timeSent = getCurrentTime()

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Change for other providers (Outlook, SMTP, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Sender email
        pass: process.env.EMAIL_PASS, // App Password
      },
    })

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Новая заявка с сайта',
      text: `📩 Новая заявка:
        
    📝 Имя: ${name}
    📧 Email: ${email}
    📞 Телефон: ${phone}
    💬 Сообщение: ${message}
    
    ⏰ Время отправки: ${timeSent}
        `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
