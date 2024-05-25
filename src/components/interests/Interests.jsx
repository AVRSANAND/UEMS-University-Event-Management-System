import { useState, useEffect, useContext } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";
import myContext from "../../context/data/myContext";

const YourComponent = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const [interests, setInterests] = useState({
    interest1: null,
    interest2: null,
    interest3: null,
  });

  const [componentVisible, setComponentVisible] = useState(true);

  const handleInterestChange = (e, interestNumber) => {
    setInterests({ ...interests, [interestNumber]: e.target.value });
  };

  const addInterest = async () => {
    if (
      interests.interest1 == null ||
      interests.interest2 == null ||
      interests.interest3 == null
    ) {
      return toast.error("Please fill all fields");
    }
    try {
      const interestRef = collection(fireDB, "interests");
      await addDoc(interestRef, interests);
      toast.success("Interest Added Successfully");
      setInterests({
        interest1: null,
        interest2: null,
        interest3: null,
      });
      setComponentVisible(false);
      localStorage.setItem(
        "disableComponentUntil",
        Date.now() + 15 * 24 * 60 * 60 * 1000
      ); // Disable for 15 days
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const disableUntil = localStorage.getItem("disableComponentUntil");
    if (disableUntil && Date.now() < parseInt(disableUntil, 10)) {
      setComponentVisible(false);
    }
  }, []);

  if (!componentVisible) {
    return (
      <div className="container px-5 py-8 md:py-8 mx-auto">
        <div
          class="lg:w-1/2 w-full mb-6 lg:mb-10"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Input Interests
          </h1>
          <div class="h-1 w-20 mb-6 bg-pink-600 rounded"></div>
          Component is disabled for 15 days after successful addition of interests.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-5 py-8 md:py-8 mx-auto">
      <div
        class="lg:w-1/2 w-full mb-6 lg:mb-10"
        style={{ color: mode === "dark" ? "white" : "" }}
      >
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          Input Interests
        </h1>
        <div class="h-1 w-20 bg-pink-600 rounded"></div>

        <label htmlFor="interest1" className="block mb-2">
          Interest 1:
        </label>
        <select
          id="interest1"
          value={interests.interest1}
          onChange={(e) => handleInterestChange(e, "interest1")}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select an interest</option>
          <option value="Coding">Coding</option>
          <option value="Workshop">Workshop</option>
          <option value="IndoorSports">IndoorSports</option>
          <option value="Sports">Sports</option>
          <option value="Esports">Esports</option>
          <option value="Dancing">Dancing</option>
          <option value="Cultural">Cultural</option>
          <option value="Music">Music</option>
          <option value="Theatre">Theatre</option>

        </select>

        <label htmlFor="interest2" className="block mb-2">
          Interest 2:
        </label>
        <select
          id="interest2"
          value={interests.interest2}
          onChange={(e) => handleInterestChange(e, "interest2")}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select an interest</option>
          <option value="Coding">Coding</option>
          <option value="Workshop">Workshop</option>
          <option value="IndoorSports">IndoorSports</option>
          <option value="Sports">Sports</option>
          <option value="Esports">Esports</option>
          <option value="Dancing">Dancing</option>
          <option value="Cultural">Cultural</option>
          <option value="Music">Music</option>
          <option value="Theatre">Theatre</option>
          
        </select>

        <label htmlFor="interest3" className="block mb-2">
          Interest 3:
        </label>
        <select
          id="interest3"
          value={interests.interest3}
          onChange={(e) => handleInterestChange(e, "interest3")}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select an interest</option>
          <option value="IoT">IoT</option>
          <option value="ARVR">ARVR</option>
          <option value="AI">AI</option>
          <option value="ML">ML</option>
          <option value="Cloud">Cloud</option>
          <option value="WebDev">WebDev</option>
          <option value="UI/UX">UI/UX</option>
          <option value="AWS">AWS</option>
          <option value="DevOps">DevOps</option>
          <option value="DataScience">DataScience</option>
          <option value="DataVisualization">DataVisualization</option>
          <option value="CyberSecurity">CyberSecurity</option>
        </select>

        <button onClick={addInterest}>Add Interests</button>
      </div>
    </div>
  );
};

export default YourComponent;
