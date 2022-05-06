import React, { Component } from 'react';
import KpiComponent from './KPIVisualComponent';
import { AppContext } from '../../../AppProvider';
import kpiService from '../../../services/kpiService';
// import CreateAnalysisModal from './CreateAnalysisModal';
import { initialParameterList } from '../../../utilities/AllTables';


export default class KPIVisualConfiguration extends Component {
	state = {
		displayNewAnalysis: null,
		newAnalysisAccepted: false,
		kpiData: [],
		sampleKPITree: [],
		analysisId: '',
		analysisName: '',
		analysisGoal: '',
		colorThreshold: {},
		KPIDomain:'',
		kpiTreeParameter: [initialParameterList],
		filters: [], //PNC Header
		drivers:[],
		cohorts:[]   //LH-572
	};

	acceptNewAnalysis = () => {
		this.setState({ displayNewAnalysis: false, newAnalysisAccepted: true });
	};

	// Two cases - New Analysis = Display Create New Analysis Modal and go to KPI Builder
	// Edit Analysis = Go to KPI Builder

	getKPITreeData = (treeID) => {
		let colorThreshold=null;
		if (treeID !== '') {
			kpiService.getTreeNodes(treeID)
			.then(({ data }) => {				
				if (data.code === 200) {
					//let treeDesc = data.response[0].kpi_tree_name;
					try{
						colorThreshold = JSON.parse(data.response.colorThreshold);
					}catch(err){
						colorThreshold = data.response.colorThreshold;
					}
					if (data.response) {
						
						let param = [];
						if(data.response.kpiTreeParameter){
							param = JSON.parse(data.response.kpiTreeParameter);
						}
						this.setState({
							kpiData: [...JSON.parse(data.response.rawTree)],
							sampleKPITree: [...JSON.parse(data.response.sampleTree)],
							analysisId: data.response.kpiTreeId,
							analysisName: data.response.kpiTreeName,
							analysisGoal: data.response.kpiTreeGoal,
							colorThreshold: colorThreshold,
							KPIDomain: data.response.kpiTreeDomain, 
							// kpiTreeParameter:  param.length > 0 ? param : [initialParameterList],
							filters:data.response.chosenFilter && data.response.chosenFilter !== undefined 
							?[...JSON.parse(data.response.chosenFilter)] //PNC Header
							:[],
							drivers:data.response.populateDrivers && data.response.populateDrivers !== undefined 
							?[...JSON.parse(data.response.populateDrivers)] //PNC Header
							:[],
							cohorts:data.response.cohortName && data.response.cohortName !== undefined 
							?[...JSON.parse(data.response.cohortName)] //LH-572
							:[],
						});
					}
				}
			})
			.catch(error => console.error(error.message))
		}
	};

	componentDidMount() {
		if (this.props.EditTreeID) {
			// this.setState({ displayNewAnalysis: false });
			this.getKPITreeData(this.props.EditTreeID);
		} else if (this.props.NewTreeID !== '' && this.props.newAnalysisSaved) {
			this.getKPITreeData(this.props.NewTreeID);
		}
	}

	render() {
		return (
			<AppContext.Consumer>
				{({
					initialkpiData,
					token,
					KPITreeLoading,
					KPIError,
					siderKey,
					setKPITreeData,
					changeNewAnalysisSaved,
					selectedKPIDomain, //PNC Header
				}) =>
					// this.state.displayNewAnalysis ? (
					// 	<CreateAnalysisModal acceptNewAnalysis={this.acceptNewAnalysis} />
					// ) :
					// this.props.newAnalysis && !this.props.newAnalysisSaved? (
					this.props.newAnalysis ? (
						<KpiComponent
							initialData={initialkpiData}
							sampleKPITree={this.state.kpiData.length > 0 ? this.state.sampleKPITree : []}
							token={token}
							loading={KPITreeLoading}
							KPIError={KPIError}
							siderKey={siderKey}
							setKPITreeData={setKPITreeData}
							isNewAnalysis={true}
							newAnalysisSaved={this.props.newAnalysisSaved}
							analysisName={''}
							analysisGoal={''}
							analysisId={''}
							domain={selectedKPIDomain} //PNC Header
							editAnalysis={this.props.editAnalysis}
							kpiTreeParameter={this.state.kpiTreeParameter}
						/>
					) : // :this.props.newAnalysis && this.props.newAnalysisSaved && this.state.kpiData.length > 0 && this.state.sampleKPITree.length > 0?(
					// 	<KpiComponent
					// 		initialData={this.state.kpiData}
					// 		sampleKPITree={this.state.sampleKPITree}
					// 		token={token}
					// 		loading={KPITreeLoading}
					// 		KPIError={KPIError}
					// 		siderKey={siderKey}
					// 		setKPITreeData={setKPITreeData}
					// 		isNewAnalysis={true}
					// 		newAnalysisSaved={this.props.newAnalysisSaved}
					// 		analysisName={this.state.analysisName}
					// 		analysisGoal={this.state.analysisGoal}
					// 		analysisId={this.state.analysisId}
					// 		colorThreshold={this.state.colorThreshold}

					// 	/>

					// ):

					this.state.kpiData.length > 0 && this.state.sampleKPITree.length > 0 ? (
						<KpiComponent
							initialData={this.state.kpiData} //replace initial kpi data with selected kpi
							sampleKPITree={this.state.sampleKPITree}
							token={token}
							loading={KPITreeLoading}
							KPIError={KPIError}
							siderKey={siderKey}
							setKPITreeData={setKPITreeData}
							isNewAnalysis={false}
							analysisName={this.state.analysisName}
							analysisGoal={this.state.analysisGoal}
							analysisId={this.state.analysisId}
							colorThreshold={this.state.colorThreshold}
							status={this.props.status}
							// domain={selectedKPIDomain} //PNC Header
							domain={this.state.KPIDomain}
							filters={this.state.filters} //PNC Header
							drivers={this.state.drivers}
							cohorts={this.state.cohorts}  //LH-572
							editAnalysis={this.props.editAnalysis}
							kpiTreeParameter={this.state.kpiTreeParameter}
						/>
					) : null
				}
			</AppContext.Consumer>
		);
	}
}