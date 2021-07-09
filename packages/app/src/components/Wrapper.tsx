import Navigation from "./Navigation";

const Wrapper: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default Wrapper;
