import type { Metadata } from "next";
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  HandHeart,
  Microscope,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Section, Container, Badge, Card, SectionHeading } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageHero } from "@/components/shared/PageHero";
import { partners } from "@/lib/data/partners";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | LifeCare Specialist Hospital",
  description:
    "Discover three decades of healing, innovation and trust at LifeCare Specialist Hospital — our history, mission, values, leadership and world-class facilities.",
};

const timeline = [
  {
    year: "1997",
    title: "Our doors open",
    description:
      "LifeCare Specialist Hospital was founded as a 40-bed community clinic with a singular promise: world-class care delivered with genuine compassion.",
  },
  {
    year: "2005",
    title: "Major expansion",
    description:
      "A new specialist wing brought advanced surgical theatres, a dedicated maternity center and our first 24/7 emergency department online.",
  },
  {
    year: "2014",
    title: "JCI accreditation",
    description:
      "We earned Joint Commission International accreditation, formally recognising our adherence to the highest global standards of patient safety.",
  },
  {
    year: "2020",
    title: "Digital transformation",
    description:
      "Electronic health records, telemedicine and AI-assisted diagnostics were introduced hospital-wide, achieving HIMSS Stage 7 digital maturity.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "Now a 320-bed multi-specialty hospital with ten centers of excellence, serving over a quarter of a million patients every year.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassion first",
    text: "We treat every patient as we would our own family — with warmth, dignity and unwavering empathy.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & integrity",
    text: "Rigorous protocols and honest communication keep our patients safe and our care transparent.",
  },
  {
    icon: Users,
    title: "Patient partnership",
    text: "Care decisions are made together, putting your values, goals and comfort at the center.",
  },
  {
    icon: Sparkles,
    title: "Pursuit of excellence",
    text: "We hold ourselves to the highest clinical standards and never stop refining our craft.",
  },
  {
    icon: HandHeart,
    title: "Equity in care",
    text: "Quality healthcare is a right — we serve every community with respect and accessibility.",
  },
  {
    icon: Microscope,
    title: "Innovation & research",
    text: "We invest in advanced technology and research to bring tomorrow's medicine to you today.",
  },
];

const leaders = [
  {
    name: "Dr. Adaeze Nwankwo",
    role: "Chief Executive Officer",
    image: "https://i.pravatar.cc/600?img=11",
  },
  {
    name: "Dr. Marcus Eze",
    role: "Chief Medical Officer",
    image: "https://i.pravatar.cc/600?img=5",
  },
  {
    name: "Funmi Adeleke",
    role: "Director of Nursing",
    image: "https://i.pravatar.cc/600?img=45",
  },
  {
    name: "Dr. Tobias Hart",
    role: "Head of Research",
    image: "https://i.pravatar.cc/600?img=33",
  },
];

const facilityImages = [
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    alt: "Modern hospital reception and atrium",
  },
  {
    src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
    alt: "Advanced operating theatre",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    alt: "Comfortable private patient suite",
  },
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    alt: "State-of-the-art diagnostic imaging suite",
  },
];

