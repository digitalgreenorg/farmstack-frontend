import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import OnboardingFooter from "../../../Components/Footer/OnboardingFooter";
import new_farmstack_main_logo from "../../../Assets/Img/Farmstack V2.0/new_farmstack_main_logo.svg";
import styles from "./home_screen.module.css";
import VerifyEmail from "../../../Components/NewOnboarding/VerifyEmail";
import ProfileDetails from "../../../Components/NewOnboarding/ProfileDetails";
import OrganizationDetails from "../../../Components/NewOnboarding/OrganizationDetails";
import CompanyPolicies from "../../../Components/NewOnboarding/CompanyPolicies";
import CategoryDetails from "../../../Components/NewOnboarding/CategoryDetails";
import DatapointDetails from "../../../Components/NewOnboarding/DatapointDetails";
import LetsGetStarted from "../../../Components/NewOnboarding/LetsGetStarted";
import global_styles from "../../../Assets/CSS/global.module.css";
import { CSSTransition } from "react-transition-group";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#00AB55",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#00AB55",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#00AB55",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//     [`&.${stepConnectorClasses.alternativeLabel}`]: {
//         top: 22,
//     },
//     [`&.${stepConnectorClasses.active}`]: {
//         [`& .${stepConnectorClasses.line}`]: {
//             backgroundImage:
//                 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//         },
//     },
//     [`&.${stepConnectorClasses.completed}`]: {
//         [`& .${stepConnectorClasses.line}`]: {
//             backgroundImage:
//                 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//         },
//     },
//     [`& .${stepConnectorClasses.line}`]: {
//         height: 3,
//         border: 0,
//         backgroundColor:
//             theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//         borderRadius: 1,
//     },
// }));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  {
    label: "Verify Email ID",
    subLabel: "Step 1",
    completed: false,
  },
  {
    label: "Profile Details",
    subLabel: "Step 2",
    completed: false,
  },
  {
    label: "Organisation Details",
    subLabel: "Step 3",
    completed: false,
  },
  {
    label: "Company Policies",
    subLabel: "Step 4",
    completed: false,
  },
  {
    label: "Category Details",
    subLabel: "Step 5",
    completed: false,
  },
  {
    label: "DataPoint Details",
    subLabel: "Step 6",
    completed: false,
  },
];

export default function OnBoarding() {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [skipped, setSkipped] = React.useState(new Set());
  let dev_mode =
    Window?.ENV_VARS?.REACT_APP_DEV_MODE || process.env.REACT_APP_DEV_MODE;
  console.log(dev_mode);
  localStorage.setItem("dev_mode", dev_mode);
  return (
    <Stack
      className={
        styles.main_onboarding_box +
        " " +
        global_styles.font_family +
        " " +
        "mainOnboardingParent"
      }
      sx={{ width: "100%" }}
    >
      <div className={styles.farmstack_logo}>
        <img src={new_farmstack_main_logo} alt="Farmstack" />
      </div>
      {activeStep >= 0 && (
        <Stepper
          className={
            styles.steppers + " " + global_styles.font_family + " " + "stepper_"
          }
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label.label}>
              <StepLabel
                onClick={() => dev_mode && setActiveStep(index)}
                classes={styles.steps_label}
                StepIconComponent={QontoStepIcon}
              >
                Step {" " + (index + 1)} <br />
                {label.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {activeStep >= 0 && (
        <div className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. "Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      )}
      <CSSTransition
        appear={activeStep === -1}
        in={activeStep === -1}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <LetsGetStarted setActiveStep={setActiveStep} />
      </CSSTransition>
      <CSSTransition
        in={activeStep === 0}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <VerifyEmail setActiveStep={setActiveStep} />
      </CSSTransition>
      <CSSTransition
        in={activeStep === 1}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <ProfileDetails setActiveStep={setActiveStep} />
      </CSSTransition>
      <CSSTransition
        in={activeStep === 2}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <OrganizationDetails setActiveStep={setActiveStep} />
      </CSSTransition>
      <CSSTransition
        in={activeStep === 3}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <CompanyPolicies setActiveStep={setActiveStep} />
      </CSSTransition>
      <CSSTransition
        in={activeStep === 4}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      >
        <CategoryDetails setActiveStep={setActiveStep} />
      </CSSTransition>

      {activeStep == 5 && (
        <CSSTransition
          in={activeStep === 5}
          timeout={{
            appear: 600,
            enter: 700,
            exit: 100,
          }}
          classNames="step"
          unmountOnExit={true}
        >
          <DatapointDetails setActiveStep={setActiveStep} />
        </CSSTransition>
      )}

      <OnboardingFooter />
    </Stack>
  );
}
