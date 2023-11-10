

import PropTypes from "prop-types";

function PDFViewer({ url }) {
  // console.log(url)
  return (
    <div className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:mt-10 md:pl-[4rem]  lg:p-8 p-4">
    
        <iframe src={url} width="100%" height="100%" />
      
    </div>
  );
}

PDFViewer.propTypes = {
  url: PropTypes.string,
};

export default PDFViewer;
