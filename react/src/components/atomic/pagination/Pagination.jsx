import { Button } from '@chakra-ui/react';
import React from 'react'

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
     const totalPages = Math.ceil(totalItems / itemsPerPage);
     const pageNumbers = [];
     for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
     }
     return (
          <>
               {pageNumbers.map((pageNumber) => (
                    <Button variant={'outline'} key={pageNumber} onClick={() => onPageChange(pageNumber)} disabled={pageNumber === currentPage}>
                         {pageNumber}
                    </Button>
               ))}
          </>
     );
};

export default Pagination