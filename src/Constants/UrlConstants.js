const UrlConstant = {
  base_url: "https://datahubtest.farmstack.co/be/",
  base_url_without_slash: "https://datahubtest.farmstack.co/be",
  //base_url: "https://27e5-27-7-120-49.in.ngrok.io/",
  //base_url_without_slash: "https://27e5-27-7-120-49.in.ngrok.io",
  login: "accounts/login/",
  otp: "accounts/otp/",
  participant: "datahub/participant/",
  support: "datahub/support/filters_tickets/",
  resolution: "datahub/support/",
  inviteparticipant: "datahub/send_invite/",
  team_member: "datahub/team_member/",
  resend_otp: "accounts/resend_otp/",
  org: "datahub/organization/",
  profile: "accounts/register/",
  branding: "datahub/theme/",
  policies_files_upload: "datahub/drop_document/",
  policies_save_upload: "datahub/save_documents/",
  delete_policies_drop_document: "datahub/drop_document/delete/",
  dataset_filter: "datahub/datasets/filters_data/",
  dataset_filter_participant: "participant/datasets/filters_data/",
  dataset_list: "datahub/datasets/dataset_filters/",
  dataset_participant_list: "participant/datasets/dataset_filters/",
  // dataset_list: 'datahub/datasets/',
  dataset: "datahub/datasets/",
  datasetparticipant: "participant/datasets/",
  onboarded: "accounts/login/onboarded/",

  guest_organization_details: "microsite/admin_organization/",
  guest_dataset_listing: "microsite/datasets/",
  guest_dataset_filters: "microsite/datasets/filters_data/",
  guest_dataset_filtered_data: "microsite/datasets/dataset_filters/",
  connector_filter: 'participant/connectors/filters_data/',
  connector_list: 'participant/connectors/connectors_filters/',
  microsite_contact_form: "microsite/contact_form",
  microsite_admin_organization: "microsite/admin_organization",
  list_of_dataset: "participant/datasets/list_of_datasets/",
  departments_connector_list: "participant/department/",
  project_list: "participant/project/",
  connector: "participant/connectors/",
  microsite_legal_documents: "/microsite/legal_documents/",
  microsite_theme: "/microsite/theme/",
};

export default UrlConstant;
