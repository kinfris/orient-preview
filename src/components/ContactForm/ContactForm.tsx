'use client'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import styles from './contactForm.module.scss'
import 'react-phone-input-2/lib/style.css'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]+$/, 'Name can only contain Latin letters and spaces')
    .required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s-]+$/, 'Invalid phone number format')
    .required('Phone number is required'),
  message: yup.string().required('Please enter your request'),
})

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Email sent successfully!')
        reset() // Clear form after submission
      } else {
        setMessage(result.error || 'Failed to send email.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Contact us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input {...register('name')} placeholder="Enter your name" />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input {...register('email')} placeholder="Enter your email" />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Phone</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^\+?[0-9\s-]+$/,
                message: 'Invalid phone number format',
              },
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={'gb'}
                enableSearch={true}
                placeholder="Enter your phone"
                containerClass={styles.phoneContainer}
                inputClass={styles.phoneInput}
                buttonClass={styles.phoneButton}
                dropdownClass={styles.phoneDropdown}
              />
            )}
          />
          {errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Your Request</label>
          <textarea {...register('message')} placeholder="How we can help you?" />
          {errors.message && <p className={styles.errorMessage}>{errors.message.message}</p>}
        </div>

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
        {message && <p className={styles.successMessage}>{message}</p>}
      </form>
    </div>
  )
}
