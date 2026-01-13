import { useState } from "react";
import { createNewGig } from "../api/gig.api";

const CreateGig = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
      await createNewGig(formData);
       
      onSuccess(); 
  };

  return (
    <form  onSubmit={ handleSubmit} className="flex flex-col border p-2 m-3 items-center">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className=" p-1 text-center m-1 bg-[#f8f7f7] rounded-2xl"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
         className=" text-center m-1 p-4 bg-[#f8f7f7] rounded-2xl"
      />

      <input
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Budget"
        required
         className=" p-1 text-center m-1 bg-[#f8f7f7] rounded-2xl"
      />

      <button type="submit" className=" border mt-4 p-2 pl-5 pr-5 mb-4 bg-[#d7d6f1]">Post Job</button>
    </form>

   
  );
};

export default CreateGig;
