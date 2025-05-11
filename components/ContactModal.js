// components/ContactModal.js
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactModal({
  children = 'Contact Us',
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalOpen

  const open = () => {
    if (isControlled) return onOpen?.()
    setInternalOpen(true)
  }
  const close = () => {
    if (isControlled) return onClose?.()
    setInternalOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) close()
    else alert('Oops! Something went wrong.')
  }

  return (
    <>
      {/* only render a trigger if uncontrolled */}
      {!isControlled && (
        <span onClick={open} className="cursor-pointer hover:underline text-yellow-400">
          {children}
        </span>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={close}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
              <p className="text-gray-600 mb-4">
                We’d love to hear from you. Fill out the form below and we’ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="How can we help?"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
