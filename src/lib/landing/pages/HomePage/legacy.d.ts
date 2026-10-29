// Type boundaries for existing JavaScript dependencies; no shared code is changed.
declare module 'src/hooks/useFirestoreFetch' {
  export function useFirestoreFetch(collection: string): {
    data: unknown[] | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<unknown>;
  };
}

declare module 'react-slick' {
  import * as React from 'react';
  interface Settings {
    children?: React.ReactNode;
    accessibility?: boolean;
    arrows?: boolean;
    infinite?: boolean;
    rtl?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    speed?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
    swipeToSlide?: boolean;
    waitForAnimate?: boolean;
    afterChange?: (index: number) => void;
    onInit?: () => void;
    onReInit?: () => void;
    responsive?: { breakpoint: number; settings: Settings }[];
  }
  export default class Slider extends React.Component<Settings> {
    slickPrev(): void;
    slickNext(): void;
  }
}
