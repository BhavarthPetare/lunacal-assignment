'use client';

import { useState, useEffect, useRef } from 'react';
import { GripVertical, HelpCircle } from 'lucide-react';

const tabs = [
	{
		id: 'About Me',
		label: 'About Me',
		content:
			"Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.",
		btext:
			'I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a really exciting new chapter for our family, and I appreciate your flexibility with my morning schedule. Once the school run is done and I\'ve had my coffee, my focus is entirely on helping my clients succeed. I specialize in leveraging the Salesforce platform to streamline operations and drive real growth. I\'m passionate about finding the right solution for your unique challenges. Please feel free to book a time on my calendar, and I look forward to connecting!',
	},
	{
		id: 'Experiences',
		label: 'Experiences',
		content:
			'My journey in tech sales has always been about one thing: forging genuine partnerships. I specialize in equipping small and medium-sized businesses with the tools they need to scale, turning complex challenges into straightforward growth opportunities.',
		btext:
			'Before joining the Salesforce family, I cut my teeth in the fast-paced world of tech startups. That experience taught me the importance of agility and finding creative solutions to tough problems. Here at Salesforce, I\'ve channeled that energy into helping my clients, primarily in the retail and consumer goods sectors, navigate their digital transformations. One of my proudest moments was helping a local brand streamline their customer service process, which led to a 30% increase in customer satisfaction scores. For me, it\'s not just about selling software; it\'s about understanding your vision and building a long-term foundation for your success.',
	},
	{
		id: 'Recommended',
		label: 'Recommended',
		content:
			'For anyone in a client-facing role, I can\'t recommend the book Never Split the Difference by Chris Voss enough. It completely reframes the art of negotiation into an exercise in empathy and active listening.',
		btext:
			'The key takeaway for me was the concept of \'tactical empathy\'—understanding the perspective of the person on the other side of the table to build trust and uncover what they truly need. It\'s not about winning a battle; it\'s about collaboratively solving a puzzle. The principles in this book have been invaluable in my conversations, helping me move beyond surface-level discussions to build stronger, more transparent partnerships with my clients. It\'s a must-read for anyone who wants to communicate more effectively.',
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
        relative overflow-hidden group
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
			{!isActive && (
				<span
					className="
            absolute inset-0 -translate-x-full
            bg-background-tab-active/50
            transition-transform duration-300 ease-out
            group-hover:translate-x-0
            z-0
          "
				/>
			)}
		</button>
	);
}

export default function InfoWidget() {
	const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || 'about-me');
	const [compact, setCompact] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const tabsRef = useRef<HTMLDivElement | null>(null);

	const activeTab = tabs.find((tab) => tab.id === activeTabId);

	return (
		<div
			className="w-full max-w-[600px] h-[300px] rounded-[18px] relative"
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
								Click the tabs to switch between different sections.
							</div>
						)}
					</div>
					<GripVertical width={30} height={30} />
				</div>

				<div className="flex flex-col gap-3 flex-1">
					<div
						className="flex gap-1 p-1 rounded-2xl w-fit mx-auto"
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

					<div
						className="text-text-content text-base font-normal leading-relaxed max-h-[200px] overflow-y-auto pr-2"
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