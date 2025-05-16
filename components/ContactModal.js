import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactModal({
  children = 'Contact Us',
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalOpen

  const open = () => {
    if (isControlled) return onOpen?.()
    setInternalOpen(true)
  }
  const close = () => {
    if (isControlled) return onClose?.()
    setInternalOpen(false)
    setSent(false)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
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
    setLoading(false)
    if (res.ok) setSent(true)
    else alert('Oops! Something went wrong.')
  }

  return (
    <>
      {!isControlled && (
        <span
          onClick={open}
          className="cursor-pointer hover:underline text-purple-400"
        >
          {children}
        </span>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                relative
                bg-gradient-to-br from-purple-800/90 via-purple-950/95 to-black/90
                border border-purple-600/30
                rounded-3xl
                shadow-2xl
                p-0
                w-full max-w-lg
                overflow-hidden
                glassy
              "
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.33 }}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="
                  absolute top-5 right-5
                  rounded-full p-2
                  bg-black/40 text-purple-200 hover:bg-purple-700/70 transition
                  shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600
                  z-20
                "
              >
                <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="px-10 pt-10 pb-8 text-center">
                <img
                  src="/images/lunara-logo.png"
                  alt="Lunara"
                  className="mx-auto mb-4 h-14 w-14 rounded-2xl shadow-xl bg-black/20"
                  style={{ border: '2px solid #6E41FF', background: '#120e26' }}
                />
                <h2 className="text-2xl font-bold text-purple-100 mb-2 tracking-tight">
                  Contact Lunara
                </h2>
                <p className="text-purple-300 mb-7 text-base">
                  Have a question? Send us a message and we’ll reply shortly.
                </p>

                {sent ? (
                  <div className="py-8 text-green-300 text-lg font-semibold animate-in fade-in">
                    Message sent! Thank you for contacting Lunara 🚀
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-2 rounded-xl border-none bg-purple-950/60 text-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2 rounded-xl border-none bg-purple-950/60 text-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-purple-200 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="How can we help?"
                        required
                        className="w-full px-4 py-2 rounded-xl border-none bg-purple-950/60 text-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                      />
                    </div>
                    <div className="pt-2 text-right">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-xl transition disabled:opacity-50"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
