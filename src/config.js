//const config = require("./config.json");
const appConfig = window.globalConfig ;

//assign value to variables
export const PROJECT_ID = appConfig.projectId;
export const URL = appConfig.url;
export const API_ROOT = appConfig.apiRoot;
export const PYTHON_API_ROOT = appConfig.pythonapiRoot;
export const AIRFLOW_URL = appConfig.airflowUrl;
export const ENV_NAME = appConfig.envName;
export const ACCESS_GROUPS = appConfig.LDAPGroups;
export const CONTEXT = appConfig.contextpath;
export const SSO = appConfig.SSO;
export const DEEP_ANALYSIS_URL = appConfig.Deep_Analysis;
export const HEADER_DOMAIN_BASED = appConfig.HeaderDomainBased;  //SI-262 SOI Header Configuration 
export const SUMMARY_INSIGHTS = appConfig.summaryInsights;
export const INSIGHTS_ACTION = appConfig.insightsAction;
export const ACTION_EXPERIMENTS = appConfig.actionExperiments;

export const SSO_URL_GOOGLE = appConfig.SSO_URL_GOOGLE;
export const SSO_URL_OTHER = appConfig.SSO_URL_OTHER;
// export const ADVISOR_DASHBOARD_URL = appConfig.Advisor_Dashboard;
export const ADVISOR_DASHBOARD_URL1 = appConfig.advisor_dashboard1;
export const ADVISOR_DASHBOARD_URL2 = appConfig.advisor_dashboard2;
export const ADVISOR_DASHBOARD_URL3 = appConfig.advisor_dashboard3;
export const ADVISOR_DASHBOARD_REQ = appConfig.advisor_dashboard_required;
export const STATICMRM = appConfig.StaticMRM;
export const STATICRISK360 = appConfig.staticRisk360;
export const WEBSOCKETURL = appConfig.websocketUrl;
export const HeaderAcceptType = appConfig.HeaderAcceptType;
export const LOGO = appConfig.LOGO;
export const COHORT_HEADER = appConfig.cohort_header;
export const GATEWAYBASED = appConfig.GatewayBased;
export const GITCLIENTID = appConfig.GITCLIENTID;
export const PSP = appConfig.PSP;
export const TableHeader = appConfig.TableHeader;
export const s3Url = (page) => {
  
  let url = "";
  let s3 = appConfig.s3BaseUrl;

  switch (page) {
    case "inventory":
      url = `https://dynobkod43.${s3}`;
      break;

    case "monitor":
      url = `https://rzn34txz34.${s3}/`;
      break;

    case "addModel":
      url = `https://83q28b4hda.${s3}`;
      break;

    case "risk":
      url = `https://ugac94ag76.${s3}/`;
      break;

    default:
      break;
  }
  return url;
};

export const aws = {
  bucketName: "bpd-datalake-dev",
  dirName: "00Raw/datasets/parquet/MRM/modelRepository",
  region: "us-east-2",
  accessKeyId: "AKIA6RTOUGG5AIXEHFVP",
  secretAccessKey: "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",
};
export const globalData = {
  // websocketUrl: 'wss://risk360.incedolabs.com:3071'
  websocketUrl: WEBSOCKETURL ? WEBSOCKETURL : 'wss://idsp.incedolabs.com:3073',
  websocket:null,
}
