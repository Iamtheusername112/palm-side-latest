'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { useContactContext } from '../contexts/ContactContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageBanner from '../components/PageBanner'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const { addNewContact } = useContactContext()

  // Services for the subject dropdown
  const services = [
    {
      name: 'Property Management',
      description: 'Comprehensive property management services',
      value: 'property-management',
    },
    {
      name: 'Real Estate Investment',
      description: 'Strategic investment opportunities',
      value: 'real-estate-investment',
    },
    {
      name: 'Property Development',
      description: 'Custom development solutions',
      value: 'property-development',
    },
    {
      name: 'Consulting Services',
      description: 'Expert real estate consulting',
      value: 'consulting-services',
    },
    {
      name: 'Legal Services',
      description: 'Real estate legal expertise',
      value: 'legal-services',
    },
    {
      name: 'General Inquiry',
      description: 'Other questions or information',
      value: 'general-inquiry',
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })

        // Update contact counts in context
        addNewContact()

        toast.success('Message sent successfully!', {
          description:
            "Thank you for contacting us. We'll get back to you soon.",
        })
        // Reset form after successful submission
        setTimeout(() => {
          setSubmitStatus('')
        }, 5000)
      } else {
        setSubmitStatus('error')
        toast.error('Failed to send message', {
          description:
            result.error || 'Please try again or contact us directly.',
        })
        console.error('Submission error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.',
      })
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-green-50'>
      {/* Navbar */}
      <Navbar />

      <PageBanner
        title='Get In Touch'
        subtitle="Ready to start your real estate journey? We're here to help you find your perfect property."
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid lg:grid-cols-2 gap-12 items-start'>
          {/* Contact Form */}
          <div className='space-y-8'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Send us a Message
              </h2>
              <p className='text-gray-600 text-lg'>
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className='bg-green-50 border border-green-200 rounded-xl p-8 text-center'>
                <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
                <h3 className='text-2xl font-semibold text-green-800 mb-2'>
                  Message Sent Successfully!
                </h3>
                <p className='text-green-600'>
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className='bg-red-50 border border-red-200 rounded-xl p-8 text-center'>
                <div className='h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>⚠️</span>
                </div>
                <h3 className='text-2xl font-semibold text-red-800 mb-2'>
                  Submission Failed
                </h3>
                <p className='text-red-600'>
                  There was an error sending your message. Please try again.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                      placeholder='Enter your email'
                    />
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200'
                      placeholder='Enter your phone number'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Service Inquiry *
                    </label>
                    <div className='relative'>
                      <select
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer appearance-none'
                      >
                        <option value=''>Select a service</option>
                        {services.map((service, index) => (
                          <option
                            key={index}
                            value={service.value}
                            className='py-2'
                          >
                            {service.name}
                          </option>
                        ))}
                      </select>
                      <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                        <ChevronDown className='h-5 w-5 text-gray-400' />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none'
                    placeholder='Tell us more about your inquiry...'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-amber-700 to-green-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-amber-800 hover:to-green-800 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className='h-5 w-5' />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className='space-y-6'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Contact Information
              </h2>
              <p className='text-gray-600 text-lg'>
                Reach out to us through any of these channels. We're always here
                to help.
              </p>
            </div>

            <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full'>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Get In Touch
              </h3>

              {/* Email */}
              <div className='mb-6'>
                <div className='flex items-center mb-3'>
                  <div className='w-10 h-10 bg-gradient-to-r from-amber-700 to-green-700 rounded-lg flex items-center justify-center text-white mr-3'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <h4 className='text-lg font-semibold text-gray-900'>
                    Email Us
                  </h4>
                </div>
                <div className='ml-13 space-y-1'>
                  <a href='mailto:info@palmside.es' className='text-gray-600 hover:text-yellow-700'>
                    info@palmside.es
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className='mb-6'>
                <div className='flex items-center mb-3'>
                  <div className='w-10 h-10 bg-gradient-to-r from-amber-700 to-green-700 rounded-lg flex items-center justify-center text-white mr-3'>
                    <Phone className='h-5 w-5' />
                  </div>
                  <h4 className='text-lg font-semibold text-gray-900'>
                    Call Us
                  </h4>
                </div>
                <div className='ml-13 space-y-1'>
                  <p className='text-gray-600'>+49 176 534 85 055</p>
                  <p className='text-gray-600'>+34 609 06 93 67</p>
                </div>
              </div>

              {/* Address */}
              <div className='mb-6'>
                <div className='flex items-center mb-3'>
                  <div className='w-10 h-10 bg-gradient-to-r from-amber-700 to-green-700 rounded-lg flex items-center justify-center text-white mr-3'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <h4 className='text-lg font-semibold text-gray-900'>
                    Visit Us
                  </h4>
                </div>
                <div className='ml-13 space-y-1'>
                  <p className='text-gray-600'>Carrer de l'Ametler 3 – 1B, ES-07609 Llucmajor Mallorca – Illes Balears</p>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='mt-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Find Us on the Map</h2>
          <p className='text-gray-600 mb-4'>Our office in Llucmajor, with Palma de Mallorca Airport visible on the map.</p>
          <div className='rounded-xl overflow-hidden shadow-lg h-[360px]'>
            <iframe
              title='Palmside Office Map'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              src={'https://www.google.com/maps?q=Carrer%20de%20l\'Ametler%203%2C%2007609%20Llucmajor%2C%20Illes%20Balears&z=11&output=embed'}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ContactPage
