import "./mrm.css";
import React from "react";
import ReactECharts from 'echarts-for-react';
import {Tabs} from "antd";
const {TabPane}=Tabs;

let defColors=["#77B6EA", "#0d47a1", "#1e7ba5", "#2b94c3", "#37aee1", "#43c9ff", "#ABC4FF"];

function NewDetailPage(){
	return (
		<div className="mrm tabs-bx">
			{/* <h3 style={{color:"rgb(14, 75, 113)"}}>Model Monitor</h3> */}

			<Tabs defaultActiveKey="1" onChange={()=>{}}>
				<TabPane tab="Overall Model Performance" key="1">
					<div className="row">
						<div className="col-md-6 form-group">
							<PortfolioTable />
						</div>
						<div className="col-md-6 form-group">
							<HistoricalTable />
						</div>
					</div>
				</TabPane>

				<TabPane tab="Backtesting of VaR Forecasts" key="2">
					<div className="row">
						<div className="col-md-6 form-group">
							<LineAreaChart title="P&L and VaR Range (VaR, 99%)" />
						</div>
						<div className="col-md-6 form-group">
							<LineAreaChart title="P&L and VaR Range (CVaR, 99%)" />
						</div>
						<div className="col-md-6 form-group">
							<LineAreaChart title="P&L and VaR Range (VaR, 95%)" />
						</div>
						<div className="col-md-6 form-group">
							<LineAreaChart title="P&L and VaR Range (CVaR, 95%)" />
						</div>
					</div>
				</TabPane>

				<TabPane tab="Statistical Tests: Kupiec POF Results" key="3">
					<div className="row">
						<div className="col-md-6 form-group">
							<BarChart 
								title="Kupiec POF Test Results (VaR, 99%)" 
								records={[{
									probability:'0.01%',
									observations:'252',
									no_of_excesses:'6',
									kupiec_value:'2.14',
									cut_point:'1.64',
									test_result:'grey'
								}]} 
							/>
						</div>
						<div className="col-md-6 form-group">
							<BarChart 
								title="Kupiec POF Test Results (CVaR, 99%)" 
								records={[{
									probability:'0.01%',
									observations:'252',
									no_of_excesses:'12',
									kupiec_value:'2.01',
									cut_point:'1.8',
									test_result:'grey'
								}]} 
							/>
						</div>
						<div className="col-md-6 form-group">
							<BarChart 
								title="Kupiec POF Test Results (VaR, 95%)" 
								records={[{
									probability:'0.05%',
									observations:'252',
									no_of_excesses:'8',
									kupiec_value:'2.04',
									cut_point:'1.78',
									test_result:'grey'
								}]}  
							/>
						</div>
						<div className="col-md-6 form-group">
							<BarChart 
								title="Kupiec POF Test Results (CVaR, 95%)" 
								records={[{
									probability:'0.05%',
									observations:'252',
									no_of_excesses:'20',
									kupiec_value:'1.9',
									cut_point:'2.1',
									test_result:'red'
								}]} 
							/>
						</div>
					</div>
				</TabPane>

				<TabPane tab="Statistical Tests: Test for Normality" key="4">
					<div className="row">
						<div className="col-md-6 form-group">
							<NormalityHistogramChart />
						</div>
						<div className="col-md-6 form-group">
							{/* <NormalityProbabilityChart /> */}
							<div className="table-responsive">
								<table className="table table-sm table-bordered m-0">
									<thead className="table-text-vmid bg-light">
										<tr>
											<th className="fs13 bold500">Test</th>
											<th className="text-right fs13 bold500">Test Value</th>
											<th className="fs13 bold500">Interpretation</th>
										</tr>
									</thead>
									<tbody className="bold500">
										<tr>
											<td>KS Test</td>
											<td className="text-right">0.03</td>
											<td>Returns are not following Normal distribution</td>
										</tr>
										<tr>
											<td>Skewness</td>
											<td className="text-right">0.001</td>
											<td>Data is skewed left</td>
										</tr>
										<tr>
											<td>Kurtosis</td>
											<td className="text-right">3.5</td>
											<td>Distribution has thin bell with high peak</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="mt10 border p10">
								KS Test<br />
								{`P value < 0.05, states with 95% confidence that data does not fit the normal distribution`}<br /><br />

								Kurtosis<br />
								Kurtosis = 3 , Normal distribution<br />
								{`Kurtosis > 3 , Thin bell with high peak`}<br />
								{`Kurtosis < 3 , Thick bell with broad peak`}<br /><br />

								Skewness<br />
								Skewness = 0 , Normal Distribution<br />
								{`Skewness < 0 , Distribution is skewed towards left`}<br />
								{`Skewness > 0 Distribution is skewed towards right`}
							</div>
						</div>
					</div>
				</TabPane>

				<TabPane tab="Portfolo Composition" key="5">
					<div className="row">
						<div className="col-md-6 form-group">
							<DoughnuChart 
								title="Exposure by Geography"
								data={[
									{value:65, name:'Domestic'},
									{value:35, name:'International'},
								]}
								colors={["#3598DC", "#F2784B"]}
							/>
						</div>
						<div className="col-md-6 form-group">
							<HistoricalExpoGeoChart />
						</div>

						<div className="col-md-6 form-group">
							<DoughnuChart 
								title="Exposure by Instrument Type"
								data={[
									{value:40, name:'Available For Sale'},
									{value:40, name:'Hold To Maturity'},
									{value:20, name:'Trading'},
								]}
								colors={["#3598DC", "#F2784B", "#94A0B2"]}
							/>
						</div>
						<div className="col-md-6 form-group">
							<HistoricalExpoInstrumentChart />
						</div>
					</div>
				</TabPane>

				<TabPane tab="Portfolo Composition" key="6">
					<div className="row">
						<div className="col-md-6 form-group">
							<DoughnuChart 
								title="Exposure by Rating"
								data={[
									{value:35, name:'AAA'},
									{value:15, name:'AA'},
									{value:10, name:'A'},
									{value:20, name:'BBB'},
									{value:20, name:'BB'},
								]}
								colors={["#3598DC", "#F2784B", "#94A0B2", "#F3C200", "#007bff"]}
							/>
						</div>
						<div className="col-md-6 form-group">
							<HistoricalExpoRatingChart />
						</div>

						<div className="col-md-6 form-group">
							<DoughnuChart 
								title="Exposure by Maturity"
								data={[
									{value:32, name:'<3 Years'},
									{value:18, name:'3-5 Years'},
									{value:23, name:'5-10 Years'},
									{value:27, name:'>10 Years'},
								]}
								colors={["#3598DC", "#F2784B", "#94A0B2", "#F3C200"]}
							/>
						</div>
						<div className="col-md-6 form-group">
							<HistoricalExpoMaturityChart />
						</div>
					</div>
				</TabPane>
			</Tabs>
		</div>
	);
}

