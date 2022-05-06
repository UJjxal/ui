export const LoadStudyID = [
    { id: 0, value: 'NCT00234494' },
    { id: 1, value: 'NCT00461851' },
    { id: 2, value: 'NCT03159143' },
    { id: 3, value: 'NCT01108055' },
    { id: 4, value: 'NCT01282463' },
    { id: 5, value: 'NCT00645593' },
    { id: 6, value: 'NCT02302807' },
    { id: 7, value: 'NCT02300610' },
    { id: 8, value: 'NCT00045630' },
    { id: 9, value: 'NCT00421889' }

];

export const IndicaList = [
    { id: 0, value: 'Bladder Cancer' },
    { id: 1, value: 'Cervical Cancer' },
    { id: 2, value: 'Ovary Cancer' },
    { id: 3, value: 'Head and Neck Cancer' },
    { id: 4, value: 'Thyroid Cancer' }
]

export const IndicationList = [
    { id: 0, value: 'Secondary malignancy' },
    { id: 1, value: 'Allergy' },
    { id: 2, value: 'Bladder Cancer' },
    { id: 3, value: 'Bone cancer' },
    { id: 4, value: 'Breast cancer' },
    { id: 5, value: 'Cervical cancer' },
    { id: 6, value: 'Colon cancer' },
    { id: 7, value: 'COPD' },
    { id: 8, value: 'Encephalitis' },
    { id: 9, value: 'Stomach flu' },
    { id: 10, value: 'Head and neck cancer' },
    { id: 11, value: 'HIV infection' },
    { id: 12, value: 'Nutrition deficiency' },
    { id: 13, value: 'Osteoporosis' },
    { id: 14, value: 'Other bacterial infection' },
    { id: 15, value: 'Ovary cancer' },
    { id: 16, value: 'Pancreatic cancer' },
    { id: 17, value: 'Skin Infection' },
    { id: 18, value: 'Other fracture' },
    { id: 19, value: 'Cardiac arrest' },
    { id: 20, value: 'Stage of cancer' }

];


export const VitalsList = [
    { id: 0, value: 'Bilirubin' },
    { id: 1, value: 'Creatinine' },
    { id: 2, value: 'Hemoglobin' },
    { id: 3, value: 'Platelets' },
    { id: 4, value: 'Systolic blood pressure' },
    { id: 5, value: 'Diastolic blood pressure' },
    { id: 6, value: 'EGFR' },
    { id: 7, value: 'Glucose' },
    { id: 8, value: 'Globulin' },
    { id: 9, value: 'Lipase' },
    { id: 10, value: 'Neutrophils' },
    { id: 11, value: 'Phosporus' },
    { id: 12, value: 'Protein total' },
    { id: 13, value: 'RBC' },
    { id: 14, value: 'WBC' },
    { id: 15, value: 'Sodium' },
    { id: 16, value: 'Albumin' },
    { id: 17, value: 'Calcium' },
    { id: 18, value: 'Chloride' },
    { id: 19, value: 'Immature Granulocytes' },
    { id: 20, value: 'Monocytes' }
];

export const Race = [
    { id: 0, value: 'All' },
    { id: 1, value: 'White or Caucasian' },
    { id: 2, value: 'Black or African American' },
    { id: 3, value: 'American Indian or Alaska Native' },
    { id: 4, value: 'Other' },
    { id: 5, value: 'Asian' }

];

export const IncExcList = [
    { id: 0, value: 'Inclusion' },
    { id: 1, value: 'Exclusion' }
];
export const ConditionList = [
    { id: 0, value: '=' },
    { id: 1, value: '<' },
    { id: 2, value: '>' },
    { id: 3, value: '>=' },
    { id: 4, value: '<=' }

];
export const YesNoList = [
    { id: 0, value: 'Yes' },
    { id: 1, value: 'No' },
    { id: 2, value: 'NA' }
];

export const DemographicVarList = [
    { id: 0, value: 'Gender' },
    { id: 1, value: 'Age' },
    { id: 2, value: 'Race' }
];
export const DemographicGenderList = [
    { id: 0, value: 'All' },
    { id: 1, value: 'Female' },
    { id: 2, value: 'Male' }
];

