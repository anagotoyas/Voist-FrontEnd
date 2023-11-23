
import moment from "moment";
import PropTypes from 'prop-types'

export const Message = (props) => {
  const { content, created_at, isUserMessage, className = "", children } = props;

  return (
    <div
      size={{ width: "w-full" }}
      className={`flex flex-col gap-2 ${isUserMessage ? "items-end" : "items-start"} ${className}}`}

    >

      <div
      className={`relative max-w-xl ${isUserMessage ? "bg-primary" : "bg-slate-200"} rounded-lg py-2 px-4 shadow-md`}
      >
        {children}
        <span
        className={`text-sm text-white w-[1rem] h-[1rem] ${isUserMessage ? "bg-blue-500 rounded-br-full top-0 -right-2 text-white" : "bg-grey rounded -bl-full top-0 -left-3"} `}
        >
           

        </span>
        <p className={`min-w-[10rem] ${isUserMessage ? "text-white" : ""}`}>{content}</p>


      </div>
      <div className="max-w-md w-[28rem] mb-2">

        <p className={`text-gray-500 text-xs ${isUserMessage ? "float-right	" : ""}`}>
        {
            created_at ? moment(created_at).format("DD/MM/YYYY HH:mm:ss a") : ""
          }
        </p>
      </div>
    </div>
  );
};

Message.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.string,
    isUserMessage: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.any


    };