const Circle=(props)=>{
	return (
		<div style={{width:'20px', height:'20px', borderRadius:'100%', background:(props.color==='green'?'#26C281':(props.color==='red'?'#F2784B':'#95A5A6'))}}>
		</div>
	)
}

function PortfolioTable(){
	let records=[
		{title:'Excess probability', var99:'0.01', var99status:'', var95:'0.05', var95status:'', cvar99:'0.01', cvar99status:'', cvar95:'0.05', cvar95status:''},
		{title:'No of observation', var99:'252', var99status:'', var95:'252', var95status:'', cvar99:'252', cvar99status:'', cvar95:'252', cvar95status:''},
		{title:'Number of excesses', var99:'5', var99status:'green', var95:'16', var95status:'green', cvar99:'3', cvar99status:'green', cvar95:'20', cvar95status:'red'},
		{title:'Range of excesses (Days)', var99:'0-6', var99status:'', var95:'7-18', var95status:'', cvar99:'0-6', cvar99status:'', cvar95:'7-18', cvar95status:''},
	];

	return(
		<div className="card">
			<div className="card-body p2">
				<h5 className="card-title p-2 mb10">Validation Results Of Portfolio VaR Model</h5>
				<div className="table-responsive">
					<table className="table table-sm m-0">
						<thead className="table-text-vmid text-center bg-light">
							<tr>
								<th rowSpan="2" className="bold500"></th>
								<th colSpan="2" className="bold500" style={{borderBottom:0, paddingBottom:0}}>VaR Historical</th>
								<th colSpan="2" className="bold500" style={{borderBottom:0, paddingBottom:0}}>CVaR Historical</th>
							</tr>
							<tr>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
							</tr>
						</thead>
						<tbody className="">
							{records.map((v,i)=>(
								<tr key={i}>
									<td>{v.title}</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.var99}</div>
											{v.var99status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.var99status} />
											</div>
											}
										</div>
									</td>
									
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.var95}</div>
											{v.var95status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.var95status} />
											</div>
											}
										</div>
									</td>

									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.cvar99}</div>
											{v.cvar99status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.cvar99status} />
											</div>
											}
										</div>
									</td>

									<td className="text-center">
										<div className="d-flex justify-content-center">
											<div className="my-auto text-right w50">{v.cvar95}</div>
											{v.cvar95status!=='' && 
											<div className="my-auto pl5">
												<Circle color={v.cvar95status} />
											</div>
											}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

