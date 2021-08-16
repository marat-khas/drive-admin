export const numSpace = (value: string | number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
