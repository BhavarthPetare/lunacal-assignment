'use client';

import { useState } from 'react';
import { GripVertical, HelpCircle } from 'lucide-react';

const tabs = [
  {
    id: 'About Me',
    label: 'About Me',
    content:
      "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.",
    btext:
      "I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters—Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9–10 AM. Once the school run is done and I've had my coffee, my focus is entirely on helping my clients succeed. I specialize in leveraging the Salesforce platform to streamline operations and drive real growth.",
  },
  {
    id: 'Experiences',
    label: 'Experiences',
    content:
      'My journey in tech sales has always been about forging genuine partnerships. I specialize in equipping small and medium-sized businesses with the tools they need to scale.',
    btext:
      "Before joining Salesforce, I worked in startups — fast, creative, and full of challenges. That shaped my drive to find agile solutions. At Salesforce, I’ve channeled that into helping clients navigate digital transformations. One of my proudest moments was helping a retail brand improve customer satisfaction by 30%.",
  },
  {
    id: 'Recommended',
    label: 'Recommended',
    content:
      "For anyone in a client-facing role, I can't recommend *Never Split the Difference* by Chris Voss enough.",
    btext:
      "The book teaches 'tactical empathy' — understanding the other person's perspective to build trust and find real solutions. It's not about winning; it's about collaborating. This idea transformed the way I approach negotiation and communication.",
  },
];

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap
        relative overflow-hidden group w-full sm:w-auto
        ${isActive ? 'text-white' : 'text-text-secondary hover:text-white'}
      `}
      style={
        isActive
          ? {
              background: '#28292f',
              boxShadow:
                '13.49px 16.87px 67.47px 8.43px #0a0a0a, -8.43px -16.87px 50.6px #485b71',
              fontFamily: 'Poppins, sans-serif',
            }
          : { fontFamily: 'Poppins, sans-serif' }
      }
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
}

export default function InfoWidget() {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || 'About Me');
  const [showTooltip, setShowTooltip] = useState(false);
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div
      className="
        w-full sm:max-w-[90%] md:max-w-[600px]
        h-auto md:h-[300px]
        rounded-[18px] relative mx-auto
      "
      style={{
        background: '#363c43',
        boxShadow: '5.67px 5.67px 3.78px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div className="flex flex-row p-4 pb-3 gap-3">
        <div className="flex flex-col gap-16">
          <div className="relative">
            <HelpCircle
              className="w-[24px] h-[24px] text-[#A3ADBA] cursor-help transition-colors hover:text-white"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div
                className="
                  absolute left-8 top-1/2 -translate-y-1/2 w-48
                  bg-background-tab-active text-white text-xs p-2 rounded-lg
                  shadow-lg border border-white/10
                  animate-in fade-in duration-200
                  z-50
                "
              >
                Click the tabs to switch between sections.
              </div>
            )}
          </div>
          <GripVertical width={30} height={30} />
        </div>

        <div className="flex flex-col gap-3 flex-1 overflow-hidden items-center justify-center">
          {/* Tabs */}
          <div
            className="
              flex-col sm:flex-row sm:flex-wrap md:flex-nowrap
              gap-2 sm:gap-1 p-1 rounded-2xl w-fit justify-center
            "
            style={{ background: '#171717' }}
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                isActive={activeTabId === tab.id}
                onClick={() => setActiveTabId(tab.id)}
              />
            ))}
          </div>

          {/* Text content */}
          <div
            className="
              text-text-content text-sm md:text-base font-normal leading-relaxed
              overflow-y-auto pr-2 md:max-h-[200px]
              scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
            "
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            <p>{activeTab?.content}</p>
            <br />
            <p>{activeTab?.btext}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
