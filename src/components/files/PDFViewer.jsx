import {
  Document,
  Page,
  Text,
  View,
  PDFViewer as ReactPDFViewer,
} from "@react-pdf/renderer";

import PropTypes from "prop-types";

function PDFViewer({ title, content }) {
  return (
    <ReactPDFViewer className="h-full lg:w-[70%] w-[45rem] md:mt-10 md:pl-[5rem]  lg:p-8 p-4">
       <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text style={{ color: "#5271FF", fontSize: "26px" , padding: 10, textDecoration: 'underline'}}>
            {title}
          </Text>
          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              paddingTop:20,
              fontSize: "14px",
            }}
          >
            {content}
          </Text>
          
        

        </View>
      </Page>
    </Document>
    </ReactPDFViewer>
  );
}

PDFViewer.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PDFViewer;
