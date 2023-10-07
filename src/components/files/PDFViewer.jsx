
import { Document, Page, Text, View, PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';

import PropTypes from 'prop-types';

function PDFViewer({ title, content }) {
  return (
    <ReactPDFViewer className="h-full lg:w-[70%] w-[45rem] md:mt-10 pl-[5rem]  lg:p-8 p-4">
      <Document>
        <Page size="A4">
          <View>
            <Text>{title}</Text>
            <Text>{content}</Text>
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


