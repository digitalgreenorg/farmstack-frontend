const maxDepth = 5;

const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

const treeData = [
    {
        title: "section 1",
        expanded: true,
        type: "divison",
        divisonView: "h",
        children: [
            {
                title: "User Details",
                expanded: true,
                type: "section",
                headerView: "v",
                view: "form",
                children: [
                    {
                        title: "First Name",
                        serviceKey: "firstName",
                        subtitle: "",
                        type: "field"
                    },
                    {
                        title: "Last Name",
                        subtitle: "",
                        serviceKey: "lastName",
                        type: "field"
                    },
                    {
                        title: "Age",
                        subtitle: "",
                        serviceKey: "age",
                        type: "field"
                    },
                    {
                        title: "Blood Group",
                        subtitle: "",
                        serviceKey: "bloodGroup",
                        type: "field"
                    },
                    {
                        title: "DOB",
                        subtitle: "",
                        serviceKey: "dob",
                        type: "field"
                    },
                    {
                        title: "Phone Number",
                        subtitle: "",
                        serviceKey: "phoneNumber",
                        type: "field"
                    },
                    {
                        title: "E-mail",
                        subtitle: "",
                        type: "group",
                        children: [
                            {
                                title: "E-mail",
                                subtitle: "",
                                serviceKey: "email",
                                type: "field"
                            }
                        ]
                    }
                ]
            },
            {
                expanded: true,
                title: "User Address Details",
                type: "section",
                view: "table",
                headerView: "v",
                children: [
                    {
                        title: "Address 1#",
                        subtitle: "",
                        serviceKey: "address1",
                        type: "field"
                    },
                    {
                        title: "Address 2#",
                        subtitle: "",
                        serviceKey: "address2",
                        type: "field"
                    },
                    {
                        title: "City",
                        subtitle: "",
                        serviceKey: "  ",
                        type: "field"
                    },
                    {
                        title: "Region",
                        subtitle: "",
                        serviceKey: "region",
                        type: "field"
                    },
                    {
                        title: "Country",
                        subtitle: "",
                        type: "group",
                        children: [
                            {
                                title: "ZIP Code",
                                serviceKey: "zipCode",
                                subtitle: "",
                                type: "field"
                            }
                        ]
                    }
                ]
            },
            {
                title: "User Account Details",
                subtitle: "",
                headerView: "v",
                type: "section",
                view: "readonly",
                children: [
                    {
                        title: "Account NO",
                        subtitle: "",
                        serviceKey: "accountNo",
                        type: "field"
                    },
                    {
                        title: "Bank Name",
                        subtitle: "",
                        serviceKey: "bankName",
                        type: "field"
                    },
                    {
                        title: "Branch",
                        subtitle: "",
                        serviceKey: "branch",
                        type: "field"
                    },
                    {
                        title: "IFSC Code",
                        subtitle: "",
                        serviceKey: "ifscCode",
                        type: "field"
                    },
                    {
                        title: "Account Type",
                        subtitle: "",
                        serviceKey: "accountType",
                        type: "field"
                    },
                    {
                        title: "Customer ID",
                        subtitle: "",
                        serviceKey: "customerId",
                        type: "field"
                    }
                ]
            }
        ]
    },
    {
        title: "section 2",
        expanded: false,
        type: "divison",
        divisonView: "h",
        children: [
            {
                title: "User Details",
                expanded: true,
                type: "section",
                headerView: "v",
                view: "form",
                children: [
                    {
                        title: "First Name",
                        serviceKey: "firstName",
                        subtitle: "",
                        type: "field"
                    },
                    {
                        title: "Last Name",
                        subtitle: "",
                        serviceKey: "lastName",
                        type: "field"
                    },
                    {
                        title: "Age",
                        subtitle: "",
                        serviceKey: "age",
                        type: "field"
                    },
                    {
                        title: "Blood Group",
                        subtitle: "",
                        serviceKey: "bloodGroup",
                        type: "field"
                    },
                    {
                        title: "DOB",
                        subtitle: "",
                        serviceKey: "dob",
                        type: "field"
                    },
                    {
                        title: "Phone Number",
                        subtitle: "",
                        serviceKey: "phoneNumber",
                        type: "field"
                    },
                    {
                        title: "E-mail",
                        subtitle: "",
                        type: "group",
                        children: [
                            {
                                title: "E-mail",
                                subtitle: "",
                                serviceKey: "email",
                                type: "field"
                            }
                        ]
                    }
                ]
            },
            {
                expanded: true,
                title: "User Address Details",
                type: "section",
                view: "table",
                headerView: "v",
                children: [
                    {
                        title: "Address 1#",
                        subtitle: "",
                        serviceKey: "address1",
                        type: "field"
                    },
                    {
                        title: "Address 2#",
                        subtitle: "",
                        serviceKey: "address2",
                        type: "field"
                    },
                    {
                        title: "City",
                        subtitle: "",
                        serviceKey: "  ",
                        type: "field"
                    },
                    {
                        title: "Region",
                        subtitle: "",
                        serviceKey: "region",
                        type: "field"
                    },
                    {
                        title: "Country",
                        subtitle: "",
                        type: "group",
                        children: [
                            {
                                title: "ZIP Code",
                                serviceKey: "zipCode",
                                subtitle: "",
                                type: "field"
                            }
                        ]
                    }
                ]
            },
            {
                title: "User Account Details",
                subtitle: "",
                headerView: "v",
                type: "section",
                view: "readonly",
                children: [
                    {
                        title: "Account NO",
                        subtitle: "",
                        serviceKey: "accountNo",
                        type: "field"
                    },
                    {
                        title: "Bank Name",
                        subtitle: "",
                        serviceKey: "bankName",
                        type: "field"
                    },
                    {
                        title: "Branch",
                        subtitle: "",
                        serviceKey: "branch",
                        type: "field"
                    },
                    {
                        title: "IFSC Code",
                        subtitle: "",
                        serviceKey: "ifscCode",
                        type: "field"
                    },
                    {
                        title: "Account type",
                        subtitle: "",
                        serviceKey: "accountType",
                        type: "field"
                    },
                    {
                        title: "Customer ID",
                        subtitle: "",
                        serviceKey: "customerId",
                        type: "field"
                    }
                ]
            }
        ]
    }
];

export default treeData;