const stats = [
  { to: 29, suffix: "+", label: "Years of service" },
  { to: 320, suffix: "", label: "Inpatient beds" },
  { to: 180, suffix: "+", label: "Specialist physicians" },
  { to: 250, suffix: "K+", label: "Patients cared for yearly" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About LifeCare"
        title="Three decades of healing, innovation & trust"
        subtitle="Since 1997, LifeCare Specialist Hospital has grown from a small community clinic into a leading multi-specialty hospital — combining advanced medicine with the human touch every patient deserves."
        crumbs={[{ label: "About" }]}
      />

      {/* History & intro */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <Badge>Our story</Badge>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                A legacy built on <span className="text-gradient">care</span>
              </h2>
              <p className="text-muted mt-5 text-lg leading-relaxed">
                What began as a 40-bed clinic with a handful of dedicated
                physicians has become a beacon of advanced healthcare for the
                region. Every milestone in our journey has been guided by a
                single conviction: that exceptional medicine and genuine
                compassion belong together.
              </p>
              <p className="text-muted mt-4 leading-relaxed">
                Today our team of more than 180 specialists works across ten
                centers of excellence, supported by the latest diagnostic and
                surgical technology — yet still defined by the warmth that has
                always set us apart.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-bold text-brand-900 dark:text-brand-300">
                      <Counter to={s.to} suffix={s.suffix} />
                    </p>
                    <p className="text-muted mt-1 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="left">
              <SmartImage
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
                alt="The light-filled atrium of LifeCare Specialist Hospital"
                width={900}
                height={700}
                wrapperClassName="aspect-[4/3] w-full rounded-3xl shadow-soft-lg"
                className="h-full w-full"
              />
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="mt-20">
            <SectionHeading
              eyebrow="Milestones"
              title="A journey of continuous growth"
              align="center"
            />
            <ol className="relative mx-auto mt-12 max-w-3xl border-l border-brand-900/15 pl-8 dark:border-white/15">
              {timeline.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.year}
                  direction="up"
                  delay={i * 0.05}
                  className="relative mb-10 last:mb-0"
                >
                  <span className="absolute -left-[2.55rem] flex h-6 w-6 items-center justify-center rounded-full bg-brand-900 ring-4 ring-white dark:bg-brand-500 dark:ring-brand-950">
                    <span className="h-2 w-2 rounded-full bg-gold-400" />
                  </span>
                  <p className="font-display text-2xl font-bold text-brand-900 dark:text-brand-300">
                    {item.year}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section muted>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal direction="right">
              <Card className="h-full p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-soft">
                  <Target className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">Our mission</h3>
                <p className="text-muted mt-3 text-lg leading-relaxed">
                  To deliver accessible, patient-centered healthcare of the
                  highest quality — healing the body, comforting the spirit and
                  advancing medicine for the communities we serve.
                </p>
              </Card>
            </Reveal>
            <Reveal direction="left">
              <Card className="h-full p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-soft">
                  <Eye className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">Our vision</h3>
                <p className="text-muted mt-3 text-lg leading-relaxed">
                  To be the most trusted name in specialist healthcare — a place
                  where world-class clinical expertise and genuine human
                  kindness meet, setting the standard for care in the region.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Core values */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What guides us"
            title="The values at the heart of our care"
            subtitle="Every decision we make and every hand we hold is shaped by the principles we hold dear."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} direction="up" delay={(i % 3) * 0.06}>
                  <Card hover className="h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-300">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">
                      {v.text}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the team leading the way"
            subtitle="Experienced clinicians and administrators united by a commitment to your wellbeing."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader, i) => (
              <Reveal key={leader.name} direction="up" delay={(i % 4) * 0.06}>
                <Card hover className="h-full overflow-hidden p-0">
                  <SmartImage
                    src={leader.image}
                    alt={`Portrait of ${leader.name}`}
                    width={600}
                    height={600}
                    wrapperClassName="aspect-square w-full"
                    className="h-full w-full"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{leader.name}</h3>
                    <p className="text-sm font-medium text-accent-600 dark:text-accent-400">
                      {leader.role}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Facilities */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <Badge>Modern facilities</Badge>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                Designed for healing, equipped for excellence
              </h2>
              <p className="text-muted mt-5 text-lg leading-relaxed">
                From light-filled patient suites to advanced surgical theatres
                and a fully digital diagnostic center, every space at LifeCare is
                thoughtfully designed to support recovery and comfort.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Private and family-friendly inpatient suites",
                  "Hybrid operating theatres with robotic assistance",
                  "3T MRI and 256-slice CT imaging center",
                  "Healing gardens and tranquil recovery spaces",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <span className="text-muted">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal direction="left">
              <div className="grid grid-cols-2 gap-4">
                {facilityImages.map((img, i) => (
                  <SmartImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={800}
                    wrapperClassName={`w-full rounded-3xl shadow-soft ${
                      i === 0 || i === 3 ? "aspect-square" : "aspect-[3/4]"
                    } ${i === 1 ? "mt-8" : ""} ${i === 2 ? "-mt-8" : ""}`}
                    className="h-full w-full"
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Accreditations */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Accreditations & certifications"
            title="Recognised for quality and safety"
            subtitle="Our standards are validated by leading national and international healthcare bodies."
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, i) => (
              <Reveal key={partner.name} direction="up" delay={(i % 4) * 0.05}>
                <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-900/5 text-brand-900 dark:bg-white/10 dark:text-white">
                    <Award className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-display text-lg font-bold">
                    {partner.name}
                  </p>
                  <p className="text-muted mt-0.5 text-xs">{partner.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section>
        <Container>
          <Reveal>
            <div className="glass overflow-hidden rounded-3xl border bg-gradient-to-br from-brand-950 to-brand-900 p-10 text-center text-white shadow-soft-lg sm:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
                Experience care that puts you first
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
                Whether you need a routine consultation or specialist treatment,
                our team is ready to welcome you. Reach out today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/appointments" variant="gold" size="lg">
                  Book an appointment
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Contact us
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Emergency? Call {site.emergencyPhone}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
