import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Message } from "./message/Message";
import { useAuth } from "../../context/AuthContext";
import { RiSendPlaneFill } from "react-icons/ri";

export const Chat = (props) => {
  const { classId, url_pdf } = props;

  const [conversations, setConversations] = useState([]);
  const [question, setQuestion] = useState("");
  const { loadConversation, createConversations, askQuestions } = useAuth();

  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const messagesContainerRef = useRef(null);

  const refetchConversations = async () => {
    try {
      const data = await loadConversation(classId);
      setConversations(data);
    } catch (error) {
      // Manejar el error si es necesario
      toast.warning(getErrorResponse(error));
    }
  };

  useEffect(() => {
    refetchConversations();
  }, [classId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [isLoadingRequest]);

  const handleChangeInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleKeyBoardInput = (e) => {
    if (isLoadingRequest) return;
    if (e.key === "Enter" ) {
      createConversation(question);
    }
  };

  const createConversation = async (question) => {
    setIsLoadingRequest(true);
    try {
      setQuestion("");
      const response = await askQuestions(url_pdf, question);
      console.log(response);

      const response2 = await createConversations(
        classId,
        question,
        response.answer
      );
      console.log(response2);
      setConversations([...conversations, response2]);
      console.log(conversations);
    } catch (error) {
      toast.warning(getErrorResponse(error));
    } finally {
      setIsLoadingRequest(false);
    }
  };

  const getErrorResponse = (error) => {
    let errorMessage = error.message;
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message)
          errorMessage = error.response.data.message;
      }
    }
    return errorMessage;
  };

  return (
    <div className="mt-10 border-gray-300 border-2 rounded-lg p-4 flex flex-col gap-8 justify-start lg:w-[70%] md:w-[60%] ">
      <div
        ref={messagesContainerRef}
        className="pr-5 overflow-y-auto overflow-x-hidden min-h-[60vh] max-h-[60vh]"
      >
        {conversations.map((item, index) => (
          <>
            <Message
              key={item.id}
              content={item.question}
              created_at={item.created_at}
              isUserMessage
            />
            <Message
              key={index}
              content={item.answer}
              created_at={item.created_at}
              isUserMessage={false}
            />
          </>
        ))}
        {isLoadingRequest ? (
          <>
            <Message
              className="animate-pulse"
              content=""
              createdAt=""
              isUserMessage
            />
            <Message
              className="animate-pulse"
              content=""
              createdAt=""
              isUserMessage={false}
            />
          </>
        ) : null}
      </div>
      <div className="flex relative items-center ">
        <input
          type="text"
          onKeyUp={handleKeyBoardInput}
          value={question}
          onChange={handleChangeInput}
          className="rounded-xl border-2 border-gray-300 p-2 w-full"
        />
         <RiSendPlaneFill className="w-[2rem] text-primary text-[1.2rem] absolute m-auto top-[.8rem] right-4 cursor-pointer hover:text-grey"/>
       
      </div>
    </div>
  );
};

Chat.propTypes = {
  classId: PropTypes.string.isRequired,
  url_pdf: PropTypes.string.isRequired,
};
