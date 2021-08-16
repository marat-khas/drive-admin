declare module '*.svg' {
    import type { ReactElement, SVGProps } from 'react';

    const content: (props: SVGProps<SVGElement>) => ReactElement;
    export default content;
}

declare module '*.jpg';
declare module '*.png';

declare const PUBLIC_PATH: string;
