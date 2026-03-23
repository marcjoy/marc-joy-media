import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

const FORMSUBMIT_EMAIL = 'marcjoy@marcjoy.com';
const FORM_SUBMIT_ACTION = `https://formsubmit.co/${FORMSUBMIT_EMAIL}`;
const FORM_NEXT_URL = 'https://marcjoy.com/about#contact';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact') {
      const t = window.setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => window.clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <motion.div
      data-page="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 max-w-7xl mx-auto px-8 py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <motion.section
          className="lg:col-span-5 relative group"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-surface-container border border-white/5">
            <img src={siteImages.aboutPortrait} alt="MarcJoy" className="h-full w-full object-cover" />
          </div>
          <div className="mt-12 space-y-2">
            <h1 className="text-[80px] leading-[0.9] font-black font-headline tracking-tighter text-on-surface uppercase italic">MarcJoy</h1>
            <p className="text-xl font-headline tracking-widest text-primary-container font-light">FOUNDER, MARC JOY MEDIA</p>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <MapPin className="w-4 h-4" />
              <span className="text-sm tracking-[0.2em] font-headline uppercase">Seattle, WA</span>
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
          <div className="space-y-8 text-lg leading-relaxed text-on-surface-variant font-body">
            <p>I build worlds because the ones we were given didn't have enough room. Marc Joy Media is an Afrofuturist multimedia studio based in Seattle. I operate five creative properties spanning fiction, music, education, heritage preservation, and film, all rooted in the same core belief: imagination is infrastructure.</p>
            <p>I am a writer, musician, and visual artist. I compose under the name Blaq Timbre, with our album Sonic Cosmos on streaming platforms. I design universes like Kemetopolis, a city-planet where Kushite wisdom meets 31st-century engineering. I build systems that produce 365 days of Black cultural content through NeverOneMonth. I document Pacific Northwest Black history through Northwest Black Pioneers.</p>
            <p>By day I work tech support for Seattle Public Schools. By night and weekend I run the studio. Everything I make starts with the same question: what happens when we dream where everyone can see?</p>
          </div>
          <div className="relative py-12">
            <div className="absolute left-0 top-0 w-24 h-1 bg-primary-container" />
            <blockquote className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight leading-tight italic">
              "We Dream <span className="text-primary-container">in Public</span>"
            </blockquote>
            <p className="mt-4 text-sm tracking-[0.3em] font-headline text-tertiary-fixed-dim/60 uppercase">The Core Philosophy</p>
          </div>
          <motion.div
            className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/5"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
            {['WRITER', 'MUSICIAN', 'VISUAL ARTIST', 'WORLDBUILDER', 'PRODUCER'].map((skill, i) => (
              <motion.div key={skill} variants={staggerCardVariants} className="flex flex-col gap-1">
                <span className="text-xs font-headline uppercase tracking-[0.3em] text-on-surface-variant/40">0{i + 1}</span>
                <span className="text-xl font-headline font-medium text-on-surface tracking-tighter">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 mt-24 mb-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a35] to-transparent" />
      </div>

      <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#2DD4BF] text-sm font-medium tracking-[0.2em] uppercase mb-4">Get in Touch</p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 tracking-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-[#9CA3AF] text-lg mb-16 max-w-2xl">
            Whether it&apos;s a creative project, a collaboration, or client work, the best conversations start with a
            simple message.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
            <div className="md:col-span-3">
              <form action={FORM_SUBMIT_ACTION} method="POST" className="space-y-6">
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={FORM_NEXT_URL} />

                <div>
                  <label htmlFor="name" className="block text-[#F5F0E8] text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-[#1f1f27] border border-[#2a2a35] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#6b7280] focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] transition-colors"
                    placeholder="Your name"
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
                    className="w-full bg-[#1f1f27] border border-[#2a2a35] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#6b7280] focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] transition-colors"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#F5F0E8] text-sm font-medium mb-2">
                    What&apos;s this about?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full bg-[#1f1f27] border border-[#2a2a35] rounded-lg px-4 py-3 text-[#F5F0E8] focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] transition-colors appearance-none"
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
                    className="w-full bg-[#1f1f27] border border-[#2a2a35] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#6b7280] focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] transition-colors resize-none"
                    placeholder="Tell me what you're thinking..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#2DD4BF] text-[#0A0A0F] font-headline font-bold px-8 py-3 rounded-lg hover:bg-[#2DD4BF]/90 transition-colors text-sm tracking-wide"
                >
                  SEND IT
                </button>
              </form>
            </div>

            <div className="md:col-span-2 space-y-10">
              <div>
                <h3 className="text-[#F5F0E8] font-headline font-bold text-sm tracking-wide uppercase mb-3">Direct</h3>
                <a
                  href={`mailto:${FORMSUBMIT_EMAIL}`}
                  className="text-[#2DD4BF] hover:text-[#2DD4BF]/80 transition-colors"
                >
                  {FORMSUBMIT_EMAIL}
                </a>
              </div>

              <div>
                <h3 className="text-[#F5F0E8] font-headline font-bold text-sm tracking-wide uppercase mb-3">Social</h3>
                <div className="space-y-2">
                  <a
                    href="https://instagram.com/dream_in_public"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://youtube.com/@marcjoymedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://open.spotify.com/search/blaq%20timbre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors"
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
                        className="text-xs text-[#9CA3AF] border border-[#2a2a35] rounded-full px-3 py-1"
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
