import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FC } from "react";

interface ILayout {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Layout: FC<ILayout> = ({ handleSearch, search }) => {
  return (
    <>
      <Header search={search} handleSearch={handleSearch} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
