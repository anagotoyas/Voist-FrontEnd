

function NotFound() {
    return (
      // <div className="h-[calc(100vh-64px)] flex justify-center items-center flex-col">
      //   <Card>
      //     <h1 className="text-4xl font-bold my-2">Page Not Found</h1>
      //     <h3 className="text-2xl">404</h3>
      //     <Link to="/">Go back home</Link>
      //   </Card>
      // </div>
      <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
    <div className="rounded-lg bg-white p-8 text-center shadow-xl">
      <h1 className="mb-4 text-4xl font-bold text-black">404</h1>
      <p className="text-gray-600">Oops! No pudimos encontrar lo que buscas.</p>
      <a href="/" className="mt-4 inline-block rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-blue-500"> Volver al inicio </a>
    </div>
  </div>
    );
  }
  
  export default NotFound;
  