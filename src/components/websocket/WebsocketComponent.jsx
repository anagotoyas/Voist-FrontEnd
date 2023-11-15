"use client";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { DOMAIN } from "../../api/api";
import PropTypes from 'prop-types';

export const WebsocketComponent = (props) => {
  const { user } = useAuth();

  useEffect(() => {
    let socket;
  
    if (user && user.id) {
      // Esperar 2 segundos antes de intentar establecer la conexión
      const connectTimeout = setTimeout(() => {
        // Establecer la conexión WebSocket
        socket = io(DOMAIN, {
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
      }, 2000); // Esperar 2 segundos (2000 milisegundos)
  
      // Limpieza del efecto
      return () => {
        // Limpiar el temporizador si el componente se desmonta antes de que se establezca la conexión
        clearTimeout(connectTimeout);
        
        // Desconectar el socket si ya se estableció la conexión
        if (socket && socket.connected) {
          socket.disconnect();
        }
      };
    } else {
      console.log('nada');
      return;
    }
  }, [user]);
  

  return <>{props.children}</>;
};

WebsocketComponent.propTypes = {
  children: PropTypes.node
};