interface PanelSectionWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerClickHandler: () => void;
}

const PanelSectionWrapper = ({ children, headerClickHandler, headerTitle }: PanelSectionWrapperProps) => {
  return (
    <div className="sm:basis-1/2">
      <div className="flex flex-col gap-2 rounded-lg border border-light bg-dark_blue p-3">
        <h5 className="mx-auto cursor-pointer text-lg font-semibold text-light" onClick={headerClickHandler}>
          {headerTitle}
        </h5>
        {children}
      </div>
    </div>
  );
};

export default PanelSectionWrapper;
