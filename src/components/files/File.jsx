import { Menu } from "@headlessui/react";
import PropTypes from "prop-types";
import { RiDeleteBin6Fill, RiEyeFill, RiFile3Fill, RiFolder3Fill, RiMore2Fill, RiPencilFill } from "react-icons/ri";

export const File = (props) => {
    const handleItemClick = () => {
       
        if (props.onClick) {
          props.onClick();
        }
      };

    return (
        <div className="bg-lightgray w-[18rem] h-[6rem] flex justify-between p-4 font-quicksand rounded-lg hover:bg-gray-200" onClick={handleItemClick}>
            <div className="flex items-center px-2 justify-center">
                {props.type === "file" ? (
                    <RiFile3Fill className="text-5xl text-primary" />
                ) : (
                    <RiFolder3Fill className="text-5xl text-grey" />
                )}

                
            </div>
            <div className="flex flex-col justify-between px-2 flex-wrap">
                    <h2 className="truncate w-40">{props.title}</h2>
                    <h3 className="pt-2">
                        <span className="font-bold">Ult act. </span>
                        {props.date}
                    </h3>
                </div>
            <div className="relative"></div>
            <Menu as="div" className="">
                <Menu.Button className="text-2xl hover:bg-white rounded-full" onClick={handleItemClick}>
                    <RiMore2Fill className="" />
                </Menu.Button>
                <Menu.Items
                    as="section"
                    className="right-0 absolute  bg-gray-100 w-60 rounded-lg shadow-lg p-4 ml-auto z-10"
                >
                    <div>
                        <Menu.Item>
                            <button
                                onClick={() => {}}
                                className="flex items-center gap-4 p-2 rounded-lg  transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                            >
                                <RiEyeFill /> Ver detalle
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                onClick={() => {}}
                                className="flex items-center gap-4 p-2 rounded-lg  transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                            >
                                <RiPencilFill /> Editar configuración
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                onClick={() => {}}
                                className="flex items-center gap-4 p-2 rounded-lg  transition-colors text-base font-quicksand w-full hover:bg-red-500 hover:text-white"
                            >
                                <RiDeleteBin6Fill /> Eliminar
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    );
};

File.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};
