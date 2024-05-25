import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";


function Clubs() {
  const context = useContext(myContext);
  const {
    mode,
    club
  } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Layout>
        <section className="text-grey-600 body-font">
          <div className="container px-5 py-8 md:py-8 mx-auto">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
              <h1
                class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Explore Clubs
              </h1>
              <div class="h-1 w-20 bg-blue-600 rounded"></div>
            </div>

            <div className="flex flex-wrap -m-4">
              {club
                .map((item, index) => {
                  const {
                    name,
                    image,
                    type,
                    tagline,
                    description,
                    id,
                  } = item;
                  return (
                    <div className="p-4 md:w-1/4  drop-shadow-lg ">
                      <div
                        className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                        style={{
                          backgroundColor:
                            mode === "dark" ? "rgb(46 49 55)" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <div
                          onClick={() =>
                            (window.location.href = `/clubinfo/${id}`)
                          }
                          key={index}
                          className="flex justify-center cursor-pointer"
                        >
                          <img
                            className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                            src={image}
                            alt="blog"
                          />
                        </div>
                        <div className="p-5 border-t-2">
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            Club Type: {type}
                          </h2>
                          <h1
                            className="title-font text-lg font-medium text-gray-900 mb-3"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {name}
                          </h1>
                          <div className=" flex justify-center">
                            <button
                              onClick={() =>
                                (window.location.href = `/clubinfo/${id}`)
                              }
                              type="button"
                              className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                            >
                              Know More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Clubs;
