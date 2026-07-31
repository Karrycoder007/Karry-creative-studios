'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

// 1. Sign up at https://formspree.io, create a form, and paste your form ID below.
//    It looks like: https://formspree.io/f/abcdwxyz
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const ease = [0.65, 0, 0.35, 1] as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            aria-label="Close contact form"
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: 'color-mix(in srgb, var(--ink, #1C1008) 70%, transparent)' }}
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            className="relative w-full max-w-md rounded-md p-8 md:p-10"
            style={{ background: 'var(--bg)', border: '1px solid var(--line)' }}
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-5 right-5 font-mono text-xs uppercase tracking-widest opacity-50 hover:opacity-100"
            >
              Close ✕
            </button>

            {status === 'success' ? (
              <div className="py-10 text-center">
                <p className="font-display text-4xl mb-3" style={{ color: 'var(--accent)' }}>
                  Message sent.
                </p>
                <p className="font-body opacity-70">I&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Start a project</p>
                <h3 className="font-display text-4xl mb-6">Tell me what you&apos;re building.</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-transparent border-b py-2 font-body outline-none focus:border-current"
                    style={{ borderColor: 'var(--line)' }}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="bg-transparent border-b py-2 font-body outline-none focus:border-current"
                    style={{ borderColor: 'var(--line)' }}
                  />
                  <textarea
                    name="message"
                    placeholder="A little about the project"
                    required
                    rows={4}
                    className="bg-transparent border-b py-2 font-body outline-none focus:border-current resize-none"
                    style={{ borderColor: 'var(--line)' }}
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-3 font-mono text-xs uppercase tracking-widest py-3 rounded-full transition-opacity disabled:opacity-50"
                    style={{ background: 'var(--accent)', color: '#FDFAF6' }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  {status === 'error' && (
                    <p className="text-xs text-center" style={{ color: 'var(--accent)' }}>
                      Something went wrong — email me directly at hello@karrycreative.studio
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}