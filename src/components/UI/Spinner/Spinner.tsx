interface SpinnerProps {
  isLight?: boolean;
}

const Spinner = ({ isLight }: SpinnerProps) => {
  return (
    <div
      className={`m-auto inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid ${
        isLight ? 'border-light' : 'border-dark'
      } motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status border-r-transparent
      align-[-0.125em]`}></div>
  );
};

export default Spinner;
