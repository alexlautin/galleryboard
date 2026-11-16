import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ClassroomPreview } from '@/components/classroom-preview';

const STEPS = [
  {
    title: 'The teacher opens a room',
    body: 'You get a six-letter code. Write it on the board or put it on the projector.',
  },
  {
    title: 'Students join and draw',
    body: 'On a laptop, tablet or phone. Nobody signs up. Each student gets an anonymous name like “Brave Otter”, and other students can’t see their board.',
  },
  {
    title: 'You watch the boards fill in',
    body: 'Every board sits in one grid and updates as students draw. Click one to open it full screen, or step through them with the arrow keys.',
  },
];

// Home page for visitors who aren't in a room yet. `rooms` is the join/create panel.
export function Landing({ demo, rooms }: { demo: boolean; rooms: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <nav className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label="GalleryBoard home">
            <Logo />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <a href="#rooms">Join a room</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <a href="https://github.com/alexlautin/galleryboard">GitHub</a>
            </Button>
            <Button asChild size="sm">
              <Link href="/demo">Try the demo</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-dots">
          <div className="container grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pb-24 lg:pt-20">
            <div className="max-w-xl">
              <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl xl:text-[3.4rem]">
                Every student gets a whiteboard.{' '}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">You see</span>
                  <span className="absolute inset-x-[-0.12em] bottom-[0.1em] -z-0 h-[0.32em] -rotate-1 rounded-sm bg-brand" aria-hidden="true" />
                </span>{' '}
                all of them.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Students join with a room code and draw on their own board. Your screen shows every board in one
                grid and updates as they draw, so you can see who&apos;s got it and who&apos;s stuck without walking
                the room.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base">
                  <Link href="/demo">
                    {demo ? 'Open the sample room' : 'Try the demo'}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6 text-base">
                  <a href="#rooms">Join a room</a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The demo puts you in a sample class of seven as the teacher. Two of them are still drawing.
              </p>
            </div>

            <figure className="lg:-mr-6">
              <ClassroomPreview />
              <figcaption className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
                An animated sketch of the teacher view, made from the demo&apos;s sample drawings. In the app a
                board updates each time a student finishes a stroke.{' '}
                <Link href="/demo" className="font-medium text-foreground underline underline-offset-2">
                  See it live in the demo
                </Link>
                .
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="how" className="container scroll-mt-20 py-16 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">How a class uses it</h2>
          <ol className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t-2 border-foreground pt-4">
                <h3 className="font-semibold">
                  <span className="mr-2 text-brand-ink">{i + 1}.</span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="rooms" className="scroll-mt-20 border-t bg-card/60">
          <div className="container grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_28rem] lg:items-center">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl font-semibold tracking-tight">Have a room code?</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Type it in to join your class. Teachers can start a new room from here too.
              </p>
            </div>
            {rooms}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            GalleryBoard, by Alex Lautin, Andy Blumberg and Jake Floch. Built at Emory Hacks, Fall 2025.
          </p>
          <a
            href="https://github.com/alexlautin/galleryboard"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-brand-ink"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
