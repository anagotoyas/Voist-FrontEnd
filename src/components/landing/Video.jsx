import video from "../../utils/videos/publicitario.mp4";

export const Video = () => {
  return (
    <div
      className="bg-graylanding h-[150vh] md:h-[70vh] font-poppins w-full  mt-[1.5rem] md:mt-[0rem]  items-center justify-center justify-items-center px-8 py-8"
      id="que-es"
    >
      <div className=" flex items-center flex-col">
        <h1 className="text-3xl font-bold text-start my-8 ">¿Qué es Voist?</h1>

        <video
          width="700"
          height="600"
          controls
          autoPlay="true"
          className="-z-1"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
