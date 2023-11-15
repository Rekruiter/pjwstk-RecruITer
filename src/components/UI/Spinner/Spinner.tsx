const Spinner = () => {
  return (
    <div
      className="m-auto inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-light border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"></div>
  );
};

export default Spinner;
