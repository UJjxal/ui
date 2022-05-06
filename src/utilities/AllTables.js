export const IconList = [
	{ type: "material", name: "device_hub" },
	{ type: "material", name: "group" },
	{ type: "material", name: "data_usage" },
	{ type: "material", name: "assessment" },
	{ type: "material", name: "settings" },
	{ type: "material", name: "donut_large" },
	{ type: "material", name: "trending_up" },
	{ type: "material", name: "edit" },
	{ type: "material", name: "calendar_today" },
	{ type: "material", name: "equalizer" },
	{ type: "material", name: "transform" },
	{ type: "material", name: "wb_iridescent" },
	{ type: "material", name: "timeline" },
	{ type: "material", name: "donut_small" },
	{ type: "material", name: "manage_search" },
	{ type: "material", name: "screen_search_desktop" },
	{ type: "material", name: "auto_graph" },
	{ type: "material", name: "analytics" },
	{ type: "material", name: "account_tree" },
	{ type: "material", name: "checklist_rtl" }
  ];

export const colorRange = [
	{ label:'Significant Growth', val:'significant_growth', color:'#3F6C51' },
	{ label:'Modest Growth', val:'modest_growth', color: '#95C1A6' },
	{ label:'No Change', val:'no_change', color: '#E3C567' },
	{ label:'Modest Loss',val:'modest_loss', color: '#DA7F7F' },
	{ label:'Significant Loss', val:'significant_loss', color: '#B60000' },
];

export const defaultColor = '#CCCCCC';

//PNC Header
export const KPIDomainList = 
["Home Equity",
"Credit Card",
"Auto Lending",
"Business Lending",
"Student Lending",
"Mortgage",
"Personal Lending",
"Multi-Domain"
];

export const KPIDomainIcons = 
  {"Home Equity":"home_twotone",
  "Credit Card":"payment_two_tone",
  "Auto Lending":"directions_car",
  "Business Lending":"business",
  "Student Lending":"school",
  "Mortgage":"house",
  "Personal Lending":"face",
	"Multi-Domain":"group_work"
};

export const unitList = [
	{ key: '1', value: '$' },
	{ key: '2', value: '#' },
	{ key: '3', value: '%' },
];

export const initialMetricsList = {
	key: '',  
	description: '',
	name: '',
	unit: '',
	polarity: 'Positive',
	text: '',
};

export const initialParameterList = {
	key: "",
	parameterName: "",
	parameterDescription: "", 
	parameterType: "", 
	parameterValue: ""
};

export const initialCohortsList = {
	key: '',  
	description: '',
	name: '',
	type:'',
	//LC-513 
	features: []
};

export const initialColorThresholdList = {
	'1': 'default',
	threshold: [
		{ range: '', label: 'Significant Growth' },
		{ range: '', label: 'Modest Growth' },
		{ range: '', label: 'No Change' },
		{ range: '', label: 'Modest Loss' },
		{ range: '', label: 'Significant Loss' },
	],
};

export const thresholdRange = [
	{ range: '', label: 'Significant Growth' },
	{ range: '', label: 'Modest Growth' },
	{ range: '', label: 'No Change' },
	{ range: '', label: 'Modest Loss' },
	{ range: '', label: 'Significant Loss' },
];

export const themeStyles= [
	{
		//Theme 0 - Dark Theme
		color1: '#696969',
		color2: '#7D7D7D', //
		color3: '#333c4b',
		color4: '#043365', //Primary Blue      - menu Background color //#043365 #333c4b
		color5: '#F0F0F0', //          - menu Border color
		color6: 'white', //white     - Font color
		color7: '#000000', //black
		color8: '#0091D5', //skyblue
		color9: '#1C4E80', //blue
		color10: '#BDBDBD', //
		color11: '#0E4B71', //bluish    - Page Title
		color12: '#F0F0F0',
		font: 'Roboto',
		size: '1rem',
	},
	{
		//Theme 1 - Light Theme
		color1: '#696969',
		color2: '#7D7D7D',
		color3: '#F0F0F0',
		color4: '#FFFFFF', //white - menu Background color
		color5: '#BDBDBD', //grey  - menu Border color
		//color5: "#F0F0F0",
		color6: '#111111', //black - font color
		color7: '#000000', //black
		color10: '#FFFFFF',
		color11: '#0E4B71', //bluish    - Page Title
		color12: '#FFFFFF',
		color13: '#043365', //Incedo Blue
		font: 'Roboto',
		size: '1rem',
	},
	{ //Nimit will work on this                  - but he never actually did
		color1: '#204a47',
		color2: '#2e5c59',
		color3: '#49938e',
		color4: '#5bb8b1',
		color5: '#addbd8',
		color6: '#dff0f0',
		font: 'Roboto',
		size: '1rem',
	},
];

export const settingTabs = [
	{
		id:1,
		label:'First Business Day',
		value:'first-business-day'
	},
	{
		id:2,
		label:'Metrics Management',
		value:'metrics-management'
	},
	{
		id:3,
		label:'Cohort Management',
		value:'cohort-management'
	},
	{
		id:4,
		label:'Data Catalog Management',
		value: 'data-catalog-management'
	},
	{
		id:5,
		label:'Parameter Management',
		value:'parameter-management'
	},
]

export const operatorList =[

	{
		id:1,
		label:'abs',
		value:'abs',
		description:'abs(x)'
	},
	{
		id:2,
		label:'pow',
		value: 'pow',
		description:'pow(x,n)'
	},
	{
		id:3,
		label:'max',
		value:'max',
		description:'max(x1,x2,x3,...,xn)'
	},
	{
		id:4,
		label:'min',
		value:'min',
		description:'min(x1,x2,x3,...,xn)'
	},
	{
		id:5,
		label:'average',
		value:'average',
		description:'average(x1,x2,x3,...,xn)'
	},
	
	{
		id:6,
		label:'weighted_mean',
		value:'weighted_mean',
		description:'weighted_mean((x1,y1),(x2,y2),...,(xn,yn))'
	},
]