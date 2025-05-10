

export interface PaginationContainerPropTypes{
    selectedPage: number;
    onPageChangeHandler: (index: number) => void;
    totalPages: number
}