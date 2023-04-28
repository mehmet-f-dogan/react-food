const Footer = () => {
  return (
    <footer className="py-8 flex flex-col gap-3 items-center bg-gray-700 text-white ">
      <h2 className="text-2xl font-bold">ReactFood</h2>
      <p>
        {new Date().getFullYear()} | ReactFood |{" "}
        <a href="https://mehmetfd.dev" className="hover:text-black">
          Mehmet F. Dogan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