function HistoricalTable(){
	let records=[
		{title:'Jan-20', var99status:'green', var95status:'red', cvar99status:'green', cvar95status:'green'},
		{title:'Feb-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Mar-20', var99status:'red', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Apr-20', var99status:'green', var95status:'green', cvar99status:'red', cvar95status:'green'},
		{title:'May-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Jun-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'red'},
		{title:'Jul-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Aug-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Sep-20', var99status:'red', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Oct-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'green'},
		{title:'Nov-20', var99status:'green', var95status:'green', cvar99status:'red', cvar95status:'green'},
		{title:'Dec-20', var99status:'green', var95status:'green', cvar99status:'green', cvar95status:'red'},
	];

	return(
		<div className="card">
			<div className="card-body p2">
				<h5 className="card-title p-2 mb10">Historical Model Performance</h5>
				<div className="table-responsive">
					<table className="table table-sm m-0">
						<thead className="table-text-vmid text-center bg-light">
							<tr>
								<th rowSpan="2" className="bold500" style={{borderBottom:0, paddingBottom:0, textAlign:'left'}}>Month End</th>
								<th colSpan="2" className="bold500" style={{borderBottom:0, paddingBottom:0}}>VaR Historical</th>
								<th colSpan="2" className="bold500" style={{borderBottom:0, paddingBottom:0}}>CVaR Historical</th>
							</tr>
							<tr>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderRight:0}}>Confidence Level 99%</th>
								<th className="w130 nowrap" style={{borderTop:0, borderLeft:0}}>Confidence Level 95%</th>
							</tr>
						</thead>
						<tbody className="bold500">
							{records.map((v,i)=>(
								<tr key={i}>
									<td>{v.title}</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.var99status} />
										</div>
									</td>

									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.var95status} />
										</div>
									</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.cvar99status} />
										</div>
									</td>
									<td className="text-center">
										<div className="d-flex justify-content-center">
											<Circle color={v.cvar95status} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

function LineAreaChart(props){
	let dates=["02-Jan-20","03-Jan-20","07-Jan-20","08-Jan-20","09-Jan-20","10-Jan-20","13-Jan-20","14-Jan-20","15-Jan-20","16-Jan-20","17-Jan-20","20-Jan-20","22-Jan-20","23-Jan-20","24-Jan-20","27-Jan-20","28-Jan-20","29-Jan-20","30-Jan-20","31-Jan-20","03-Feb-20","04-Feb-20","05-Feb-20","06-Feb-20","07-Feb-20","10-Feb-20","11-Feb-20","12-Feb-20","13-Feb-20","14-Feb-20","17-Feb-20","18-Feb-20","19-Feb-20","20-Feb-20","21-Feb-20","24-Feb-20","25-Feb-20","26-Feb-20","28-Feb-20","02-Mar-20","03-Mar-20","04-Mar-20","05-Mar-20","06-Mar-20","09-Mar-20","10-Mar-20","11-Mar-20","12-Mar-20","13-Mar-20","16-Mar-20","17-Mar-20","18-Mar-20","19-Mar-20","20-Mar-20","23-Mar-20","24-Mar-20","25-Mar-20","26-Mar-20","27-Mar-20","30-Mar-20","31-Mar-20","01-Apr-20","02-Apr-20","03-Apr-20","06-Apr-20","07-Apr-20","08-Apr-20","09-Apr-20","13-Apr-20","14-Apr-20","15-Apr-20","16-Apr-20","17-Apr-20","20-Apr-20","21-Apr-20","22-Apr-20","23-Apr-20","24-Apr-20","27-Apr-20","28-Apr-20","29-Apr-20","30-Apr-20","01-May-20","05-May-20","06-May-20","07-May-20","08-May-20","11-May-20","12-May-20","13-May-20","14-May-20","15-May-20","18-May-20","19-May-20","20-May-20","21-May-20","22-May-20","25-May-20","26-May-20","27-May-20","28-May-20","29-May-20","01-Jun-20","02-Jun-20","03-Jun-20","04-Jun-20","05-Jun-20","08-Jun-20","09-Jun-20","10-Jun-20","12-Jun-20","15-Jun-20","16-Jun-20","17-Jun-20","18-Jun-20","19-Jun-20","22-Jun-20","23-Jun-20","24-Jun-20","25-Jun-20","26-Jun-20","29-Jun-20","30-Jun-20","01-Jul-20","02-Jul-20","03-Jul-20","06-Jul-20","07-Jul-20","08-Jul-20","09-Jul-20","10-Jul-20","13-Jul-20","14-Jul-20","15-Jul-20","16-Jul-20","17-Jul-20","20-Jul-20","21-Jul-20","22-Jul-20","23-Jul-20","24-Jul-20","27-Jul-20","28-Jul-20","29-Jul-20","30-Jul-20","31-Jul-20","03-Aug-20","04-Aug-20","05-Aug-20","06-Aug-20","07-Aug-20","10-Aug-20","11-Aug-20","12-Aug-20","13-Aug-20","14-Aug-20","17-Aug-20","18-Aug-20","19-Aug-20","20-Aug-20","21-Aug-20","24-Aug-20","25-Aug-20","26-Aug-20","27-Aug-20","28-Aug-20","31-Aug-20","01-Sep-20","02-Sep-20","03-Sep-20","04-Sep-20","07-Sep-20","08-Sep-20","09-Sep-20","10-Sep-20","11-Sep-20","14-Sep-20","15-Sep-20","16-Sep-20","17-Sep-20","18-Sep-20","21-Sep-20","22-Sep-20","23-Sep-20","25-Sep-20","28-Sep-20","29-Sep-20","30-Sep-20","01-Oct-20","02-Oct-20","05-Oct-20","06-Oct-20","07-Oct-20","08-Oct-20","09-Oct-20","12-Oct-20","13-Oct-20","14-Oct-20","15-Oct-20","16-Oct-20","19-Oct-20","20-Oct-20","21-Oct-20","22-Oct-20","23-Oct-20","26-Oct-20","27-Oct-20","28-Oct-20","29-Oct-20","30-Oct-20","02-Nov-20","03-Nov-20","04-Nov-20","05-Nov-20","06-Nov-20","10-Nov-20","11-Nov-20","12-Nov-20","13-Nov-20","16-Nov-20","17-Nov-20","18-Nov-20","19-Nov-20","20-Nov-20","23-Nov-20","24-Nov-20","25-Nov-20","26-Nov-20","27-Nov-20","30-Nov-20","01-Dec-20","02-Dec-20","03-Dec-20","04-Dec-20","07-Dec-20","08-Dec-20","09-Dec-20","10-Dec-20","11-Dec-20","14-Dec-20","15-Dec-20","16-Dec-20","17-Dec-20","18-Dec-20","21-Dec-20","22-Dec-20","23-Dec-20","24-Dec-20","28-Dec-20","29-Dec-20","30-Dec-20","31-Dec-20"];
	let updata=["148978606","148969188","148984136","160493534","160417500","160411139","160337028","159004646","157317943","159342313","155902280","155083555","154764730","153535511","153042346","152480633","150540277","150130406","149825466","148226787","148181546","147965454","147831008","148775216","148476040","165496215","165455283","162557470","173785086","176414670","176306943","175743432","174586330","173981735","171963011","171862232","171771400","171449477","171352187","171522232","171436205","171468431","171577222","171668043","171580365","171707702","171641648","171657119","171610201","171611139","190117519","187353465","187401600","187401600","187401330","187488702","191506815","191639852","189765430","188515606","189261147","189129565","189452092","189482853","189491575","189656480","189704599","189711051","191292040","191289627","191289372","188952296","188950623","188948229","188371436","188363715","188372545","188360116","188356065","192313537","192641107","191866542","191990584","192085400","230919129","213916264","214052155","214168842","225028511","225235509","225667763","226320100","226314823","226761599","227085106","231459336","232138386","240901793","241328568","263413045","259264936","261663176","262289695","261611208","261641434","269164075","269420670","269873799","272057470","273713331","273282368","289271137","289298613","289404536","304269340","302720488","302276637","302321270","302272372","302054037","301042571","299806143","295838235","295732965","301847211","301808367","301882090","306567732","306518436","304109226","304111240","312588943","312587655","310008195","310084943","309249715","335470451","333994436","334001261","333922819","333749487","342156421","341363490","341191966","363901556","359773836","359809556","359750126","359394072","359368111","358877643","358446852","356454764","355589299","355493434","355302046","345909943","346106221","350731707","350597979","349719773","349554227","349587077","350095013","349865408","348518517","345963840","346091001","344968356","344744423","346892099","346630526","346812513","346531749","346478571","346245664","346182094","346075913","346053088","343627915","343345102","343145471","342890792","342673404","368804397","368424565","357037615","355019402","355070433","355128128","352601569","352818457","352731849","352713459","352652972","352236672","360418937","359657970","356759242","354186085","345305646","345576209","345161162","345164484","343650404","343270763","343239715","343198564","343093039","342765411","342773667","342761441","342735241","346148185","351640267","371572170","376380255","376385570","376308566","375823674","375886838","375667665","375650792","367957081","367888913","367660138","370482081","360234060","374976329","367996598","368031520","367959242","367623414","367920249","367773350","367556476","367368735","367345426","367426434","367196136","367221241","367055286","367119818","367020663","366935416","367033513","367000142","366980770","366801183","358939138","356138862","356122920"];
	let linedata=["-68209516","221197563","77445895","-97707367","119186300","70493542","-33595057","97481746","-26964982","-69225447","158119318","-60400531","38555827","85046963","84523173","-27838311","-20782435","160768387","-46659627","-20536075","46542389","-287610","-59830893","88341099","-45653500","-251297268","110548060","-64442020","-191229602","-169831462","106599144","-15335956","-48677311","-60285814","-7998115","-31926120","-87589000","120724639","1096326","-31303142","-12716012","-44082086","7011576","-102857241","6510208","-10908696","-104561736","-24103609","-84045884","4165767","-348134596","18563750","15797465","11371501","26178546","-47287451","18716430","14651701","147232923","19044319","-156014828","167476739","-29965380","8292462","29140092","-2261093","18010740","-98540509","-166537886","-86626791","-34484799","111323709","-61329585","-63100196","-182035366","115988221","26610046","332327836","107742785","-67475298","-61097682","7519120","22955091","142748069","-331721355","26430393","-35928615","88971136","-225999834","-15051500","-19439351","111921744","122472641","182683097","4269425","-179487934","213687559","-228228968","-68807659","-100498327","-82493435","163067128","26206292","258818319","-39177363","48320345","51067733","139872623","34743729","115029306","113998224","-307113636","237369521","50076720","-281232442","228658360","48582106","-17298563","12128262","43221331","81765847","-13629940","43002169","58626648","-215765989","-52622586","-14847492","67011270","-53901169","40781520","76922841","-312081701","282715943","114839116","35322902","59763187","-490965216","293206151","195063841","-34393058","-71048755","-287581451","679152949","157120616","-512381678","471006125","-33205328","-193936952","83870701","402728451","6100002","210213991","29396674","101861054","-164154928","-49450574","-46834717","88363278","166865817","10364837","-1135511","53451322","76744796","-213928911","39653471","45378698","-27481273","-91025406","23395560","390255573","-243453310","-90499911","108763188","62342741","135458186","-63984132","13973939","-62082673","-806505","-7660893","37503316","94730034","282771831","351270423","-490445942","327937904","18388049","31538399","72182386","-95318886","78551442","30649016","-16213966","147985415","113814632","-38232813","-68385874","152190233","-121659087","340898625","43211417","23194860","8323328","-14910454","-99437900","448527162","117238080","127641359","-147986687","201158702","167276057","222127605","133894853","-239594147","172828723","-416178425","226155302","22949285","9644426","-46024715","-16870544","309588414","-82432378","-34235408","-117210457","-70467589","267289406","-216322677","14054770","-47307394","141460945","156094675","-51127493","-108297712","4468341","156359076","128655807","18760092","45457762","-120548577","-86897981","44103284","114365641","-115861917","129073624","101487528","177569369","-83311998","128401040","-87969940","-77080042","-98307261"];
	let downdata=["-148978606","-148969188","-148984136","-160493534","-160417500","-160411139","-160337028","-159004646","-157317943","-159342313","-155902280","-155083555","-154764730","-153535511","-153042346","-152480633","-150540277","-150130406","-149825466","-148226787","-148181546","-147965454","-147831008","-148775216","-148476040","-165496215","-165455283","-162557470","-173785086","-176414670","-176306943","-175743432","-174586330","-173981735","-171963011","-171862232","-171771400","-171449477","-171352187","-171522232","-171436205","-171468431","-171577222","-171668043","-171580365","-171707702","-171641648","-171657119","-171610201","-171611139","-190117519","-187353465","-187401600","-187401600","-187401330","-187488702","-191506815","-191639852","-189765430","-188515606","-189261147","-189129565","-189452092","-189482853","-189491575","-189656480","-189704599","-189711051","-191292040","-191289627","-191289372","-188952296","-188950623","-188948229","-188371436","-188363715","-188372545","-188360116","-188356065","-192313537","-192641107","-191866542","-191990584","-192085400","-230919129","-213916264","-214052155","-214168842","-225028511","-225235509","-225667763","-226320100","-226314823","-226761599","-227085106","-231459336","-232138386","-240901793","-241328568","-263413045","-259264936","-261663176","-262289695","-261611208","-261641434","-269164075","-269420670","-269873799","-272057470","-273713331","-273282368","-289271137","-289298613","-289404536","-304269340","-302720488","-302276637","-302321270","-302272372","-302054037","-301042571","-299806143","-295838235","-295732965","-301847211","-301808367","-301882090","-306567732","-306518436","-304109226","-304111240","-312588943","-312587655","-310008195","-310084943","-309249715","-335470451","-333994436","-334001261","-333922819","-333749487","-342156421","-341363490","-341191966","-363901556","-359773836","-359809556","-359750126","-359394072","-359368111","-358877643","-358446852","-356454764","-355589299","-355493434","-355302046","-345909943","-346106221","-350731707","-350597979","-349719773","-349554227","-349587077","-350095013","-349865408","-348518517","-345963840","-346091001","-344968356","-344744423","-346892099","-346630526","-346812513","-346531749","-346478571","-346245664","-346182094","-346075913","-346053088","-343627915","-343345102","-343145471","-342890792","-342673404","-368804397","-368424565","-357037615","-355019402","-355070433","-355128128","-352601569","-352818457","-352731849","-352713459","-352652972","-352236672","-360418937","-359657970","-356759242","-354186085","-345305646","-345576209","-345161162","-345164484","-343650404","-343270763","-343239715","-343198564","-343093039","-342765411","-342773667","-342761441","-342735241","-346148185","-351640267","-371572170","-376380255","-376385570","-376308566","-375823674","-375886838","-375667665","-375650792","-367957081","-367888913","-367660138","-370482081","-360234060","-374976329","-367996598","-368031520","-367959242","-367623414","-367920249","-367773350","-367556476","-367368735","-367345426","-367426434","-367196136","-367221241","-367055286","-367119818","-367020663","-366935416","-367033513","-367000142","-366980770","-366801183","-358939138","-356138862","-356122920"];

	let allvalues=updata.concat(linedata).concat(downdata);
	let min=allvalues[0]*1;
	let max=allvalues[0]*1;
	allvalues.forEach(v=>{
		if(v*1<min){
			min=v*1;
		}
		if(v*1>max){
			max=v*1;
		}
	});

	let downMin=downdata[0]*1;
	let lineMin=linedata[0]*1;
	downdata.forEach(v=>{
		if(v*1<downMin){
			downMin=v*1;
		}
	});
	linedata.forEach(v=>{
		if(v*1<lineMin){
			lineMin=v*1;
		}
	});


	const options={
		grid: {top: 40, right: 10, bottom: 20, left: 60},
		title: {
			left: 'center',
			text: props.title
		},
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
			  return [pt[0], '10%'];
			}
		},
		xAxis: {
		  type: 'category',
		  data: dates,
		},
		yAxis: {
		  type: 'value',
		  boundaryGap: [0, '100%'],
		  axisLabel: {
			formatter:function(val){
				val=val*1;
				return '$'+((val<0?'(':'')+(Math.abs(val)/1000000).toFixed(0)+(val<0?')':''))+'M';
			}
		  },
		  min,
		  max
		},
		/* dataZoom: [
			{
			  type: 'inside',
			  start: 0,
			  end: 20
			},
			{
			  start: 0,
			  end: 20
			}
		], */
		//color:["#777777", "#000000", "#777777"],
		color:[defColors[0], defColors[1], defColors[0]],
		series: [
		  {
			data: updata,
			type: 'line',
			areaStyle:{},
			symbol: 'none',
			smooth: true,
		  },
		  {
			data: linedata,
			type: 'line',
			smooth: true,
		  },
		  {
			data: downdata,
			type: 'line',
			areaStyle:{},
			symbol: 'none',
			smooth: true,
		  },
		],
		/* visualMap: {
			top: 50,
			right: 10,
			show:false,
			pieces: [
			  {
				gt: lineMin,
				lte: downMin,
				color: '#FF0000'
			  }
			],
			outOfRange: {
			  color: defColors[1]
			}
		} */
	};

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} style={{height:'300px'}} />

			<div className="mt-3">
				<div className="table-responsive">
					<table className="table table-sm table-bordered m-0">
						<thead className="table-text-vmid bg-light">
							<tr>
								<th className="fs13 bold500">Excess probability</th>
								<th className="text-right fs13 bold500">Number of observations</th>
								<th className="text-right fs13 bold500">Number of excesses</th>
								<th className="text-center fs13 bold500">Range of excesses (days)</th>
							</tr>
						</thead>
						<tbody className="bold500">
							<tr>
								<td>5%</td>
								<td className="text-right">252</td>
								<td className="text-right">16</td>
								<td className="text-center">7-18</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function BarChart(props){
	let bardata=["0.00","0.00","0.02","0.09","0.31","0.80","1.73","3.21","5.17","7.37","9.43","10.92","11.54","11.21","10.08","8.41","6.56","4.79","3.29","2.13", {value:1.31, itemStyle:{color:'#D91E18'}}];
	let max=bardata[0]*1;
	bardata.forEach(v=>{
		let n;
		if(typeof v === "object"){
			n=v.value*1;
		}else{
			n=v*1;
		}
		if(n>max){
			max=n;
		}
	});
	let areadata=[];
	bardata.forEach((v,i)=>{
		if(i>=7 && i<=17){
			areadata.push(max+1);
		}else{
			areadata.push(null);
		}
	});

	const options = {
		grid: {top: 30, right: 10, bottom: 20, left: 80},
		title: {
			left: 'center',
			text: props.title
		},
		xAxis: {
		  type: 'category',
		  data: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
		},
		yAxis: {
		  type: 'value',
		  axisLabel: {
			formatter:function(v){
				let n;
				if(typeof v === "object"){
					n=v.value*1;
				}else{
					n=v*1;
				}
				return n.toFixed(2)+'%';
			}
		  },
		},
		//color:['#26C281', '#3598DC'],
		color:defColors,
		series: [
		  {
			data: areadata,
			type: 'line',
			areaStyle:{},
			lineStyle:{width:0},
			symbol: 'none',
			//smooth: true,
			z:1
		  },
		  {
			data: bardata,
			type: 'bar',
			smooth: true,
			z:2
		  },
		],
		tooltip: {
		  trigger: 'axis',
		},
	};

	return (
		<div className="p-3 border">
			<ReactECharts option={options} style={{height:'300px'}} />

			<div className="mt-3">
				<div className="table-responsive">
					<table className="table table-sm table-bordered m-0">
						<thead className="table-text-vmid bg-light">
							<tr>
								<th className="fs13 bold500">Excess probability</th>
								<th className="text-right fs13 bold500">Number of observations</th>
								<th className="text-right fs13 bold500">Number of excesses</th>
								<th className="text-right fs13 bold500">Theoretical Kupiec value</th>
								<th className="text-right fs13 bold500">Cut point</th>
								<th className="text-center fs13 bold500">Test Result</th>
							</tr>
						</thead>
						<tbody className="bold500">
							{props.records.map((v,i)=>(
								<tr key={i}>
									<td>{v.probability}</td>
									<td className="text-right text-danger">{v.observations}</td>
									<td className="text-right text-danger">{v.no_of_excesses}</td>
									<td className="text-right">{v.kupiec_value}</td>
									<td className="text-right">{v.cut_point}</td>
									<td className="text-right">
										<div className="d-flex justify-content-center">
											<Circle color={v.test_result} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function NormalityHistogramChart(){
	const options={
		grid:{top: 30, right: 8, bottom: 24, left: 36},
		title:{
			left:'center',
			text:"Histogram"
		},
		xAxis:{
		  type: 'category',
		  data: ['-457, -403','-403, -349','-349, -295','-295, -241','-241, -187','-187, -133','-133, -78','-78, -24','-24, 29','29, 83','83, 137','137, 191','191, 245','245, 300','300, 354','354, 408','408, 462','462, 516','516, 570','570, 624','624, 679'],
		},
		yAxis: {
		  type: 'value',
		},
		series: [
		  {
			data: [3, 1, 0, 4, 4, 8, 7, 23, 43, 54, 31, 32, 18, 9, 5, 5, 2, 1, 1, 0, 0, 1],
			type: 'bar',
			smooth: true,
		  },
		  {
			data: [3, 1, 0, 4, 4, 8, 7, 23, 43, 54, 31, 32, 18, 9, 5, 5, 2, 1, 1, 0, 0, 1],
			type: 'line',
			smooth: true,
		  },
		],
		//color:["#3598DC", "#D91E18"],
		color:defColors,
		tooltip: {
		  trigger: 'axis',
		},
	};

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} style={{height:'432px'}} />
		</div>
	);
}

function NormalityProbabilityChart(){
	const options={
		grid:{top: 30, right: 8, bottom: 24, left: 36},
		title:{
			left:'center',
			text:"Normal Probability Plot"
		},
		xAxis: {},
		yAxis: {},
		tooltip: {
			trigger: 'axis',
		},
		//color:["#3598DC"],
		color:defColors,
		series: [
		  {
			symbolSize: 20,
			data: [
				[0.01, -2.302],
				[0.02, -2.038],
				[0.03, -1.925],
				[0.04, -1.817],
				[0.05, -1.728],
				[0.06, -1.621],
				[0.07, -1.556],
				[0.08, -1.493],
				[0.09, -1.42],
				[0.1, -1.369],
				[0.11, -1.342],
				[0.12, -1.284],
				[0.13, -1.239],
				[0.14, -1.196],
				[0.15, -1.124],
				[0.16, -1.093],
				[0.17, -1.056],
				[0.18, -1.026],
				[0.19, -0.996],
				[0.2, -0.932],
				[0.21, -0.883],
				[0.22, -0.862],
				[0.23, -0.835],
				[0.24, -0.789],
				[0.25, -0.771],
				[0.26, -0.754],
				[0.27, -0.727],
				[0.28, -0.689],
				[0.29, -0.666],
				[0.3, -0.599],
				[0.31, -0.568],
				[0.32, -0.534],
				[0.33, -0.491],
				[0.34, -0.472],
				[0.35, -0.445],
				[0.36, -0.415],
				[0.37, -0.382],
				[0.38, -0.351],
				[0.39, -0.328],
				[0.4, -0.297],
				[0.41, -0.265],
				[0.42, -0.223],
				[0.43, -0.185],
				[0.44, -0.143],
				[0.45, -0.122],
				[0.46, -0.104],
				[0.47, -0.079],
				[0.48, -0.062],
				[0.49, -0.035],
				[0.5, -0.008],
				[0.51, 0.015],
				[0.52, 0.031],
				[0.53, 0.05],
				[0.54, 0.087],
				[0.55, 0.109],
				[0.56, 0.129],
				[0.57, 0.155],
				[0.58, 0.188],
				[0.59, 0.214],
				[0.6, 0.23],
				[0.61, 0.258],
				[0.62, 0.275],
				[0.63, 0.307],
				[0.64, 0.344],
				[0.65, 0.381],
				[0.66, 0.423],
				[0.67, 0.455],
				[0.68, 0.483],
				[0.69, 0.51],
				[0.7, 0.55],
				[0.71, 0.562],
				[0.72, 0.583],
				[0.73, 0.629],
				[0.74, 0.667],
				[0.75, 0.706],
				[0.76, 0.759],
				[0.77, 0.812],
				[0.78, 0.832],
				[0.79, 0.878],
				[0.8, 0.902],
				[0.81, 0.927],
				[0.82, 0.973],
				[0.83, 1.014],
				[0.84, 1.057],
				[0.85, 1.095],
				[0.86, 1.129],
				[0.87, 1.166],
				[0.88, 1.216],
				[0.89, 1.298],
				[0.9, 1.348],
				[0.91, 1.391],
				[0.92, 1.432],
				[0.93, 1.514],
				[0.94, 1.617],
				[0.95, 1.727],
				[0.96, 1.898],
				[0.97, 2.048],
				[0.98, 2.262],
				[0.99, 2.431],
				[1,	3.07]
			],
			type: 'scatter'
		  }
		]
	};

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} style={{height:'400px'}} />
		</div>
	);
}

function DoughnuChart(props){
	const options={
		title: {
			left: 'center',
			text: props.title
		},
		tooltip:{
		  trigger: 'item'
		},
		/* legend:{
		  bottom: '0%',
		  left: 'center'
		}, */
		series:[
		  {
			name: props.title,
			type: 'pie',
			radius: ['40%', '70%'],
			label:{
				formatter:(params)=>{
					return params.name+' '+params.percent+'%';
				}
			},
			//color:props.colors,
			color:defColors,
			data:props.data
		  }
		]
	};

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} />
		</div>
	);
}

