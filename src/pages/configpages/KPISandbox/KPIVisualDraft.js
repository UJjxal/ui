import React, { Component, useContext } from 'react';
import { Redirect } from 'react-router-dom';
//import GoBack from './GoBack';
import KPIVisualConfiguration from './KPIVisualConfiguration';
import { AppContext } from '../../../AppProvider';

import { CONTEXT } from '../../../config';
export default class KPIVisualDraft extends Component {
	//             Edit Analysis = Go to KPI Builder
	// PNC Header
	componentDidMount() {
		console.log('Calling Visual Draft mount', this.props.treeID);
	}
	componentDidUpdate() {
		console.log('Calling Visual Draft update', this.props.treeID);
	}


	render() {
		return ( 
			<AppContext.Consumer>
				{
					({
						token,
						selectedKPITreeID,
						KPITreeLoading,
						newAnalysisSaved,
						newAnalysisPublished,
						changeNewAnalysisSaved,
						selectedKPILink,
					}) =>
					
						newAnalysisSaved || newAnalysisPublished ? (
							<>
								{/* {changeNewAnalysisSaved()} LH-627 */}

								{/* <Redirect to={selectedKPILink} /> */}
							</>
						) : (
							<KPIVisualConfiguration
								EditTreeID={this.props.treeID}
								newAnalysis={this.props.treeID ? false : true}
								newAnalysisSaved={newAnalysisSaved}
								NewTreeID={this.props.treeID ? '' : selectedKPITreeID.id}
								KPITreeLoading={KPITreeLoading}
								token={token}
							/>
						)
				
				}
			</AppContext.Consumer>
		);
	}
}
