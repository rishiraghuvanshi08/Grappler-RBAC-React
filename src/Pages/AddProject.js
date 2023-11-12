import React from "react";
import { addProjectData } from "../Slices/ProjectSlices";
import AddName from "../Components/AddName";

const AddProject = () => {
  return (
    <>
     <AddName value = "ADD PROJECT" method = {addProjectData} navigator = "projects"/> 
    </>
  );
};

export default AddProject;
