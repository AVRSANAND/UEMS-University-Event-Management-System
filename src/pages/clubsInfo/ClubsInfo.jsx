import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import image1 from "../../assets/images/clubs/img-2.png";

import Card from "../../components/cards/Cards";

function ClubsInfo() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="GUSAC"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={image1}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CULTURAL CLUB
              </h2>
              <h1
                className="text-gray-900 text-3xl title-font font-medium mb-1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                GUSAC
              </h1>
              <div className="flex mb-4">
                <span className="flex py-2 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed border-b-2 mb-5 pb-5">
                "Embrace Diversity, Embrace Fun: GUSAC - Celebrating Culture
                Together!"
              </p>
              <p className="leading-relaxed border-b-2 mb-5 pb-5">
                "GUSAC is your gateway to a vibrant cultural tapestry on campus.
                Dedicated to fostering inclusivity and celebrating diversity,
                GUSAC hosts a myriad of engaging events every semester, from
                cultural showcases to themed parties. Join us in creating
                unforgettable memories and embracing the rich tapestry of
                cultures represented in our university community."
              </p>
            </div>
          </div>
        </div>
        <Card />
      </section>
    </Layout>
  );
}

export default ClubsInfo;
