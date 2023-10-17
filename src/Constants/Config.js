const CONFIG = {
  logo: {
    is_primary_logo_required: true, // logo which is uploaded by organisation in the setting or onboarding
    is_secondary_logo_required: false, // the harcoded org logo secondary_logo_link
    secondary_logo_link: require("../Assets/Img/Static Logo/primary_logo.png"), // if secondary logo is required then the path of the logo should be provided here
    is_technical_partner_required: true, // technical partners logo if required
  },
  roles: {
    is_costeward_required: true,
  },
  style: {
    font_family: "Montserrat",
    primary_color: "",
    secondary_color: "",
  },
};

export default CONFIG;
