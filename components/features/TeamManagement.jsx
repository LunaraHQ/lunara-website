// components/features/TeamManagement.jsx
import React from 'react';

export default function TeamManagement({ user, isAdmin }) {
  return (
    <div>
      {isAdmin ? (
        <h2 className="text-xl font-bold">Team Management (Admin)</h2>
      ) : (
        <h2 className="text-xl font-bold">Team Management (Employee)</h2>
      )}
      <p>Coming soon: Team scheduling and clock in/out.</p>
    </div>
  );
}
