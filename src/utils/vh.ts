interface VHSetFn {
    (width?: number): void;
}

export const VHSet: VHSetFn = (width = 991) => {
    if (window.innerWidth > width) {
        document.documentElement.style.removeProperty('--vh');
    } else {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
};
