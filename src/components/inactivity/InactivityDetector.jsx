import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ModalNuevo } from "../modals/ModalNuevo";
import { Button } from "../ui";


const events = [
  "mousedown",
  "mousemove",
  "wheel",
  "keydown",
  "touchstart",
  "scroll",
];

const InactivityDetector = (props) => {
  const { isAuth,signout } = useAuth();
  const [inactive, setInactive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState(0)
  const [key, setKey] = useState(0);
 


const continuar = ()=>{
    setIsModalOpen(false);
    setInactive(false);
    setTime(0)
}

  const salir = async () => {
    setIsModalOpen(false);
    setInactive(false);
   
    await signout();
   
  };
  const resetTimer = () => {
    setIsModalOpen(true);
    setKey((prevKey) => prevKey + 1);
    setTime(10);
  };

  useEffect(() => {
    if (isAuth) {
      let timeout;

      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setInactive(true), 300000);
      };

      const clearInactive = () => {
        setInactive(false);
        resetTimeout();
      };

      events.forEach((event) => {
        window.addEventListener(event, clearInactive);
      });

      resetTimeout();

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, clearInactive);
        });

        clearTimeout(timeout);
      };
    }
  }, [isAuth]);

  useEffect(() => {
    if (inactive) {
      
      resetTimer();
      

     
    }
  }, [inactive]);



  const renderTime = ({ remainingTime }) => {
   
    if (remainingTime === 0 && isModalOpen) {
        salir();
      
    }

    return (
      <div className="timer">
       
        <div className="value">{remainingTime} s</div>
        
      </div>
    );
  };
  

  return (
    <>
      {props.children}
      <ModalNuevo isOpen={isModalOpen}>
        <div className="flex items-center justify-center flex-col m-5 ">
          <h2 className="text-lg text-primary font-medium">Sesión inactiva</h2>
       
          <p className="p-2 pb-4 stext-center text-gray-500">
            Si no respondes en breve, tu sesión se cerrará automáticamente por
            razones de seguridad.
          </p>
          

          <CountdownCircleTimer
            size={120}
            key={key}
            isPlaying
            duration={time}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={salir}
          >
            {renderTime}
          </CountdownCircleTimer>

          <div className="flex justify-around items-center w-full mt-8">
            <Button className={"bg-red-500 hover:bg-slate-400 w-[5rem] text-center justify-center"} 
            onClick={salir}>Salir</Button>
            <Button onClick={continuar}>Continuar</Button>
          </div>
         
        </div>
      </ModalNuevo>
    </>
  );
};

export default InactivityDetector;

InactivityDetector.propTypes = {
  children: PropTypes.node,
};
