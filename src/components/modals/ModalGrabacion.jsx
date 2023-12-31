import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "../ui/index";
import { RiCloseLine } from "react-icons/ri";
import audioBufferToWav from "audiobuffer-to-wav";
import { Spin } from "antd";

import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";


export const ModalGrabacion = ({ isOpen, onClose, children }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [inputValue, setInputValue] = useState("");
  

  const mediaRecorder = useRef(null);
  const audioStream = useRef(null);
  const canvasRef = useRef(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_folder = searchParams.get("idCarpeta");

  
  

  const { createFiles, saveAudio } = useAuth();

  const cerrarModal = ()=>{
    setRecording(false);
      setInputValue("");
    onClose()

  }

  useEffect(() => {
    if (!isOpen) {
      setRecording(false);

      setIsFinished(false);

      if (mediaRecorder.current) {
        mediaRecorder.current.ondataavailable = null;
        mediaRecorder.current.onstop = null;
        mediaRecorder.current = null;
      }
      if (audioStream.current) {
        audioStream.current.getTracks().forEach((track) => track.stop());
        audioStream.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (canvasRef.current) {
      const visualize = (stream) => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        const drawWaveform = () => {
          analyser.getByteTimeDomainData(dataArray);

          canvasContext.fillStyle = "rgb(255, 255, 255)";
          canvasContext.fillRect(0, 0, canvas.width, canvas.height);
          canvasContext.lineWidth = 5;
          canvasContext.strokeStyle = "rgb(82, 113, 255)";

          canvasContext.beginPath();

          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
              canvasContext.moveTo(x, y);
            } else {
              canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasContext.lineTo(canvas.width, canvas.height / 2);
          canvasContext.stroke();

          if (recording) {
            requestAnimationFrame(drawWaveform);
          }
        };

        drawWaveform();
      };

      if (recording && audioStream.current) {
        visualize(audioStream.current);
      }
    }
  }, [recording]);

  const startRecording = () => {
    setAudioBlob(null);
    

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioStream.current = stream;

        mediaRecorder.current = new MediaRecorder(stream);

        const audioChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
            setAudioBlob((prevBlob) => {
              const newBlob = prevBlob
                ? new Blob([prevBlob, event.data], { type: "audio/wav" })
                : new Blob([event.data], { type: "audio/wav" });
              return newBlob;
            });
          }
        };
        mediaRecorder.current.onstop = () => {
          setRecording(false);
        };
        mediaRecorder.current.start();
        setRecording(true);
      })
      .catch((error) =>
        console.error("Error al acceder al micrófono: ", error)
      );
  };

  const stopRecording = async () => {
    setIsFinished(true);
    let chunks = [];
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      audioStream.current.getTracks().forEach((track) => track.stop());
    }

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.current.onstop = async () => {
      // Convert the recorded audio chunks into an ArrayBuffer
      const audioData = new Blob(chunks, { type: "audio/wav" });
      const arrayBuffer = await audioData.arrayBuffer();

      // Create an AudioBuffer from the ArrayBuffer
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Convert the AudioBuffer to WAV using the audioBufferToWav function
      const wavBlob = audioBufferToWav(audioBuffer);

      // Create a Blob from the WAV data
      const audioBlob2 = new Blob([wavBlob], { type: "audio/wav" });
      setAudioBlob(audioBlob2);

      
      

      // // Download the WAV file
      // const blobUrl = URL.createObjectURL(audioBlob2);
      // const link = document.createElement("a");
      // link.href = blobUrl;
      // link.download = "audio.wav";
      // link.click();
      // URL.revokeObjectURL(blobUrl);

      
      

     
    };
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const guardarFile = async () => {
      if (audioBlob ) {
       
        const formData = new FormData();
        formData.append("audio", audioBlob);
  
        const res = await createFiles(inputValue, id_folder);
        await saveAudio(formData, res.id);
  
      
        setAudioBlob(null);
        setInputValue("");
        setRecording(false);
        
        onClose();
      }
    };
  
    guardarFile();
  }, [ audioBlob]);

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
          : "hidden"
      }
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {children}
      <div className="relative bg-white w-96 p-4 rounded-lg shadow-lg">
        <RiCloseLine
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 hover:bg-gray-200 rounded-full text-2xl"
          onClick={cerrarModal}
        />

        <div className="p-4 flex items-center flex-col justify-center h-[15rem]">
        {isFinished ? <Spin size="small" /> : null}
          <div>
            <label className="text-lg font-medium">
              
              {recording ? "Grabando..." : "Ingrese el título de tu grabación"}
            </label>
            {!recording && (
              <Input
                placeholder="Titulo"
                required
                value={inputValue}
                onChange={handleInputChange}
              ></Input>
            )}
          </div>

          {!recording && (
            // <button
            //   className={`text-white px-4 py-2 mt-4 border rounded-md ${
            //     inputValue ? "bg-primary" : "bg-gray-400"
            //   }`}
            //   onClick={inputValue ? startRecording : undefined}
            // >
            //   Iniciar Grabación
            // </button>
             <button
             disabled={inputValue.trim().length < 3}
             className={`text-white px-8 py-2 mt-4 border rounded-md  
             } ${
               inputValue.trim().length < 3
                 ? "cursor-not-allowed bg-gray-400"
                 : "bg-primary"
             }`}
             onClick={inputValue ? startRecording : undefined}
           >
             Guardar
           </button>
          )}
          {recording && (
            <button
              className={`text-white px-4 py-2 mt-4 border rounded-md order-1 ${ isFinished ? "bg-gray-500" : "bg-red-500"}`}
              onClick={stopRecording}
            >
              Detener Grabación
            </button>
          )}
          {recording && (
            <canvas ref={canvasRef} width={300} height={100}></canvas>
          )}
        </div>
      </div>
    </div>
  );
};

ModalGrabacion.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
