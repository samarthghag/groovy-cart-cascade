
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAPAnimations = () => {
  const animateIn = (element: HTMLElement, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        delay,
        ease: 'power2.out' 
      }
    );
  };

  const animateOut = (element: HTMLElement) => {
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.in'
    });
  };

  const animateStagger = (elements: HTMLElement[], delay = 0.1) => {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: delay,
        ease: 'power2.out'
      }
    );
  };

  const animateHover = (element: HTMLElement) => {
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  return {
    animateIn,
    animateOut,
    animateStagger,
    animateHover
  };
};
