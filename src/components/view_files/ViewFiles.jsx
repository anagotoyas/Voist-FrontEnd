import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PDFViewer from "../files/PDFViewer";
import { Listbox } from "@headlessui/react";
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri";

function ViewFiles({ id }) {
  const { loadAttached } = useAuth();
  const [attached, setAttached] = useState([]);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const loadFiles = async () => {
    const res = await loadAttached(id);

    setAttached(res.data);
    if (res.data.length > 0) {
      
      setLink(res.data[0].link);
      setName(res.data[0].file_name);
    }
  
  };

  

  useEffect(() => {
    loadFiles();
  }, [id]);

  return (
    <div className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:mt-10  lg:p-8 p-4 border-dashed border-2 border-primary rounded-xl ">
      <h3 className=" font-bold text-md">Archivos Adjuntos</h3>
     
      <section className="w-full relative">
        <Listbox
      
        
          value={link}
          onChange={(newLink) => {
            setLink(newLink);
            const selectedFile = attached.find((file) => file.link === newLink);
            if (selectedFile) {
              setName(selectedFile.file_name);
            }
          }}
        >
          <Listbox.Button className="relative w-full h-[2.5rem] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm truncate">{name}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <RiArrowDownSLine
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {attached.map((file, index) => (
            //   <Listbox.Option key={index} value={file.link}>
            //     {({ active }) => (
            //       <Attached_File
            //         file_name={file.file_name}
            //         className={`${
            //           active ? "bg-primary text-white hover:text-black" : ""
            //         }`}
            //       />
            //     )}
            //   </Listbox.Option>
            <Listbox.Option
            key={index}
            className={({ active }) =>
              ` relative cursor-default select-none py-2 pl-10 pr-4 truncate w-full ${
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
              }`
            }
            value={file.link}
          >
            {({ selected }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {file.file_name}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <RiCheckLine className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </section>
      
        <PDFViewer url={link} className={"h-[calc(85%)] mt-5"}/>
      
    </div>
  );
}

export default ViewFiles;

ViewFiles.propTypes = {
  id: PropTypes.string,
};
