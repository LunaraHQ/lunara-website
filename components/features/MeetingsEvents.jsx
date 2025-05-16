// components/features/MeetingsEvents.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function MeetingsEvents({ user, isAdmin }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  })

  // Load events from Supabase
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true })
      if (error) console.error('Error fetching events:', error)
      else setEvents(data)
      setLoading(false)
    })()
  }, [])

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  // Admin: create new event
  const handleCreate = async (e) => {
    e.preventDefault()
    setActionLoading(true)
    const { title, description, date, time } = form
    const start_time = new Date(`${date}T${time}`)
    const { error } = await supabase
      .from('events')
      .insert([{ title, description, start_time }])
    if (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event.')
    } else {
      // Refresh list
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true })
      setEvents(data)
      setForm({ title: '', description: '', date: '', time: '' })
    }
    setActionLoading(false)
  }

  // User: join (RSVP / clock in)
  const handleJoin = async (eventId) => {
    setActionLoading(true)
    const { error } = await supabase
      .from('event_attendance')
      .insert([{ event_id: eventId, user_id: user.id }])
    if (error) {
      console.error('Error joining event:', error)
      alert('Failed to join event.')
    } else {
      alert('You have joined this event!')
    }
    setActionLoading(false)
  }

  return (
    <div className="space-y-8 text-white">
      {/* Admin Interface */}
      {isAdmin && (
        <section className="bg-black/70 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1">Time</label>
                <input
                  name="time"
                  type="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={actionLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {actionLoading ? 'Creating…' : 'Create Event'}
            </button>
          </form>
        </section>
      )}

      {/* Event List (both admin & user) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        {loading ? (
          <p>Loading events…</p>
        ) : events.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((evt) => (
              <li
                key={evt.id}
                className="flex justify-between items-center bg-black/60 p-4 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{evt.title}</h3>
                  <p className="text-gray-300 text-sm">
                    {new Date(evt.start_time).toLocaleString()}
                  </p>
                </div>
                {!isAdmin && (
                  <button
                    onClick={() => handleJoin(evt.id)}
                    disabled={actionLoading}
                    className="bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {actionLoading ? 'Joining…' : 'Join'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
