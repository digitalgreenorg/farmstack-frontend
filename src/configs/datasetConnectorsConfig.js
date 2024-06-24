module.exports = {
  "datasetConnectors": [
    {
      "label": "FILE UPLOAD",
      "component": "FileUpload",
      "path": "./src/components/dataset-connectors/file_upload.js",
      "enable": true,
      "fileName": "file_upload",
      "key": "file_upload"
    },
    {
      "label": "MYSQL",
      "component": "Mysql",
      "path": "./src/components/dataset-connectors/mysql.js",
      "enable": true,
      "fileName": "mysql",
      "key": "mysql"
    },
    {
      "label": "POSTGRES",
      "component": "Postgresql",
      "path": "./src/components/dataset-connectors/postgresql.js",
      "enable": true,
      "fileName": "postgresql",
      "key": "postgresql"
    },
    {
      "label": "REST API",
      "component": "RestApi",
      "path": "./src/components/dataset-connectors/rest_api.js",
      "enable": true,
      "fileName": "rest_api",
      "key": "rest_api"
    }
  ]
};
