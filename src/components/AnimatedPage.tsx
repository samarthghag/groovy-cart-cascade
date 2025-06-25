
import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedPage = ({ children, className = '' }: AnimatedPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={pageRef} className={className}>
      {children}
    </div>
  );
};
