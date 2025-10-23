import InfoWidget from './components/InfoWidget';
import GalleryWidget from './components/GalleryWidget';
import Seperator from './components/Seperator';

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2" />

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6 p-8 lg:pr-16">
        <InfoWidget />
        <Seperator/>
        <GalleryWidget />
        <Seperator />
      </div>
    </main>
  );
}