function HistoricalExpoGeoChart(){
	const options = {
		grid: {top: 30, right: 10, bottom: 90, left: 100},
		title: {
		  text: 'Historical Exposure by Geography',
		  left:'center'
		},
		tooltip: {
		  trigger: 'axis',
		  axisPointer: {
			type: 'cross',
			label:{
			  backgroundColor: '#6a7985'
			}
		  }
		},
		legend:{
			bottom:'0', left:'center', icon:'roundRect', itemGap:25,
		},
		xAxis: [
		  {
			type: 'category',
			boundaryGap: false,
			axisLabel:{rotate:90},
			data: ['Jan-20', 'Feb-20', 'Mar-20', 'Apr-20', 'May-20', 'Jun-20', 'Jul-20', 'Aug-20', 'Sep-20', 'Oct-20', 'Nov-20', 'Dec-20']
		  }
		],
		yAxis: [
		  {
			type: 'value'
		  }
		],
		series: [
		  {
			name: 'Domestic',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90]
		  },
		  {
			name: 'International',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  }
		],
		//color:["#3598DC", "#F2784B"],
		color:defColors,
	  };

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} />
		</div>
	);
}

function HistoricalExpoInstrumentChart(){
	const options = {
		grid: {top: 30, right: 10, bottom: 90, left: 100},
		title: {
		  text: 'Historical Exposure by Geography',
		  left:'center'
		},
		tooltip: {
		  trigger: 'axis',
		  axisPointer: {
			type: 'cross',
			label:{
			  backgroundColor: '#6a7985'
			}
		  }
		},
		legend:{
			bottom:'0', left:'center', icon:'roundRect', itemGap:25,
		},
		xAxis: [
		  {
			type: 'category',
			boundaryGap: false,
			axisLabel:{rotate:90},
			data: ['Jan-20', 'Feb-20', 'Mar-20', 'Apr-20', 'May-20', 'Jun-20', 'Jul-20', 'Aug-20', 'Sep-20', 'Oct-20', 'Nov-20', 'Dec-20']
		  }
		],
		yAxis: [
		  {
			type: 'value'
		  }
		],
		series: [
		  {
			name: 'Available For Sale',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90]
		  },
		  {
			name: 'Hold To Maturity',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  },
		  {
			name: 'Trading',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  }
		],
		//color:["#3598DC", "#F2784B", "#94A0B2"],
		color:defColors,
	  };

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} />
		</div>
	);
}

