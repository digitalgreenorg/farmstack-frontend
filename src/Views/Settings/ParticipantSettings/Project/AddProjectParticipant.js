import React from "react";
import ProjectForm from "../../../../Components/Settings/Participants/Project/ProjectForm";

import {
  validateInputField,
  handleUnwantedSpace,
} from "../../../../Utils/Common";
import RegexConstants from "../../../../Constants/RegexConstants";

export default function AddProjectParticipant() {
  const [department, setdepartment] = React.useState("");
  const [project, setproject] = React.useState("");
  const [description, setdescription] = React.useState("");

  const [department_variable, setdepartment_variable] = React.useState([]);

  const handleChangeDepartment = (event) => {
    console.log(event.target.value);
    setdepartment(event.target.value);
  };
  const handleChangeProject = (e) => {
    validateInputField(e.target.value, RegexConstants.connector_name)
      ? setproject(e.target.value)
      : e.preventDefault();

    console.log(e.target.value);

    // setproject(e.target.value);
  };

  const handleChangedescription = (e) => {
    console.log(e.target.value);
    validateInputField(e.target.value, RegexConstants.DES_SET_REGEX)
      ? setdescription(e.target.value)
      : e.preventDefault();
  };
  const handledescriptionKeydown = (e) => {
    handleUnwantedSpace(description, e);
  };
  return (
    <>
      <ProjectForm
        title={"Add a project"}
        department={department}
        project={project}
        description={description}
        department_variable={department_variable}
        handleChangeDepartment={handleChangeDepartment}
        handleChangeProject={handleChangeProject}
        handleChangedescription={handleChangedescription}
        handledescriptionKeydown={handledescriptionKeydown}
      />
    </>
  );
}
