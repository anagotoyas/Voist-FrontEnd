import PropTypes from 'prop-types';

export const ContactAccess = ({ contacts, color }) => {
  


  return (
    <>
   
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex w-full items-center ${color} p-2 rounded-lg my-2`}
          >
            <img
              src={contact.gravatar}
              alt="profile_pic"
              className="object-cover rounded-full w-10 h-10"
            />
            <div className="pl-5">
              <h1>{contact.name}</h1>
              <p className="text-gray-500">{contact.email}</p>
            </div>
          </div>
        ))}
     
    </>
  );
};
ContactAccess.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      gravatar: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  color: PropTypes.string,
};