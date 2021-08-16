export interface PaginationProps {
    pageCount: number;
    onPageChange: ((selectedItem: { selected: number }) => void) | undefined;
}
