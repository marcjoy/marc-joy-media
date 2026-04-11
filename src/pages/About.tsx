import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { siteImages } from '../lib/images';
import { streamingLinks } from '../data/sonicCosmos';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

const FORMSUBMIT_EMAIL = 'marcjoy@marcjoy.com';

export default function About() {
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as never).toString(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
    if (location.hash !== '#contact') return;
    const scrollToContact = () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };
    const t = window.setTimeout(() => {
      scrollToContact();
      requestAnimationFrame(scrollToContact);
    }, 100);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <motion.div
      data-page="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-7xl pb-[max(5rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-24 sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:pt-28 md:pb-32 md:pt-36 lg:pt-32"
    >
      <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.section
          className="lg:col-span-5 relative group"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-h-[min(68svh,520px)] max-w-[min(100%,20rem)] overflow-hidden rounded-xl border border-white/5 bg-surface-container shadow-2xl sm:max-w-xs md:max-w-sm md:max-h-[min(75svh,600px)] lg:mx-0 lg:max-h-none lg:max-w-none">
            <img src={siteImages.aboutPortrait} alt="MarcJoy" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 space-y-2 text-center sm:mt-10 lg:mt-12 lg:text-left">
            <h1 className="text-balance break-words font-headline text-[clamp(2rem,9vw+0.5rem,5rem)] font-black uppercase leading-[0.92] tracking-tighter text-on-surface italic sm:text-[clamp(2.25rem,10vw,5rem)] md:text-[80px]">
              MarcJoy
            </h1>
            <p className="text-sm font-headline font-light tracking-[0.18em] text-primary-container sm:text-base sm:tracking-widest md:text-xl">
              FOUNDER, MARC JOY MEDIA
            </p>
            <div className="flex items-center justify-center gap-2 text-on-surface-variant lg:justify-start">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              <span className="font-headline text-xs uppercase tracking-[0.2em] sm:text-sm">Seattle, WA</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="lg:col-span-7 space-y-16"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <div className="space-y-6 text-base leading-relaxed text-on-surface-variant font-body sm:space-y-8 sm:text-lg">
            <p>I build worlds because the ones we were given didn't have enough room. Marc Joy Media is an Afrofuturist multimedia studio based in Seattle. I operate five creative properties spanning fiction, music, education, heritage preservation, and film, all rooted in the same core belief: imagination is infrastructure.</p>
            <p>I am a writer, musician, and visual artist. I compose under the name Blaq Timbre, with our album Sonic Cosmos on streaming platforms. I design universes like Kemetopolis, a city-planet where Kushite wisdom meets 31st-century engineering. I build systems that produce 365 days of Black cultural content through NeverOneMonth. I document Pacific Northwest Black history through Northwest Black Pioneers.</p>
            <p>By day I work tech support for Seattle Public Schools. By night and weekend I run the studio. Everything I make starts with the same question: what happens when we dream where everyone can see?</p>
          </div>
          <div className="relative py-8 sm:py-12">
            <div className="absolute left-0 top-0 h-1 w-16 bg-primary-container sm:w-24" />
            <blockquote className="text-balance text-[clamp(1.45rem,5.5vw+0.35rem,2.75rem)] font-headline font-bold italic leading-[1.15] tracking-tight text-on-surface sm:text-3xl md:text-4xl lg:text-5xl">
              &ldquo;We Dream <span className="text-primary-container">in Public</span>&rdquo;
            </blockquote>
            <p className="mt-3 font-headline text-[0.65rem] uppercase tracking-[0.28em] text-tertiary-fixed-dim/60 sm:mt-4 sm:text-sm sm:tracking-[0.3em]">
              The Core Philosophy
            </p>
          </div>
          <motion.div
            className="flex flex-wrap gap-x-6 gap-y-5 border-t border-white/5 pt-6 sm:gap-x-10 sm:gap-y-6 sm:pt-8 lg:gap-x-12"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
            {['WRITER', 'MUSICIAN', 'VISUAL ARTIST', 'WORLDBUILDER', 'PRODUCER'].map((skill, i) => (
              <motion.div key={skill} variants={staggerCardVariants} className="flex flex-col gap-1">
                <span className="text-xs font-headline uppercase tracking-[0.3em] text-on-surface-variant/40">0{i + 1}</span>
                <span className="font-headline text-lg font-medium tracking-tighter text-on-surface sm:text-xl">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      <div className="mx-auto mb-0 mt-16 max-w-4xl sm:mt-20 md:mt-24">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a35] to-transparent" />
      </div>

      <section id="contact" className="relative scroll-mt-24 py-12 sm:scroll-mt-28 sm:py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 font-medium uppercase tracking-[0.2em] text-[#2DD4BF] text-xs sm:mb-4 sm:text-sm">
            Get in Touch
          </p>
          <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-[#F5F0E8] text-balance sm:mb-6 sm:text-4xl md:text-5xl">
            Let&apos;s Build Something
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:mb-14 sm:text-lg md:mb-16">
            Whether it&apos;s a creative project, a collaboration, or client work, the best conversations start with a
            simple message.
          </p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12 lg:gap-16">
            <div className="md:col-span-3">
              {submitted ? (
                <div className="py-10 text-center sm:py-12">
                  <p className="text-lg font-medium text-[--page-accent]">Message received.</p>
                  <p className="mt-2 text-zinc-400">I&apos;ll be in touch.</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="space-y-5 sm:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <div>
                    <label htmlFor="name" className="block text-[#F5F0E8] text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="min-h-11 w-full rounded-lg border border-[#2a2a35] bg-[#1f1f27] px-4 py-3 text-base text-[#F5F0E8] placeholder-[#6b7280] transition-colors focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#F5F0E8] text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="min-h-11 w-full rounded-lg border border-[#2a2a35] bg-[#1f1f27] px-4 py-3 text-base text-[#F5F0E8] placeholder-[#6b7280] transition-colors focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
                      placeholder="you@email.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[#F5F0E8] text-sm font-medium mb-2">
                      What&apos;s this about?
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="min-h-11 w-full appearance-none rounded-lg border border-[#2a2a35] bg-[#1f1f27] px-4 py-3 text-base text-[#F5F0E8] transition-colors focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
                    >
                      <option value="Client Work">Client Work</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Kemetopolis">Kemetopolis</option>
                      <option value="Music">Music / Blaq Timbre</option>
                      <option value="Speaking">Speaking / Press</option>
                      <option value="Other">Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[#F5F0E8] text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="min-h-[8.5rem] w-full resize-y rounded-lg border border-[#2a2a35] bg-[#1f1f27] px-4 py-3 text-base text-[#F5F0E8] placeholder-[#6b7280] transition-colors focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF] sm:min-h-0 sm:resize-none"
                      placeholder="Tell me what you're thinking..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="min-h-12 w-full rounded-lg bg-[#2DD4BF] px-8 py-3 font-headline text-sm font-bold tracking-wide text-[#0A0A0F] transition-colors hover:bg-[#2DD4BF]/90 sm:min-h-11 sm:w-auto active:bg-[#2DD4BF]/85"
                  >
                    SEND IT
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8 border-t border-white/5 pt-8 md:col-span-2 md:border-t-0 md:pt-0 md:space-y-10">
              <div>
                <h3 className="mb-2 font-headline text-sm font-bold uppercase tracking-wide text-[#F5F0E8] sm:mb-3">
                  Direct
                </h3>
                <a
                  href={`mailto:${FORMSUBMIT_EMAIL}`}
                  className="inline-flex min-h-11 max-w-full items-center break-all text-sm text-[#2DD4BF] transition-colors hover:text-[#2DD4BF]/80 sm:text-base"
                >
                  {FORMSUBMIT_EMAIL}
                </a>
              </div>

              <div>
                <h3 className="mb-2 font-headline text-sm font-bold uppercase tracking-wide text-[#F5F0E8] sm:mb-3">
                  Social
                </h3>
                <div className="flex flex-col gap-0.5">
                  <a
                    href="https://instagram.com/marcjoymedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-[#9CA3AF] transition-colors hover:text-[--page-accent] active:opacity-90"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://youtube.com/@marcjoymedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-[#9CA3AF] transition-colors hover:text-[--page-accent] active:opacity-90"
                  >
                    YouTube
                  </a>
                  <a
                    href={streamingLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-[#9CA3AF] transition-colors hover:text-[--page-accent] active:opacity-90"
                  >
                    Spotify
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-[#F5F0E8] font-headline font-bold text-sm tracking-wide uppercase mb-3">Based in</h3>
                <p className="text-[#9CA3AF]">Seattle, WA</p>
              </div>

              <div>
                <h3 className="text-[#F5F0E8] font-headline font-bold text-sm tracking-wide uppercase mb-3">
                  Available for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Web Design', 'Brand Strategy', 'Content Systems', 'Social Media Management', 'Video Production'].map(
                    (service) => (
                      <span
                        key={service}
                        className="inline-flex items-center border border-[#2a2a35] rounded-full px-3 py-1.5 text-[11px] leading-tight text-[#9CA3AF] sm:text-xs sm:py-1"
                      >
                        {service}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
