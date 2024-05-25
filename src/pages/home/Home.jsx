import React from "react";
import Layout from "../../components/layout/Layout";
import Herosection from "../../components/herosection/Herosection";
import Card from "../../components/cards/Cards";
import ClubCard from "../../components/cards/ClubCards";
import { Link } from "react-router-dom";
import Interests from "../../components/interests/Interests";

function Home() {

  return (
    <Layout>
      <Herosection />
      <Card />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/events'}>
          <button className=' bg-gray-300 mt-10 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <ClubCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/clubs'}>
          <button className=' bg-gray-300 mt-10 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Interests/>
    </Layout>
  );
}

export default Home;
