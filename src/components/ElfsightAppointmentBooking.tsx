import { useEffect } from 'react';
import { ensureElfsightPlatform } from '../lib/elfsight';

/** Elfsight Appointment Booking | Marc Joy Consulting */
const APPOINTMENT_CLASS = 'elfsight-app-23395758-0f8f-4b5f-a389-ed9e56360ad8';

export function ElfsightAppointmentBooking() {
  useEffect(() => {
    ensureElfsightPlatform();
  }, []);

  return (
    <section
      className="py-16 md:py-24 px-8 md:px-24 bg-surface-container-lowest border-t border-white/5"
      aria-label="Book an appointment"
    >
      <div className="max-w-7xl mx-auto">
        <div className={APPOINTMENT_CLASS} data-elfsight-app-lazy />
      </div>
    </section>
  );
}
