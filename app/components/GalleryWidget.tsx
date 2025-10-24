'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, GripIcon, GripVertical, HelpCircle, Plus } from 'lucide-react';

export default function GalleryWidget() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/load');
      if (!res.ok) throw new Error('Failed to load images');
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const visibleCount = 3;
  const maxIndex = Math.max(0, images.length - visibleCount);

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const { path } = await res.json();
      setImages((prev) => [...prev, path]);
      fetchImages();
      setTimeout(fetchImages, 300);
    }
  };
  
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, images.length - visibleCount)));
  }, [images]);
  
  return (
    <div
      className="
        w-full md:w-auto max-w-[600px] h-[300px] rounded-[18px] relative 
        bg-background-widget shadow-widget
      "
    >
      <div className="flex flex-row p-4 pb-3 gap-3 pt-8">
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
								Use the Add Image button to add images. Use the arrow buttons to navigate the images.
							</div>
						)}
					</div>
					<GripVertical width={30} height={30} />
				</div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <div
              className="
                px-4 py-3 rounded-[16px] text-white text-base font-medium
                bg-background-tab-container font-[Poppins,sans-serif]
              "
            >
              Gallery
            </div>

            <div className="flex items-center gap-4">
              <label
                className="
                  flex items-center gap-1.5 px-4 py-4 mr-6 rounded-full text-white text-[10px] font-extrabold uppercase
                  bg-background-button
                  shadow-button
                  backdrop-blur-[104.56px]
                  font-family-secondary
                  leading-[6.29px] transition-transform duration-300 hover:scale-105
                  cursor-pointer
                "
              >
                <Plus width={8} height={8} />
                <span>Add Image</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
              <div className='flex flex-row gap-2'>
                <button
                  onClick={handlePrev}
                  disabled={images.length <= visibleCount || currentIndex === 0}
                  className="
                    w-9 h-9 rounded-full flex items-center justify-center
                    bg-[#1f1f1f]
                    shadow-[0_4px_10px_rgba(0,0,0,0.5)]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-opacity-80 transition-all
                  "
                  style={{
                      background:'#28292F',
                      boxShadow:'5px 5px 10px #1c1d21, -5px -5px 10px #3c4149'
                    }}
                >
                  <ArrowLeft width={16} height={16} />
                </button>

                <button
                  onClick={handleNext}
                  disabled={images.length <= visibleCount || currentIndex === maxIndex}
                  className="
                    w-9 h-9 rounded-full flex items-center justify-center
                    bg-[#1f1f1f]
                    shadow-[0_4px_10px_rgba(0,0,0,0.5)]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-opacity-80 transition-all
                  "
                  style={{
                      background:'#28292F',
                      boxShadow:'5px 5px 10px #1c1d21, -5px -5px 10px #3c4149'
                    }}
                >
                  <ArrowRight width={16} height={16} />
                </button>
              </div>
              
            </div>
          </div>

          <div className="overflow-x-hidden p-4">
            <div
              className="flex gap-3 transition-transform duration-500 ease-in-out"
              style={{
                width: `${(images.length / visibleCount) * 100}%`,
                transform: images.length > 0 ? `translateX(-${(currentIndex * 100) / images.length}%)` : undefined,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square w-[calc((100%/3)-0.75rem)] rounded-3xl overflow-hidden grayscale relative group hover:scale-105 hover:-rotate-3 transition-all duration-300 hover:grayscale-0 z-10 group-hover:z-20 hover:shadow-2xl hover:shadow-black/50"
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
