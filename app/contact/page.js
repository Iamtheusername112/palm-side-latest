'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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

  const contactInfo = [
    {
      icon: <Mail className='h-6 w-6' />,
      title: 'Email Us',
      details: ['info@palmside.com', 'support@palmside.com'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Phone className='h-6 w-6' />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <MapPin className='h-6 w-6' />,
      title: 'Visit Us',
      details: ['123 Palm Street', 'Miami, FL 33101'],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Clock className='h-6 w-6' />,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 py-20'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in'>
            Get In Touch
          </h1>
          <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
            Ready to start your real estate journey? We're here to help you find
            your perfect property.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid lg:grid-cols-2 gap-16'>
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
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
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
                        className='w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer appearance-none'
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
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                    placeholder='Tell us more about your inquiry...'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2'
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
          <div className='space-y-8'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Contact Information
              </h2>
              <p className='text-gray-600 text-lg'>
                Reach out to us through any of these channels. We're always here
                to help.
              </p>
            </div>

            <div className='space-y-6'>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-white mb-4`}
                  >
                    {info.icon}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                    {info.title}
                  </h3>
                  <div className='space-y-1'>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className='text-gray-600'>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className='bg-white rounded-xl p-6 shadow-lg'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Our Location
              </h3>
              <div className='bg-gray-200 rounded-lg h-64 flex items-center justify-center'>
                <div className='text-center text-gray-500'>
                  <MapPin className='h-12 w-12 mx-auto mb-2' />
                  <p>Interactive Map</p>
                  <p className='text-sm'>123 Palm Street, Miami, FL 33101</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Find quick answers to common questions about our services and
              properties.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {[
              {
                question: 'How quickly do you respond to inquiries?',
                answer:
                  'We typically respond to all inquiries within 24 hours during business days. For urgent matters, we have emergency contact numbers available.',
              },
              {
                question: 'Do you offer virtual property tours?',
                answer:
                  'Yes! We provide virtual tours and video calls for all our properties, making it easy to explore from anywhere in the world.',
              },
              {
                question: 'What areas do you specialize in?',
                answer:
                  'We focus on premium properties in Miami, South Florida, and select international markets. Our expertise covers luxury homes, investment properties, and commercial real estate.',
              },
              {
                question: 'Can you help with financing options?',
                answer:
                  'Absolutely! We work with trusted financial partners and can guide you through various financing options, including traditional mortgages and investment loans.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  {faq.question}
                </h3>
                <p className='text-gray-600'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ContactPage
