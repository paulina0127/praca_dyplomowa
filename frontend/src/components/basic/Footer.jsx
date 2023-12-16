const Footer = () => {
  return (
    <footer className="sticky left-0 top-0 flex w-full items-center justify-center gap-5 bg-rosewater px-10 py-5">
      <img
        src={require("../../assets/logo.png")}
        alt="logo"
        className="mb-2 h-12"
      />
      <div>
        <p>+48 000 000 000</p>
        <p>kontakt@adoptable.pl</p>
      </div>
    </footer>
  );
};

export default Footer;