export const Phases = [
    { id: 0, value: 'Phase I' },
    { id: 1, value: 'Phase II' },
    { id: 2, value: 'Phase III' }
];


export const comparatordrug = [
    { label:'Atezolizumab (MPDL3280A)',value: 'Atezolizumab (MPDL3280A)'},
    { label:'Belinostat',value: 'Belinostat'},
    { label:'Bevacizumab',value: 'Bevacizumab'},
    { label:'Carboplatin',value: 'Carboplatin'},
    { label:'Cetuximab',value: 'Cetuximab'},
    { label:'Cisplatin',value: 'Cisplatin'},
    { label:'Docetaxel',value: 'Docetaxel'},
    { label:'Enzalutamide',value: 'Enzalutamide' },
    { label:'Gemcitabine',value: 'Gemcitabine' },
    { label:'Icrucumab',value: 'Icrucumab'},
    { label:'Oxaliplatin',value: 'Oxaliplatin' },
    { label:'Paclitaxel',value: 'Paclitaxel' },
    { label:'Pazopanib (GW786034)',value: 'Pazopanib (GW786034)' },
    { label:'Ramucirumab DP',value: 'Ramucirumab DP' },
    { label:'Sorafenib',value: 'Sorafenib' },
    { label:'Vinflunine',value: 'Vinflunine' }


];
export const outcomes = [
    { label:'Overall Survival (OS)', value: 'Overall Survival (OS)'},
    { label:'Progression Free Survival (PFS)', value: 'Progression Free Survival (PFS)' },
    { label:'Adverse Events (AE/SAE)', value: 'Adverse Events (AE/SAE)'}


];
export const RWEVariable = [
    {label:'CT_01_db', value: 'CT_01_db'},
    {label:'EHR_01_db', value: 'EHR_01_db'}

];

export const RCTArms = [
    { label: 'RCT Arm 1',value: 'RCT Arm 1' },
    { label: 'RCT Arm 2',value: 'RCT Arm 2' }
];

export const SCAArms = [
    { label: 'CT SCA 1', value: 'CT SCA 1'},
    { label: 'CT SCA 2',  value: 'CT SCA 2'},
    { label: 'EHR SCA 1',  value: 'EHR SCA 1'},
    { label: 'EHR SCA 2',  value: 'EHR SCA 2'}
];

export const Country = [
    { label:'Argentina',value: 'Argentina'},
    { label:'Australia',value: 'Australia'},
    { label:'Austria',value: 'Austria'},
    { label:'Belgium',value: 'Belgium'},
    { label:'Canada',value: 'Canada'},
    { label:'China',value: 'China'},
    { label:'Croatia',value: 'Croatia'},
    { label:'Czechia',value: 'Czechia'},
    { label:'Denmark',value: 'Denmark'},
    { label:'Finland',value: 'Finland'},
    { label:'France',value: 'France'},
    { label:'Germany',value: 'Germany'},
    { label:'Greece',value: 'Greece'},
    { label:'Hungary',value: 'Hungary'},
    { label:'India',value: 'India'},
    { label:'Israel',value: 'Israel'},
    { label:'Italy',value: 'Italy'},
    { label:'Japan',value: 'Japan'},
    { label:'Korea, Republic of',value: 'Korea, Republic of' },
    { label:'Netherlands',value: 'Netherlands' },
    { label:'Norway',value: 'Norway' },
    { label:'Poland',value: 'Poland' },
    { label:'Portugal',value: 'Portugal' },
    { label:'Romania',value: 'Romania'},
    { label:'Russian Federation',value: 'Russian Federation' },
    { label:'Serbia',value: 'Serbia' },
    { label:'Singapore',value: 'Singapore' },
    { label:'Slovenia',value: 'Slovenia' },
    { label:'Spain',value: 'Spain' },
    { label:'Sweden',value: 'Sweden' },
    { label:'Switzerland',value: 'Switzerland'},
    { label:'Taiwan',value: 'Taiwan' },
    { label:'Turkey',value: 'Turkey' },
    { label:'United Kingdom',value: 'United Kingdom' },
    { label:'United States',value: 'United States' }
];

