

import PropTypes from "prop-types";

function PDFViewer({ url, className }) {
 
  return (
    <div className={`${className}`}>
    
        <iframe src={url} width="100%" height="100%" />
      
    </div>
  );
}

PDFViewer.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
};

export default PDFViewer;
