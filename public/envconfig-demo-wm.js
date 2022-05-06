window.globalConfig = {
	projectId: 110,
	contextpath:'/demo-wm',
	url: '/',
	apiRoot: 'https://idsp.incedolabs.com/wm-api/',
	airflowUrl: '',
	s3BaseUrl: '',
	envName: 'Wealth Management',
	LDAPGroups: {
			'Admin': ['LightHouse-Admin', 'Admin', 'ADMIN', 'LH-Admin', 'LH-Admin01', 'LH-Admin02'],
			'Executive': ['Executive', 'LightHouse-Executive', 'LH-Executive', 'EXECUTIVE'],
			'Data Scientist': ['Data Scientist', 'LH-Data Scientist', 'Analyst', 'ANALYST'],
			'Data Engineering': ['Data Engineering'],
	},
	SSO:'',
	HeaderDomainBased:true,
	Deep_Analysis:"http://public.tableau.com/views/RegionalSampleWorkbook/Storms?:embed=yes&:tabs=yes&:toolbar=yes",
	summaryInsights: false,
	insightsAction: true,
	SSO_URL_OTHER:"https://incedolighthouse.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=onelogin&redirect_uri=https://idsp.incedolabs.com/wm/?provider=cognito&response_type=TOKEN&client_id=1vnacc7dtb1qdcr7e2tqj2hb5d&scope=aws.cognito.signin.user.admin email openid phone profile",
	SSO_URL_GOOGLE:"https://incedolighthouse.auth.us-east-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://idsp.incedolabs.com/wm/?provider=cognito&response_type=TOKEN&client_id=1vnacc7dtb1qdcr7e2tqj2hb5d&scope=aws.cognito.signin.user.admin email openid phone profile",
	// Advisor_Dashboard:"https://tableau.incedolabs.com/t/USBank/views/SalesDashboard_Jan212022/SalesDashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",	
	advisor_dashboard1:"https://tableau.incedolabs.com/t/USBank/views/Updated_SalesDashboard/AW6_RevenueSummary_Dashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
	advisor_dashboard2:"https://tableau.incedolabs.com/t/USBank/views/Updated_SalesDashboard/AW6_NNASummary_Dashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
	advisor_dashboard3:"https://tableau.incedolabs.com/t/USBank/views/Updated_SalesDashboard/AW6_AUMSummary_Dashboard?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",	
	advisor_dashboard_required:true,
	cohort_header:'WM'
};