// components/features/MeetingsEvents.jsx
import React from 'react';

export default function MeetingsEvents({ user, isAdmin }) {
  return (
    <div>
      {isAdmin ? (
        <h2 className="text-xl font-bold">Admin Meetings &amp; Events Dashboard</h2>
      ) : (
        <h2 className="text-xl font-bold">Your Meetings &amp; Events</h2>
      )}
      <p>Coming soon: full Meetings &amp; Events interface.</p>
    </div>
  );
}
