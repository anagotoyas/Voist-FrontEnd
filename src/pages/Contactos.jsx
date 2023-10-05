import { RiUserAddLine } from "react-icons/ri";
import { SearchBar } from "../components/ui/SearchBar";
import { Contact } from "../components/contacts/Contact";

const data = [
  {
    "id": 1,
    "image": "https://img.freepik.com/free-photo/person-indian-origin-having-fun_23-2150285283.jpg",
    "email": "lupito@gmail.com",
    "name": "Lupito Florencio"
  },
  {
    "id": 2,
    "image": "https://img.freepik.com/free-photo/young-woman-white-sweater-worried-astonished-concerned-crossed-fingers-make-wish-good-luck_273609-38892.jpg",
    "email": "maria@gmail.com",
    "name": "Maria Rodriguez"
  },
  {
    "id": 3,
    "image": "https://img.freepik.com/free-photo/smiling-woman-studio-portrait_1303-23784.jpg",
    "email": "juanito@gmail.com",
    "name": "Juanito González"
  },
  {
    "id": 4,
    "image": "https://img.freepik.com/free-photo/happy-man-posing-against-white-wall_1303-16176.jpg",
    "email": "ana@gmail.com",
    "name": "Ana Pérez"
  },
  {
    "id": 5,
    "image": "https://img.freepik.com/free-photo/fashionable-young-woman-poses-against-concrete-wall_273609-14802.jpg",
    "email": "carlos@gmail.com",
    "name": "Carlos Fernández"
  },
  {
    "id": 6,
    "image": "https://img.freepik.com/free-photo/happy-asian-couple-enjoying-time-together-living-room_1303-19544.jpg",
    "email": "lucia@gmail.com",
    "name": "Lucia Ramírez"
  },
  {
    "id": 7,
    "image": "https://img.freepik.com/free-photo/portrait-young-happy-couple_1303-21457.jpg",
    "email": "raul@gmail.com",
    "name": "Raul Morales"
  },
  {
    "id": 8,
    "image": "https://img.freepik.com/free-photo/happy-people-taking-selfie-outdoors_1303-18939.jpg",
    "email": "rosa@gmail.com",
    "name": "Rosa Castillo"
  },
  {
    "id": 9,
    "image": "https://img.freepik.com/free-photo/portrait-smiling-handsome-man-blue-t-shirt_1303-160566.jpg",
    "email": "pedro@gmail.com",
    "name": "Pedro Sánchez"
  },
  {
    "id": 10,
    "image": "https://img.freepik.com/free-photo/beautiful-asian-woman-wearing-denim-overalls-hat-taking-selfie_273609-13365.jpg",
    "email": "carmen@gmail.com",
    "name": "Carmen López"
  }
];

export const Contactos = () => {
  return (
    <div className="w-full">
      <h3 className="font-quicksand text-xl">Mis Contactos</h3>
      <section className="flex justify-between items-center md:gap-8 gap-4 flex-wrap md:flex-nowrap mt-6">
        <SearchBar className="" />
        <button className="bg-primary text-white rounded-full flex w-[15rem] justify-center items-center gap-4 py-2 m-auto">
          <RiUserAddLine /> Agregar contacto
        </button>
      </section>
      <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
        {data.map((item)=>(

          <Contact key={item.id} image={item.image} email={item.email} name={item.name} />
        
        ))}
      </section>
    </div>
  );
};
