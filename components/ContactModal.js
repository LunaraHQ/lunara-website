import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: send data to your API
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Contact Us</Button>
      </DialogTrigger>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-background rounded-2xl shadow-lg p-6 w-full max-w-lg"
        >
          <DialogHeader>
            <DialogTitle>Get in Touch</DialogTitle>
            <DialogDescription>
              We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                Name
              </label>
              <Input id="name" placeholder="Your name" required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                Message
              </label>
              <Textarea id="message" placeholder="How can we help?" rows={4} required />
            </div>

            <DialogFooter>
              <Button
