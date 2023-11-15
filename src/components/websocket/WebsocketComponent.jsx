"use client";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { DOMAIN } from "../../api/api";
import PropTypes from 'prop-types';

export const WebsocketComponent = (props) => {
  const { user } = useAuth();

  useEffect(() => {
    if(user && user.id){
      const socket = io(DOMAIN, {
      auth: {
        token: user,
        user: user,
      },

    });

    // Evento cuando la conexión se establece
    socket.on("connect", () => {
      console.log("Conexión establecida con el servidor WebSocket");
    });

    // Evento cuando el usuario se desconecta
    socket.on("disconnect", () => {
      console.log("Desconexión del servidor WebSocket");
    });

    return () => {
      // Desconectar el socket cuando el componente se desmonta
      socket.disconnect();
    };
    }else{
      console.log('nada')
      return
    }
   

  }, [user]); // Asegúrate de agregar user como una dependencia para que el efecto se ejecute cuando cambie el usuario

  return <>{props.children}</>;
};

WebsocketComponent.propTypes = {
  children: PropTypes.node
};
