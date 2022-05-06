import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import KPICalculatedConfiguration from './KPICalculatedConfiguration';
import { AppContext } from '../../../AppProvider';

import { CONTEXT } from '../../../config';
export default class KPIVisualPublished extends Component {
	//             Edit Analysis = Go to KPI Builder
	//PNC Header
	componentDidMount() {
		console.log('Calling Visual Published mount', this.props.treeID);
	}
	componentDidUpdate() {
		console.log('Calling Visual Published update', this.props.treeID);
	}
	render() {
		
		return (
			<AppContext.Consumer>
				{({
					token,
					selectedKPITreeID,
					KPITreeLoading,
					selectedKPILink,
					newAnalysisPublished,
					changeNewAnalysisSaved,
					useSnackBar,
				}) =>
				newAnalysisPublished ? (
					<>
						{changeNewAnalysisSaved()}

						{/* <Redirect to={selectedKPILink} /> */}
					</>
				) : (
						<KPICalculatedConfiguration
							EditTreeID={this.props.treeID}
							KPITreeLoading={KPITreeLoading}
							token={token}
							useSnackBar={useSnackBar}
						/>
				)	
				}
			</AppContext.Consumer>
		);
	}
}
