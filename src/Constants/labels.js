const labels = {
  en: {
    common: {
      submit: "Submit",
      cancel: "Cancel",
      update: "Update",
      back: "Back",
      finishLater: "Finish later",
    },
    login: {
      signup_header: "Let's build a datahub together",
    },
    navbar: {
      Participants: "Participants",
      NetworkActivity: "Network Activity",
      Support: "Support",
      datasets: "Datasets",
      connectors: "Connectors",
      Settings: "Settings",
      Signout: "Sign out",
      Signin: "Sign In",
      helpline: "1800 1100 1200 1912",
      legal: "Legal",
      contact: "Contact",
      apply_for_participant: "Apply for Participant",
    },
    addparticipants: {
      first_heading: "Add Participants organisation details",
      second_heading: "Add Participants root user details",
      third_heading: "Add Participant's subscription length to the datahub",
      organisation_name: "Organisation Name",
      email: "Email Id",
      website_link: "Website Link",
      organisation_address: "Organisation Address",
      country: "Country",
      pincode: "Pincode",
      first_name: "First Name",
      last_name: "Last Name",
      contact_number: "Contact Number",
      subscripiton_length: "Subscription Length",
      firstText: "Add new Participant",
      secondText:
        "Add details about your dataset and make discoverable to other participants in our network. “Dummy Data”",
    },
    editparticipants: {
      first_heading: "Edit Participants Organisation Details",
      second_heading: "Edit Participants Root User Details",
      third_heading: "Edit Participant's Subscription Length to the Datahub",
    },
    viewparticipants: {
      first_heading: "Participant organisation details",
      second_heading: "Participant root user details",
      third_heading: "Participant's subscription length to the datahub",
      organisation_name: "Organisation Name",
      email: "Email",
      website_link: "Website Link",
      organisation_address: "Organisation Address",
      country: "Country",
      pincode: "PIN code",
      first_name: "First Name",
      last_name: "Last Name",
      contact_number: "Contact Number",
      subscripiton_length: "Subscription Length",
      delete_participant: "Delete Participants",
      delete_msg: "Are you sure you want to delete the participant?",
      second_delete_msg:
        "This action will delete the participant’s account from the system including her organisation details, users, datasets and connectors.",
      third_delete_msg:
        "The participant will no longer be able to use her account in the datahub.",
    },
    inviteParticipants: {
      first_heading: "Invite participants",
      second_heading: "Invite message",
    },
    settings: {
      heading: "Add new member",
      editheading: "Edit member details",
      email: "Email",
      first_name: "First Name",
      last_name: "Last Name",
      role: "Role",
      delete_member: "Delete Member",
      delete_msg: "Are you sure you want to delete the team member?",
      second_delete_msg:
        "This action will delete the member’s account from the system.",
      third_delete_msg:
        "The member will no longer be able to use her account in the datahub.",
      firstText: "Add new Member",
      secondText:
        "Add details about your dataset and make discoverable to other participants in our network.",
    },
    account_settings: {
      email: "Email",
      first_name: "First Name",
      last_name: "Last Name",
      contact: "Contact Number",
    },
    org_settings: {
      email: "Organization Mail ID",
      org_name: "Organization Name",
      address: "Organization Address",
      contact: "Organization Contact Number",
      city: "City",
      pincode: "PIN Code",
      org_des: "Organization Description",
    },

    support: {
      heading: "List of Tickets",
      filter: "Filter",
      all: "All",
      Status: "Status",
      Category: "Category",
      open_status: "Open Status",
      close_status: "Close Status",
      hold_status: "Hold Status",
      User_Accounts: "User Accounts",
      Datasets: "Datasets",
      Usage_Policy: "Usage Policy",
      Certificate: "Certificate",
      Connectors: "Connectors",
      Others: "Others",
      date: "By Date",
    },
    sessiontimeout: {
      heading: "Session has expired",
      secondmainheading: "Oops!",
      thirdmainheading: "Your login session has expired, please sign in again.",
    },
    error: {
      heading: "Oops!",
      secondmainheading: "Someting went wrong!",
      thirdmainheading:
        "Please try again later or contact to support@farmstack.co",
    },
    dataset: {
      name: "Dataset Name",
      description: "Description *",
      Data_Category: "Data Category *",
      Crop_data: "Crop data",
      Practice_data: "Practice data",
      Farmer_profile: "Farmer profile",
      Land_records: "Land records",
      Cultivation_data: "Cultivation data",
      Soil_data: "Soil data",
      Weather_data: "Weather data",
      Research_data: "Research data",
      Geography: "Geography",
      Crop_Detail: "Crop Detail",
      data: "Age of Actual Data",
      Constantly_updating: "Constantly updating",
      three: "3 months",
      six: "6 months",
      nine: "9 months",
      twelve: "12 months",
      Interval: "Data Capture Interval",
      Start_Date: "Start Date ",
      End_Date: "End Date ",
      Records: " Size of Actual Data (Records)",
      Availablity: "Connector Availablity",
      Available: "Available",
      Not_Available: "Not Available",
      Upload_dataset: " Upload Sample Datasets *",

      filter: "Filter",
      geography: "Geography",
      age: "Age",
      crop: "Crop",
      search: "Search",
      datasets: "Datasets",
      enabled: "Enabled",
      disbaled: "Disabled",
      status: "Status",
      for_review: "For Review",
      rejected: "Rejected",
      approved: "Approved",
      organisation_name: "Organization Name",
      published_on: "Published On",
      age_of_data: "Age of Data",
      crop_details: "Crop Details",
      add_dataset: "Add New Dataset",
      add_dataset_text:
        "Add details about your dataset and make discoverable to other participants in our network.",
      no_dataset_text1: "There are no Datasets at this moment !",
      no_dataset_text2: "Add your Dataset.",
    },
    connector: {
      filter: "Filter",
      department: "Department",
      projects: "Projects",
      connector_type: "Connector Type",
      connector_status: "Connector Status",
      search: "Search",

      project: "Project",
      status: "Status",
      connector_name: "Connector Name",
      project_name: "Project Name",
      department_name: "Department Name",
      configure_connector: "Configure a new Connector",
      configure_connector_text:
        "Configure a new Connector to Provide and Consume data securely.",
      no_connector_text1: "There are no Connectors configured at this moment !",
      no_connector_text2: "Configure new Connector.",
      no_dataset_text1:
        "You have not created a dataset for which you can create a connector",
      click_here: "Click Here",
      no_dataset_text2: " to get started!",

      status_install_certificate: "Install Certificate",
      status_unpaired: "Unpaired",
      status_awaiting_approval: "Awaiting Approval",
      status_paired: "Paired",
      status_pairing_request_received: "Pairing Request Received",
      status_rejected: "Rejected",
    },
    guestUser: {
      contact_us: "Contact Us",
      touch_with_us: "Touch with us",
      datahub_admin_name: "Datahub admin name",
      datahub_admin_email: "Datahub admin email",
      datahub_admin_phone: "Datahub admin phone",
      organization_name: " Organization name",
      country: "Country",
      city: "City",
      address: "Address",
      pin_code: "PIN Code",
      email: "Email",
      phone: "Phone",
      website: "Website",
      say_hello: "Say Hello!",
      first_name: "First Name",
      last_name: "Last Name",
      contact_number: "Contact Number",
      subject: "Subject",
      become_a_participant: "Become a Participant ( Data Provider / Consumer )",
      other_queries: "Other queries ( Describe your query in detail )",
      describe_your_query: "Describe your query",
      submit: "Submit",
      cancel: "Cancel",
    },
    connector_form: {
      connectorType: " Connector Type * ",
      selectDataset: "Select Dataset *",
      connectorName: "Connector Name ",
      addDepartment: " + Add Department",
      addProject: " + Add Project ",
      selectDepartment: "  Select Department *",
      selectProject: " Select Project *",
      docker: "Docker Image url  ",
      port: "Application Port ",
      des: "Description",
      submit: "Save and Request Certificate",
    },
    pair_with_component: {
      pair_with: "Pair with",
      connector_name: "Connector Name",
      dataset_name: "Dataset Name",
      department_name: "Department Name",
      project_name: "Project Name",
      certificate_status: "Certificate Status",
      docker_image_url: "Docker Image url",
      application_port: "Application Port",
      hash_usage_policy: "Hash (usage Policy)",
      participant_org_name: "Participant organisation name",
      participant_org_website: "Participant organisation website",
      send_pairing_request: "Send Pairing Request",
      cancel: "Cancel",
    },
  },
};
export default labels;
