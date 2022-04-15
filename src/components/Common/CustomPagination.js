
import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
} from "reactstrap";

function PaginationComponent({
  totalPages = 0,
  docs = [],
  sizePerPage = 10,
  page = 1,
  totalDocs = 0,
  hasNextPage = false,
  hasPrevPage = false,
  //   limit = 10,
  //   pagingCounter = 0,
  nextPage,
  prevPage,
  //   setSizePerPage = () => {},
  onChange = () => {}
}){
  return (
    <React.Fragment>
      {totalDocs > 0 && totalPages > 1 &&
        <div className="align-items-md-center mt-30">
          <div className="p-2 border">
            <Col className="pagination pagination-rounded gap-4 d-flex align-items-md-center" >
              <div className='custom-div'>
                <Pagination aria-label="Page navigation example" listClassName="justify-content-center"
                // className="pagination pagination-rounded gap-4 d-flex align-items-md-center"
                >
                    
                  {hasPrevPage && <PaginationItem>
                    <PaginationLink onClick={()=>{onChange(prevPage, sizePerPage)}}>{"<"}</PaginationLink>
                  </PaginationItem>}
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i} active={i + 1 === page ? true : undefined}>
                      <PaginationLink onClick={()=>{onChange(i + 1, sizePerPage)}} key={i} >{i + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  {hasNextPage && <PaginationItem>
                    <PaginationLink onClick={()=>{onChange(nextPage, sizePerPage)}}>{">"}</PaginationLink>
                  </PaginationItem>}
                </Pagination>
              </div>
              <div>Records:{docs.length}</div>
            </Col>
          </div>
        </div>
      }
      
    </React.Fragment>);
}

export default PaginationComponent;