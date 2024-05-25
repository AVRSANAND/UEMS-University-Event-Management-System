import React , { useContext } from "react";
import myContext from "../../../context/data/myContext";

function AddEvent() {

  const context = useContext(myContext);
  const {events, setEvents, addEvent} = context;

  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Event
            </h1>
          </div>
          <div>
            <input
              type="text"
              value={events.title}
              onChange={(e)=>setEvents({...events, title: e.target.value})}
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Event title"
            />
          </div>
          <div>
            <input
              type="text"
              value={events.price}
              onChange={(e)=>setEvents({...events, price: e.target.value})}
              name="price"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Event price"
            />
          </div>
          <div>
            <input
              type="text"
              value={events.imageUrl}
              onChange={(e)=>setEvents({...events, imageUrl: e.target.value})}
              name="imageUrl"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Event imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              value={events.category}
              onChange={(e)=>setEvents({...events, category: e.target.value})}
              name="category"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Event category"
            />
          </div>
          <div>
            <input
              type="text"
              value={events.clubname}
              onChange={(e)=>setEvents({...events, clubname: e.target.value})}
              name="clubname"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Club Name"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="10"
              value={events.description}
              onChange={(e)=>setEvents({...events, description: e.target.value})}
              name="description"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Event Description"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button 
            onClick={addEvent}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
