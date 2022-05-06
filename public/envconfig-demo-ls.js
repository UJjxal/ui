window.globalConfig = {
	projectId: 21,
	contextpath:'/demo-ls',
	url: '/demo-ls/',
	pythonapiRoot: 'https://idsp.incedolabs.com:3057/',
	apiRoot: 'https://idsp.incedolabs.com/ls-api/',
	airflowUrl: 'https://idsp.incedolabs.com:8080/',
	s3BaseUrl: '',
	envName: 'LS Demo',
	LDAPGroups: {
			'Admin': ['LightHouse-Admin', 'Admin', 'ADMIN', 'LH-Admin', 'LH-Admin01', 'LH-Admin02'],
			'Executive': ['Executive', 'LightHouse-Executive', 'LH-Executive', 'EXECUTIVE'],
			'Data Scientist': ['Data Scientist', 'LH-Data Scientist', 'Analyst', 'ANALYST'],
			'Data Engineering': ['Data Engineering'],
	},
	SSO:'',
	LOGO:"incedo_LightHouse.svg",
	HeaderDomainBased:false,					//SI-262 SOI Header Configuration 
	Deep_Analysis:"http://public.tableau.com/views/RegionalSampleWorkbook/Storms?:embed=yes&:tabs=yes&:toolbar=yes",
	summaryInsights: false,
	insightsAction: true,
	actionExperiments: true,
	SSO_URL_GOOGLE:"https://incedolighthouse.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://idsp.incedolabs.com/pe/?provider=cognito&response_type=TOKEN&client_id=1vnacc7dtb1qdcr7e2tqj2hb5d&scope=aws.cognito.signin.user.admin email openid phone profile",
	SSO_URL_OTHER:"https://incedolighthouse.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=onelogin&redirect_uri=https://idsp.incedolabs.com/pe/?provider=cognito&response_type=TOKEN&client_id=1vnacc7dtb1qdcr7e2tqj2hb5d&scope=aws.cognito.signin.user.admin email openid phone profile",
	
	advisor_dashboard_required:true,
	language_translator:true,
	StaticMRM:true,
	staticRisk360: true, // Set up static data for Risk360 dashboards
	HeaderAcceptType: null, // Setting Header Accept Type Value For Api Call in Risk360
	GatewayBased: true, // Combining Headerbar(Home), sidebar(submenu) - BK and LS
};