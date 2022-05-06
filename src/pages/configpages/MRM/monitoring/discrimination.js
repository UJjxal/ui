import React from "react";

import TableData from "../../../../utilities/Table";
import {Avatar} from "antd";
import { Collapse } from 'antd';

const Discrimination=(props)=>{
	const tableheader=[
		{
			title: 'Metric',
			dataIndex: 'Metric',
		},
		{
			title: 'Development',
			dataIndex: 'Development',
			align: 'right'
		},
		{
			title: 'Validation',
			dataIndex: 'Validation',
			align: 'right'
		},
		{
			title: '% Change',
			dataIndex: '% Change',
			align: 'right'
		},
		{
			title: 'Risk',
			dataIndex: 'Risk',
			align: 'center',
			render: (text) => {
				return {
				children: (
					<Avatar
					style={{
						backgroundColor: text,
						verticalAlign: "middle",
						// display: "block",
					}}
					size="small"
					/>
				),
				};
			},
		}
	];
  	//console.log("sat", props.apiData);

	return (
		<div>
			{props.apiData.discrimination[0].label===''?(
				<TableData
					size="small"
					bordered={false}
					column={tableheader}
					dataSource={props.apiData.discrimination[0].disData}
					expand={true}
					noBordered={true}
					cardStyle={{padding:0}}
				/>
			):(
				<div>
					<Collapse defaultActiveKey={['0']} onChange={()=>{}}>
						{props.apiData.discrimination.map((v,i)=>(
							<Collapse.Panel header={v.label} key={i+''}>
								<TableData
									size="small"
									bordered={false}
									column={tableheader}
									dataSource={v.disData}
									expand={true}
									noBordered={true}
									cardStyle={{padding:0}}
								/>
							</Collapse.Panel>
						))}
					</Collapse>
				</div>
			)}
		</div>
	);
};

export default Discrimination;
