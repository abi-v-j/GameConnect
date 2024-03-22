import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import Charts from "../../components/charts/Charts";

const Home = () => {
  return (
    <>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="charts">
        <Featured />
        <Charts />

      </div>
    </>

  );
};

export default Home;
