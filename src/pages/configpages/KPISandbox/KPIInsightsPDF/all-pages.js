import React, { useState } from "react";
import PDF from "react-pdf-js";
import { MDBIcon } from "mdbreact";
import './all-pages.css';

export default function AllPages({ pdf }) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [scale, setScale] = useState(1);

  const onDocumentComplete = (numPages) => {
    setPages(numPages)
  }

  const onDocumentError = (err) => {
    console.error('pdf viewer error:', err);
  }

  const onSetScale = (type) => {

    var newScale = type ? scale + 0.1 : scale - 0.1;

    if (newScale > 2) {
      newScale = 2
    } else if (newScale < 0.1) {
      newScale = 0.1
    }

    setScale(newScale)

  }

  const onPage = (type) => {

    var newPage = type ? page + 1 : page - 1

    if (newPage > pages) {
      newPage = 1
    } else if (newPage < 1) {
      newPage = pages
    }

    setPage(newPage)
  }

  const zoomStyle = {
    marginLeft: 10,
    cursor: 'pointer'
  }


  return (
    <>
      <div
        className="d-flex flex-row align-items-center justify-content-center">
        <MDBIcon size="2x" icon="search-minus" onClick={() => onSetScale(0)} />
        <span 
        className="ml-2 mr-2"
        style={{fontSize: "large"}}>{Math.round(scale * 100)}%</span>
        <MDBIcon size="2x" icon="search-plus" onClick={() => onSetScale(1)} />
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">

        <span className="page-btn mr-3" onClick={() => onPage(0)}>
          <MDBIcon icon="chevron-left" />
        </span>

        <div  style={{ overflowX: "auto" }}>
          <PDF
            file={pdf}
            onDocumentComplete={onDocumentComplete}
            onDocumentError={onDocumentError}
            page={page}
            scale={scale}
          />
          <p className="text-center">
            Page {page} / {pages}
          </p>
        </div>

        <span className="page-btn ml-3"
          onClick={() => onPage(1)}
        >
          <MDBIcon icon="chevron-right" />
        </span>
      </div>
    </>
  );
}