function HistoricalExpoRatingChart(){
	const options = {
		grid: {top: 30, right: 10, bottom: 90, left: 100},
		title: {
		  text: 'Historical Exposure by Rating',
		  left:'center'
		},
		tooltip: {
		  trigger: 'axis',
		  axisPointer: {
			type: 'cross',
			label:{
			  backgroundColor: '#6a7985'
			}
		  }
		},
		legend:{
			bottom:'0', left:'center', icon:'roundRect', itemGap:25,
		},
		xAxis: [
		  {
			type: 'category',
			boundaryGap: false,
			axisLabel:{rotate:90},
			data: ['Jan-20', 'Feb-20', 'Mar-20', 'Apr-20', 'May-20', 'Jun-20', 'Jul-20', 'Aug-20', 'Sep-20', 'Oct-20', 'Nov-20', 'Dec-20']
		  }
		],
		yAxis: [
		  {
			type: 'value'
		  }
		],
		series: [
		  {
			name: 'AAA',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90]
		  },
		  {
			name: 'AA',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  },
		  {
			name: 'A',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  },
		  {
			name: 'BBB',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  },
		  {
			name: 'BB',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  }
		],
		//color:["#3598DC", "#F2784B", "#94A0B2", "#F3C200", "#007bff"],
		color:defColors,
	  };

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} />
		</div>
	);
}

