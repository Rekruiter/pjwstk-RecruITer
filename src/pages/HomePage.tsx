import KeyboardImage from '../assets/keyboard.png';

const HomePage = () => {
  return (
    <section
      className="w-full flex flex-col justify-center items-center"
      style={{
        background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.25)), url(${KeyboardImage})`,
        backgroundSize: 'cover',
        backdropFilter: 'blur(10px)',
      }}></section>
  );
};

export default HomePage;
