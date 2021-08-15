import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import './pagination.scss';

import { PaginationProps } from './types';

export const Pagination: FC<PaginationProps> = ({
    pageCount,
    onPageChange,
}) => (
    <div className='entities__pagination pagination'>
        <ReactPaginate
            previousLabel='«'
            nextLabel='»'
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName='pagination__container'
            pageClassName='pagination__page'
            previousClassName='pagination__page pagination__page--prev'
            nextClassName='pagination__page pagination__page--next'
            breakClassName='pagination__page pagination__page--break'
            disabledClassName='isDisabled'
            activeClassName='isActive'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
        />
    </div>
);
