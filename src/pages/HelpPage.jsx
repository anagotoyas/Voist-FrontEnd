import { Disclosure } from "@headlessui/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { help } from '../utils/help.js';

export const HelpPage = () => {
  console.log(help);

  return (
    <div>
      <h1 className="font-bold text-xl text-primary">Sección de Ayuda</h1>
      <div className="w-full pt-5">
        <div className="rounded-2xl bg-white">
          {help.map((item, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-amber-100 text-amber-900 px-4 py-2 text-left text-sm font-medium hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500/75 my-2">
                    <span>{item.title}</span>
                    <RiArrowDownSLine
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-amber-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    {item.answer}

                    <div className="flex items-center justify-center my-5">
                    <video width="400" height="320" controls>
                      <source src={item.video} type="video/mp4"/>
                      
                      Your browser does not support the video tag.
                    </video>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};
