import MainSlider from '@/components/MainSlider';
import SearchBar from '@/components/SearchBar';

export default function Main() {
  return (
    <>
      <SearchBar />
      <MainSlider
        slides={[
          <div className="justify-center flex h-72 w-screen items-center bg-gray-200">1</div>,
          <div className="justify-center flex h-72 w-screen items-center bg-gray-200">1</div>,
          <div className="justify-center flex h-72 w-screen items-center bg-gray-200">1</div>
        ]}
      />
    </>
  );
}
