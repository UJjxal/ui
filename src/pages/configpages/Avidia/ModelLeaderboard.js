import React, { useState } from 'react';

import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBCardGroup,
	MDBCardImage,
	MDBCardText,
	MDBCardTitle,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBInput,
} from 'mdbreact';

const ModelLeaderboard = () => {
	const [radio, setRadio] = useState(1);

	const onClick = nr => {
		setRadio(nr);
	};

	const model_board = {
		columns: [
			{
				label: 'Rank',
				field: 'rank',
			},
			{
				label: 'Estimator',
				field: 'estimator',
			},
			{
				label: 'Accuracy',
				field: 'accuracy',
			},
			{
				label: 'KS Statistic',
				field: 'ksstatistic',
			},
			{
				label: 'AUC ROC',
				field: 'aucroc',
			},
			{
				label: 'Active',
				field: 'active',
			},
		],
		rows: [
			{
				rank: '1',
				estimator: 'XGB Classifier',
				accuracy: '0.89',
				ksstatistic: '0.48',
				aucroc: '0.87',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem', marginBottom: '1rem !important' }}
						onClick={() => onClick(1)}
						checked={radio === 1 ? true : false}
						label=""
						type="radio"
						id="radio1"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '2',
				estimator: 'XGB Classifier',
				accuracy: '0.78',
				ksstatistic: '0.41',
				aucroc: '0.88',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(2)}
						checked={radio === 2 ? true : false}
						label=""
						type="radio"
						id="radio2"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '3',
				estimator: 'XGB Classifier',
				accuracy: '0.75',
				ksstatistic: '0.40',
				aucroc: '0.84',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(3)}
						checked={radio === 3 ? true : false}
						label=""
						type="radio"
						id="radio3"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '4',
				estimator: 'Random Forest Classifier',
				accuracy: '0.90',
				ksstatistic: '0.40',
				aucroc: '0.80',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(4)}
						checked={radio === 4 ? true : false}
						label=""
						type="radio"
						id="radio4"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '5',
				estimator: 'AdaBoost Classifier',
				accuracy: '0.87',
				ksstatistic: '0.38',
				aucroc: '0.79',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(5)}
						checked={radio === 5 ? true : false}
						label=""
						type="radio"
						id="radio5"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '6',
				estimator: 'Logistic Regression Classifier',
				accuracy: '0.67',
				ksstatistic: '0.32',
				aucroc: '0.76',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(6)}
						checked={radio === 6 ? true : false}
						label=""
						type="radio"
						id="radio6"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '7',
				estimator: 'Random Forest Classifier',
				accuracy: '0.76',
				ksstatistic: '0.28',
				aucroc: '0.72',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(7)}
						checked={radio === 7 ? true : false}
						label=""
						type="radio"
						id="radio7"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '8',
				estimator: 'XGB Classifier',
				accuracy: '0.72',
				ksstatistic: '0.27',
				aucroc: '0.77',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(8)}
						checked={radio === 8 ? true : false}
						label=""
						type="radio"
						id="radio8"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '9',
				estimator: 'XGB Classifier',
				accuracy: '0.70',
				ksstatistic: '0.26',
				aucroc: '0.75',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(9)}
						checked={radio === 9 ? true : false}
						label=""
						type="radio"
						id="radio9"
						containerClass="mb-4"
					/>
				),
			},
			{
				rank: '10',
				estimator: 'XGB Classifier',
				accuracy: '0.78',
				ksstatistic: '0.25',
				aucroc: '0.76',
				active: (
					<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						onClick={() => onClick(10)}
						checked={radio === 10 ? true : false}
						label=""
						type="radio"
						id="radio10"
						containerClass="mb-4"
					/>
				),
			},
		],
	};

	return (
		<MDBContainer fluid flexCenter className="mt-4 mb-3">
			<MDBRow>
				<MDBCardGroup deck className="mt-1">
					<MDBCard style={{ width: '66.5rem', height: '40rem' }} className="pl-1">
						<MDBCardBody className="pl-1 pr-1 pt-0 pb-0">
							{/* <MDBCardTitle tag="h6" style={{ color: 'black' }}>
								Model ID: 12345
								
							</MDBCardTitle> */}
							<MDBCardText>
							<MDBTable responsive striped className="pl-3 pt-0">
									<MDBTableHead columns={model_board.columns} />
									<MDBTableBody rows={model_board.rows} />
								</MDBTable>
							</MDBCardText>
						</MDBCardBody>
					</MDBCard>
				</MDBCardGroup>
			</MDBRow>
		</MDBContainer>
	);
};

export default ModelLeaderboard;
