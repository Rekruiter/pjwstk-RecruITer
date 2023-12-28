import { cn } from '@/lib/utils';

interface PanelSectionWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerClickHandler?: () => void;
  className?: string;
}

const PanelSectionWrapper = ({ children, headerClickHandler, headerTitle, className }: PanelSectionWrapperProps) => {
  return (
    <div className={cn('sm:basis-1/2', className)}>
      <div className="flex h-full flex-col gap-2 overflow-auto rounded-lg border border-light bg-dark_blue p-3">
        <h5
          className={cn('mx-auto text-lg font-semibold text-light', {
            'cursor-pointer hover:scale-105': headerClickHandler,
          })}
          onClick={headerClickHandler}>
          {headerTitle}
        </h5>
        {children}
      </div>
    </div>
  );
};

export default PanelSectionWrapper;
