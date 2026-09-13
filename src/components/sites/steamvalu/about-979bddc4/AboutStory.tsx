import Image from "next/image";
import type { SVGProps } from "react";
import { gradientText } from "./gradientText";

const ASSET_BASE = "/sites/steamvalu/about-979bddc4/people";

function QuoteMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 32V22.4924C0 19.7928 0.529412 17.0344 1.58823 14.2173C2.64706 11.4003 4.04412 8.74461 5.77941 6.25034C7.51471 3.75607 9.39706 1.67262 11.4265 0L19.7206 4.88583C18.0735 7.46814 16.7206 10.1678 15.6618 12.9849C14.6324 15.8019 14.1176 18.9418 14.1176 22.4044V32H0ZM22.2794 32V22.4924C22.2794 19.7928 22.8088 17.0344 23.8676 14.2173C24.9265 11.4003 26.3235 8.74461 28.0588 6.25034C29.7941 3.75607 31.6765 1.67262 33.7059 0L42 4.88583C40.3529 7.46814 39 10.1678 37.9412 12.9849C36.9118 15.8019 36.3971 18.9418 36.3971 22.4044V32H22.2794Z"
        fill="url(#about-story-quote-gradient)"
      />
      <defs>
        <linearGradient
          id="about-story-quote-gradient"
          x1="21"
          y1="0"
          x2="21"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#B6B6B6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Spec: docs/research/steamvalu/about-979bddc4/components/AboutStory.spec.md
export function AboutStory() {
  return (
    <section className="px-6">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-32 lg:gap-[14rem]">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-around">
          <p className="text-[22px] leading-[1.18] font-bold text-white lg:w-5/12 lg:text-[32px]">
            We are creating a new market and new way of how people look up,
            access, and interact with complex information around them.
          </p>
          <p className={`lg:w-6/12 ${gradientText}`}>
            We are building a new type of Operating system, an operating
            system of reality that can be used not only in manufacturing but
            in healthcare, hospitality, home automation, security, and a
            multitude of industrial applications.
          </p>
        </div>

        <div className="mx-auto max-w-[900px] text-center">
          <p className={`text-[26px] leading-[1.2] font-bold sm:text-[48px] ${gradientText}`}>
            Our goal? To help our customers to be at the edge of current
            technology.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:justify-around">
          <div className="rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/0 p-px lg:w-5/12">
            <div className="flex h-full flex-col gap-10 rounded-2xl bg-gradient-to-b from-[#333] to-[#252525] p-6 sm:p-12 lg:gap-16">
              <div className="flex flex-col gap-8">
                <QuoteMarkIcon className="w-[42px]" />
                <p className={`text-2xl leading-[1.33] font-bold ${gradientText}`}>
                  We are empowering people to self-growth and are helping
                  people to be the best versions of themselves.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={`${ASSET_BASE}/lubomira-bosanska.jpg`}
                    alt="Lubomira Bosanska"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-2xl font-medium text-white">
                    Lubomira Bosanska
                  </p>
                  <p className="text-sm text-[#808080]">COO</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-16 lg:w-6/12">
            <p className={gradientText}>
              This is achieved by providing excellent value to customers and
              scalability of products provided. We are empowering people to
              self-growth and are helping people to be the best versions of
              themselves. Not only professionally but also as humans. We are
              leading by example and encourage people to improve both
              mentally and physically.
            </p>
            <p className={gradientText}>
              We have a strong culture built around decades of experience,
              that supports teamwork and autonomy. We believe that people are
              capable of making good decisions and should be encouraged to
              express their opinions freely. We are a very feedback-driven
              company, where feedback is not only listened to but is also
              immediately worked into daily lives, and it works both ways,
              employees to management and vice versa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