function HistoricalExpoMaturityChart(){
	const options={
		grid: {top: 30, right: 10, bottom: 90, left: 100},
		title: {
		  text: 'Historical Exposure by Maturity',
		  left:'center'
		},
		tooltip: {
		  trigger: 'axis',
		  axisPointer: {
			type: 'cross',
			label:{
			  backgroundColor: '#6a7985'
			}
		  }
		},
		legend:{
			bottom:'0', left:'center', icon:'roundRect', itemGap:25,
		},
		xAxis: [
		  {
			type: 'category',
			boundaryGap: false,
			axisLabel:{rotate:90},
			data: ['Jan-20', 'Feb-20', 'Mar-20', 'Apr-20', 'May-20', 'Jun-20', 'Jul-20', 'Aug-20', 'Sep-20', 'Oct-20', 'Nov-20', 'Dec-20']
		  }
		],
		yAxis: [
		  {
			type: 'value'
		  }
		],
		series: [
		  {
			name: '<3 Years',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90]
		  },
		  {
			name: '3-5 Years',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  },
		  {
			name: '5-10 Years',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  },
		  {
			name: '>10 Years',
			type: 'line',
			stack: 'Total',
			areaStyle: {},
			emphasis: {
			  focus: 'series'
			},
			data: [120, 132, 101, 134, 90, 230, 210, 300, 180, 290, 130, 210]
		  }
		],
		//color:["#3598DC", "#F2784B", "#94A0B2", "#F3C200"],
		color:defColors,
	};

	return (
		<div className="p-3 border bg-light1">
			<ReactECharts option={options} />
		</div>
	);
}

export default NewDetailPage;