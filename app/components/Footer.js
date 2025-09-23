'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MapPin, Phone, Mail, ChevronDown, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const COPYRIGHT_YEAR = 2025
  const [open, setOpen] = useState({ company: false, legal: false, contact: false })
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  return (
    <footer>
      <div className="bg-gray-600 py-4 text-white text-lg xl:text-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden py-4 space-y-4">
            <div>
              <div className="w-56 mb-4">
                <Image
                  src="/palmside-logo-transparent.png"
                  alt="PalmSide logo"
                  width={224}
                  height={40}
                  priority
                  quality={100}
                  className="block h-auto w-full drop-shadow-sm md:drop-shadow"
                />
              </div>
              <p className="text-left leading-tight sm:leading-tight">
                Your trusted partner in real estate services.
              </p>
              <div className="mt-3 flex items-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/palmside.es?igsh=OTJtY2h4cGxnbnJn&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/jeanette-bakacak-50b965376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.tiktok.com/@palmside.sl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.45v13.67a2.54 2.54 0 0 1-5.05 0c0-1.4 1.12-2.53 2.5-2.53.7 0 1.36.28 1.85.74l.76-.76a4.47 4.47 0 0 0-2.61-.84 4.5 4.5 0 0 0-4.5 4.5c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5V9.4a8.16 8.16 0 0 0 4.3 1.1V6.69a4.85 4.85 0 0 1-1.05-.01z"/></svg>
                </a>
              </div>
            </div>

            <div className="border-t border-white/20 pt-3">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left text-xl font-semibold"
                onClick={() => toggle('company')}
                aria-expanded={open.company}
              >
                <span>Company</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${open.company ? 'rotate-180' : ''}`} />
              </button>
              {open.company && (
                <ul className="mt-3 space-y-2">
                  <li><Link href="/about" className="hover:text-[#B59A3D]">About us</Link></li>
                  <li><Link href="/services" className="hover:text-[#B59A3D]">Services</Link></li>
                </ul>
              )}
            </div>

            <div className="border-t border-white/20 pt-3">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left text-xl font-semibold"
                onClick={() => toggle('legal')}
                aria-expanded={open.legal}
              >
                <span>Legal</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${open.legal ? 'rotate-180' : ''}`} />
              </button>
              {open.legal && (
                <ul className="mt-3 space-y-2">
                  <li><Link href="/site-notice" className="hover:text-[#B59A3D]">Site Notice</Link></li>
                  <li><Link href="/terms" className="hover:text-[#B59A3D]">Terms &amp; Conditions</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-[#B59A3D]">Privacy Policy</Link></li>
                </ul>
              )}
            </div>

            <div className="border-t border-white/20 pt-3">
              <button
                type="button"
                className="w-full flex items-center justify-between text-left text-xl font-semibold"
                onClick={() => toggle('contact')}
                aria-expanded={open.contact}
              >
                <span>Contact</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${open.contact ? 'rotate-180' : ''}`} />
              </button>
              {open.contact && (
                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Carrer%20de%20Ametler%203%20%E2%80%93%201B%2C%20ES-07609%20Llucmajor%2C%20Mallorca%20%E2%80%93%20Illes%20Balears"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B59A3D] inline-flex items-start gap-2"
                    >
                      <MapPin className="w-4 h-4 mt-1" />
                      <span>Carrer de Ametler 3 – 1B, ES-07609 Llucmajor, <br /> Mallorca – Illes Balears</span>
                    </a>
                  </li>
                  <li>
                    <div className="inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+34 609 06 93 67</span>
                    </div>
                  </li>
                  <li>
                    <div className="inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+49 176 534 85 055</span>
                    </div>
                  </li>
                  <li>
                    <a href="mailto:info@palmside.es" className="hover:text-[#B59A3D] inline-flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>info@palmside.es</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-8 py-6">
            <div>
              <div className="w-56 mb-4">
                <Image
                  src="/palmside-logo-transparent.png"
                  alt="PalmSide logo"
                  width={224}
                  height={40}
                  priority
                  quality={100}
                  className="block h-auto w-full drop-shadow-sm md:drop-shadow"
                />
              </div>
              <p className="text-left leading-tight sm:leading-tight">
                Your trusted partner in real estate services.
              </p>
              <div className="mt-3 flex items-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/palmside.es?igsh=OTJtY2h4cGxnbnJn&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/jeanette-bakacak-50b965376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.tiktok.com/@palmside.sl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.45v13.67a2.54 2.54 0 0 1-5.05 0c0-1.4 1.12-2.53 2.5-2.53.7 0 1.36.28 1.85.74l.76-.76a4.47 4.47 0 0 0-2.61-.84 4.5 4.5 0 0 0-4.5 4.5c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5V9.4a8.16 8.16 0 0 0 4.3 1.1V6.69a4.85 4.85 0 0 1-1.05-.01z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <div>
                <h2 className="relative inline-block text-2xl pb-3 mb-4 border-b-4 border-transparent hover:text-[#B59A3D] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-[#B08D57] after:via-[#C5A880] after:to-emerald-600">
                  Company
                </h2>
              </div>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-[#B59A3D]">About us</Link></li>
                <li><Link href="/services" className="hover:text-[#B59A3D]">Services</Link></li>
              </ul>
            </div>
            <div>
              <div>
                <h2 className="relative inline-block text-2xl pb-3 mb-4 border-b-4 border-transparent hover:text-[#B59A3D] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-[#B08D57] after:via-[#C5A880] after:to-emerald-600">Legal</h2>
              </div>
              <ul className="space-y-2">
                <li><Link href="/site-notice" className="hover:text-[#B59A3D]">Site Notice</Link></li>
                <li><Link href="/terms" className="hover:text-[#B59A3D]">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-[#B59A3D]">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <div>
                <Link href="/contact" className="inline-block">
                  <h2 className="relative inline-block text-2xl pb-3 mb-4 border-b-4 border-transparent hover:text-[#B59A3D] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-[#B08D57] after:via-[#C5A880] after:to-emerald-600">
                    Contact
                  </h2>
                </Link>
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Carrer%20de%20Ametler%203%20%E2%80%93%201B%2C%20ES-07609%20Llucmajor%2C%20Mallorca%20%E2%80%93%20Illes%20Balears"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B59A3D] inline-flex items-start gap-2"
                  >
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>Carrer de Ametler 3 – 1B, ES-07609 Llucmajor, <br /> Mallorca – Illes Balears</span>
                  </a>
                </li>
                <li>
                  <div className="inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+34 609 06 93 67</span>
                   
                  </div>
                </li>
                <li>
                  <div className="inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+49 176 534 85 055</span>
                  </div>
                </li>
                <li>
                  <a href="mailto:info@palmside.es" className="hover:text-[#B59A3D] inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@palmside.es</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#B08D57] via-[#C5A880] to-emerald-600 py-4 text-gray-900 text-lg xl:text-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Copyright © {COPYRIGHT_YEAR} Palmside S.L. All Rights Reserved.
            </div>
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Palmside S.L.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
