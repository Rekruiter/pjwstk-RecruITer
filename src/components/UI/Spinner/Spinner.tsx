interface SpinnerProps {
  isLight?: boolean;
  className?: string;
}

const Spinner = ({ isLight, className = 'h-10 w-10 border-4' }: SpinnerProps) => {
  return (
    <div
      className={`m-auto inline-block ${className} animate-spin rounded-full border-solid ${
        isLight ? 'border-light' : 'border-dark'
      } motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status border-r-transparent
      align-[-0.125em]`}></div>
  );
};

export default Spinner;
