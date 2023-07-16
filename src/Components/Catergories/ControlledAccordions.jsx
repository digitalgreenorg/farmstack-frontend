import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import global_styles from "../../Assets/CSS/global.module.css";
import EditIcon from "@mui/icons-material/Edit";
import CustomDeletePopper from "../DeletePopper/CustomDeletePopper";
export default function ControlledAccordions(props) {
  const {
    data,
    Component,
    index,
    heading,
    accordionDelete,
    isHeadEditing,
    handleEditHeading,
    onOpenHideDelete,
    showPopper,
    getListOfPolicies,
    deletePolicyDetail,
  } = props;
  const [expanded, setExpanded] = React.useState(-1);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : -1);
    setOpen(false);
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDeletePopper = (event) => {
    console.log("event", event.currentTarget, event);
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const closePopper = (e) => {
    e.stopPropagation();
    setExpanded(-1);
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div
      // onClick={(e) => {
      //   let curEle = e.currentTarget;
      //   let deleteButton = curEle.querySelector("#delete-button-category");
      //   console.log("on open", curEle, deleteButton);
      //   showPopper(deleteButton);
      // }}
      className="accordions_in_onboarding"
      style={{ margin: "10px 0px" }}
    >
      <Accordion
        className={global_styles.break_word}
        expanded={expanded === index}
        onChange={handleChange(index)}
        id="condtrolled_accordion"
        sx={{
          // margin: expanded === "index" ? "20px 0px" : "10px 0px",
          boxShadow:
            expanded === "index"
              ? "0px 20px 40px -4px rgba(145, 158, 171, 0.16)"
              : "",
          borderRadius: expanded === "index" ? "8px" : "",
          border: expanded === "index" ? "1px solid #919EAB" : "",
          // "&.MuiAccordionSummary-content": {
          //   alignItems: "center",
          // },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="indexbh-content"
          id={`accordian-${index}-header`}
          onClick={(e) => handleEditHeading(false, e, index)}
        >
          <Typography
            data-testid="accordion"
            className={global_styles.bold600 + " " + global_styles.size24}
            sx={{
              width: "95%",
              // flexShrink: 0,
              // textAlign: "left",
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "space-between",
              marginRight: "20px",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "800px",
            }}
          >
            {heading}{" "}
          </Typography>
          {isHeadEditing ? (
            <EditIcon
              style={{ margin: "0 10px" }}
              fontSize="small"
              onClick={(e) => handleEditHeading(true, e, index)}
              id={`${index}edit-icon`}
            />
          ) : (
            ""
          )}
          {console.log(
            onOpenHideDelete,
            !anchorEl,
            !open,
            expanded,
            index,
            "here"
          )}
          {expanded == index ? (
            ""
          ) : (
            <>
              <CustomDeletePopper
                DeleteItem={"File"}
                anchorEl={anchorEl}
                handleDelete={(e) => {
                  e.stopPropagation();
                  accordionDelete(e, index);
                  setAnchorEl(null); // Reset anchorEl to null
                  setOpen(false); // Reset open to false
                }}
                id="delete-popper-icon"
                open={open}
                closePopper={closePopper}
                deletePopperId={`${index}-delete-popper-accordian-button`}
                cancelPopperId={`${index}-cancel-popper-accordian-button`}
              />
              <DeleteOutlineIcon
                onClick={handleDeletePopper}
                id={`${index}delete-icon`}
              />
            </>
          )}
        </AccordionSummary>
        <AccordionDetails id={`${index}-accordian-detail`}>
          {Component && (
            <Component
              data={data}
              index={index}
              setExpanded={setExpanded}
              getListOfPolicies={getListOfPolicies}
              deletePolicyDetail={accordionDelete}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
