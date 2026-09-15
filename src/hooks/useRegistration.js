import { useState, useCallback } from 'react';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

// WOW_ENABLED: true = Firebase, false = localStorage only
const WOW_ENABLED = true;

export function useRegistration() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  const checkDuplicate = async (eventId, email) => {
    if (!WOW_ENABLED) {
      // Fallback: check localStorage
      const saved = JSON.parse(localStorage.getItem('nirvan26_regs') || '[]');
      return saved.some(r => r.eventId === eventId && r.email === email);
    }
    try {
      const q = query(
        collection(db, 'registrations'),
        where('email', '==', email),
        where('eventId', '==', eventId)
      );
      const snap = await getDocs(q);
      return !snap.empty;
    } catch {
      // If Firestore check fails, fall back to localStorage check
      const saved = JSON.parse(localStorage.getItem('nirvan26_regs') || '[]');
      return saved.some(r => r.eventId === eventId && r.email === email);
    }
  };

  const submitRegistration = useCallback(async (eventId, formData) => {
    setSubmitting(true);
    setError(null);

    try {
      const isDuplicate = await checkDuplicate(eventId, formData.email);
      if (isDuplicate) {
        throw new Error('You have already registered for this event!');
      }

      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let tid = 'N26-';
      for (let i = 0; i < 6; i++) tid += chars[Math.floor(Math.random() * chars.length)];

      const regData = {
        userId: user?.uid || 'anonymous',
        eventId,
        ...formData,
        ticketId: tid,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      if (WOW_ENABLED) {
        console.log('[Firebase] Attempting write to registrations...', regData);
        const docRef = await addDoc(collection(db, 'registrations'), {
          ...regData,
          userId: user?.uid || 'anonymous',
          createdAt: serverTimestamp(),
        });
        console.log('[Firebase] ✅ Write SUCCESS — doc ID:', docRef.id);
      } else {
        // WOW_ENABLED=false: localStorage only
        const saved = JSON.parse(localStorage.getItem('nirvan26_regs') || '[]');
        localStorage.setItem('nirvan26_regs', JSON.stringify([...saved, regData]));
      }

      setTicketId(tid);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [user]);

  const reset = useCallback(() => {
    setSuccess(false);
    setError(null);
    setTicketId(null);
  }, []);

  return { submitRegistration, submitting, success, error, ticketId, reset };
}
