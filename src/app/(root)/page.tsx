import Image from 'next/image';
import { HeroCard } from '@/components/HeroCard';
import { SlideshowCard } from '@/components/SlideshowCard';
import { MiniSlider } from '@/components/Slider';

import { Checkbox } from '@/components/Checkbox';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const protocol = headersList.get('x-forwarded-proto') || '';

  const res = await fetch(`${protocol}://${domain}/api/`);
  const data = await res.json();

  const { headings, advantages, slideshow, miniCards, checkboxes } = data;

  return (
    <div className="background w-screem flex flex-col items-center overflow-x-hidden min-h-screen py-10 lg:py-20 backdrop-blur-xl">
      <div className="w-full lg:w-5/6 min-h-[60vh] flex flex-col lg:flex-row justify-center lg:items-center mt-20 ">
        {!headings ? (
          <div className="w-1/2 min-h-[60vh] flex flex-col justify-center items-center lg:pr-10 text-white font-extrabold z-10 ">
            <h1 className="text-xl">Loading..</h1>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 lg:min-h-[60vh] flex flex-col justify-center px-5 lg:px-0 lg:pr-10 text-white font-extrabold z-10 ">
            <Image
              src={headings.tooltip}
              alt="bubble icon with text above main hero section heading"
              width={150}
              height={48}
              className={`${headings ? 'fade-in-3s' : ''} `}
            />

            <span className="text-[32px] lg:text-[48px] py-5 fade-in-up">
              <h1>{headings.subtitle1}</h1>
              <h1>{headings.title2}</h1>
            </span>

            <span className="text-[24px] text-white/90 fade-in-up">
              <h2 className="mt-0 lg:mt-5">{headings.subtitle1}</h2>
              <h2>{headings.subtitle2}</h2>
            </span>

            <span className="hidden lg:block text-[18px] fade-in-up">
              <button className="underline mt-5">{headings.cta}</button>
            </span>

            <HeroCard advantages={advantages} />
          </div>
        )}

        <div className="w-full lg:w-1/2 h-[500px] flex flex-col z-10">
          <SlideshowCard slideShowData={slideshow} />
        </div>
      </div>

      <div className="hidden lg:block w-full mt-20">
        <MiniSlider miniCardsData={miniCards} />
      </div>

      <div className="w-full lg:w-5/6 h-full mt-24 block lg:hidden">
        <Checkbox checkboxesData={checkboxes} />

        <span className="lg:hidden text-[18px] fade-in-up px-3 text-[#FBFF23] font-extrabold">
          <button className="underline mt-5">{headings && headings.cta}</button>
        </span>
      </div>
    </div>
  );
}
