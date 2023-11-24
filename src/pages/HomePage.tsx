import KeyboardImage from '../assets/keyboard.png';
import Button from '../components/UI/Button';

const HomePage = () => {
  return (
    <>
      <section
        className="w-full min-h-screen flex flex-col justify-center items-center"
        style={{
          background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.25)), url(${KeyboardImage})`,
          backgroundSize: 'cover',
        }}>
        <div className="w-1/2 flex flex-col gap-6">
          <div className="text-light text-5xl">MAKE CODING RECRUITMENTS EASY AND PRODUCTIVE</div>
          <div>New tool to proceed programming recruitments at another level of efficiency</div>
          <Button>Join US</Button>
        </div>
      </section>
      {/* <section
        className="w-full min-h-screen flex flex-col justify-center items-center"
        style={{
          background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.25)), url(${KeyboardImage})`,
          backgroundSize: 'cover',
          backdropFilter: 'blur(10px)',
        }}></section> */}
    </>
  );
};

export default HomePage;
