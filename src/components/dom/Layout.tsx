import { useRef, forwardRef, ReactNode } from 'react';
import { mergeRefs } from 'react-merge-refs';

type LayoutProps = {
  children?: ReactNode;
};

type Ref = HTMLDivElement;

const Layout = forwardRef<Ref, LayoutProps>(({ children, ...props }, ref) => {
  const localRef = useRef();
  return (
    <div ref={mergeRefs([ref, localRef])} className="bg-background z-0">
      {children}
    </div>
  );
});
Layout.displayName = 'Layout';

export default Layout;
