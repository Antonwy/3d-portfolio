import { Navbar } from '@/components/dom/Navbar';
import { AboutMe } from '@/components/dom/sections/AboutMe';
import { Welcome } from '@/components/dom/sections/Welcome';
import dynamic from 'next/dynamic';

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const LandingGeometries = dynamic(
  () => import('@/components/canvas/LandingGeometries'),
  { ssr: false }
);

// Dom components go here
export default function Page(props) {
  return (
    <>
      <Navbar />
      <Welcome />
      <AboutMe />
      <LandingSection name="Third Section" />
    </>
  );
}

const LandingSection = ({ name }) => (
  <section className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-6xl font-bold text-center text-white">{name}</h1>
  </section>
);

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <LandingGeometries />;

export async function getStaticProps() {
  return { props: { title: 'Index' } };
}