export const Department = [
    { label:'Burn ICU',value: 'Burn ICU' },
    { label:'Coronary Care Unit',value: 'Coronary Care Unit' },
    { label:'Detox ICU',value: 'Detox ICU' },
    { label:'General Med/Surg',value: 'General Med/Surg' },
    { label:'Intensive Care Unit',value: 'Intensive Care Unit' },
    { label:'Neonatal ICU',value: 'Neonatal ICU'},
    { label:'Nursery',value: 'Nursery'},
    { label:'Nursing Facility',value: 'Nursing Facility'},
    { label:'Other Long Term Care',value: 'Other Long Term Care' },
    { label:'Other Subprovider',value: 'Other Subprovider' },
    { label:'Pediatric ICU',value: 'Pediatric ICU' },
    { label:'Premature ICU',value: 'Premature ICU'},
    { label:'Psych Subprovider',value: 'Psych Subprovider' },
    { label:'Psychiatric ICU',value: 'Psychiatric ICU' },
    { label:'Rehab Subprovider',value: 'Rehab Subprovider' },
    { label:'Skilled Nursing (SNF)',value: 'Skilled Nursing (SNF)' },
    { label:'Surgical ICU',value: 'Surgical ICU' },
    { label:'Trauma ICU',value: 'Trauma ICU' }
]

// Payer Analytics - Drop Down
export const BOB = [
	{ id: 0, value: 'Commercial' },
	{ id: 1, value: 'Medicare' },
	{ id: 2, value: 'Medicaid' },
	{ id: 3, value: 'Veterans Affairs' },
];
export const ThArea = [
	{ id: 0, value: 'RA' },
	{ id: 1, value: 'COVID' },
	{ id: 2, value: 'UC' },
];

export const BrandBasket = [
	{ id: 0, value: 'DRUG A' },
	{ id: 1, value: 'DRUG B' },
	{ id: 2, value: 'DRUG C' },
	{ id: 3, value: 'DRUG D' },
];

export const Brand = [
	{ id: 0, value: 'All' },
	{ id: 1, value: 'DRUG A1' },
	{ id: 2, value: 'DRUG A2' },
	{ id: 3, value: 'DRUG A3' },
	{ id: 4, value: 'DRUG A4' },
];
export const ContractEntity = [
	{ id: 0, value: 'All' },
	{ id: 1, value: 'Payer1' },
	{ id: 2, value: 'Payer2' },
];

export const RelFP = [
	{ id: 0, value: 'E>P' },
	{ id: 1, value: 'E>N' },
	{ id: 2, value: 'E>E' },
	{ id: 3, value: 'P>N' },
	{ id: 4, value: 'P>E' },
	{ id: 5, value: 'P>N' },
	{ id: 6, value: 'N>E' },
	{ id: 7, value: 'N>P' },
	{ id: 8, value: 'N>N' },
];
export const RelNoFP = [
	{ id: 0, value: 'E>P' },
	{ id: 1, value: 'E>N' },
	{ id: 2, value: 'E>E' },
	{ id: 3, value: 'P>N' },
	{ id: 4, value: 'P>E' },
	{ id: 5, value: 'P>N' },
	{ id: 6, value: 'N>E' },
	{ id: 7, value: 'N>P' },
	{ id: 8, value: 'N>N' },
];

export const NDC = [
	{ id: 0, value: 'NDC00000001' },
	{ id: 1, value: 'NDC00000002' },
	{ id: 2, value: 'NDC00000003' },
];

export const impactType = [
	{
		set: [
			{ id: 0, image: 'linearImage' },
			{ id: 1, image: 'normalImage' },
			{ id: 2, image: 'logImage' },
		],
	},
	{
		set: [
			{ id: 3, image: 'avalImage' },
			{ id: 4, image: 'nImage' },
			{ id: 5, image: 'uImage' },
		],
	},
];
 // End ---- Payer Analytics Drop Down