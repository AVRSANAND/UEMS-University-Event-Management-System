import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [events, setEvents] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    clubname: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Add Events Section
  const addEvent = async () => {
    if (
      events.title == null ||
      events.price == null ||
      events.imageUrl == null ||
      events.category == null ||
      events.clubname == null ||
      events.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    setLoading(true);
    try {
      const eventRef = collection(fireDB, "events");
      
      await addDoc(eventRef, events);
      toast.success("Event Added Successfully");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
      getEventData();
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setEvents("");
  };

  const [event, setEvent] = useState([]);

  // Get event Data 
  const getEventData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "events"),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let eventsArray = [];
        QuerySnapshot.forEach((doc) => {
          eventsArray.push({ ...doc.data(), id: doc.id });
        });
        setEvent(eventsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  const edithandle = (item) => {
    setEvents(item);
  };

  // Get Clubs data 
  const [club, setClub] = useState([]);
  const [loading1, setLoading1] = useState(false);

  const getClubData = async () => {
    setLoading1(true);
    try {
      const q = query(
        collection(fireDB, "clubs"),
        orderBy("name")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let clubsArray = [];
        QuerySnapshot.forEach((doc) => {
          clubsArray.push({ ...doc.data(), id: doc.id });
        });
        setClub(clubsArray);
        setLoading1(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading1(false);
    }
  };

  useEffect(() => {
    getClubData();
  }, []);

  // Update event function

  const updateEvent = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "events", events.id), events);
      toast.success("Event Updated successfully");
      getEventData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setEvents("");
  };

  // Delete event function

  const deleteEvent = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "events", item.id), events);
      toast.success("Event Deleted successfully");
      getEventData();
      setLoading(false);
    } catch (error) {
      toast.success("Event Deleted Falied");
      setLoading(false);
      console.log(error);
    }
  };

  // Showing registered events in history

  const [history, setHistory] = useState([]);

  const getHistoryData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const historyArray = [];
      result.forEach((doc) => {
        historyArray.push(doc.data());
        setLoading(false);
      });
      setHistory(historyArray);
      console.log(historyArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filtering Events

  const [searchkey, setSearchkey] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    getEventData();
    getHistoryData();
    getUserData();
  }, []);


  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        events,
        setEvents,
        event,
        club,
        setClub,
        loading1,
        setLoading1,
        addEvent,
        edithandle,
        updateEvent,
        deleteEvent,
        history,
        user,
        searchkey,
        setSearchkey,
        filterClub,
        setFilterClub,
        filterCategory,
        setFilterCategory,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
