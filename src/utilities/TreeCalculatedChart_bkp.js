import React from 'react';
import Tree from 'react-d3-tree';
import { MDBIcon } from 'mdbreact';
import { Popover } from "antd";
import { AppContext } from '../AppProvider';
import { colorRange, defaultColor } from './AllTables';
import { convertToInternationalCurrencySystem } from './commonfunctions';
import './TreeChart.css';

class NodeLabel extends React.PureComponent {
	getNodeStatus = (status) => {
		let selectedThreshold = colorRange.filter((col) => col.val === status);
		if (selectedThreshold.length > 0) {
			return selectedThreshold[0].color;
		}
		return defaultColor;
	};

	render() {
		// console.log('TREE PROPS ARE', this.props);
		const { className, nodeData, drawerOpen, polarity, unit, currentNode } = this.props;
		// console.log("NODE DATA", nodeData);
		const transform =
			!nodeData._collapsed && nodeData.relation
				? nodeData.relation.length / 40 > 1
					? Object.keys(nodeData.attributes).length < 5 ? 'translate(0px, 60px)' : 'translate(0px, 20px)'
					: Object.keys(nodeData.attributes).length < 5 ? 'translate(0px, 80px)' : 'translate(0px, 40px)'
				: null;

		return (
			<React.Fragment>
				<div
					className={className}
					style={{ border: currentNode === nodeData.nodeId ? '2px solid black' : '1px solid #ccc' }}
				>
					<div className="node-data" style={{ height: '90%' }}>
						<Popover
							style={{ border: '1px solid black !important' }}
							className="text-center"
							content={
							
							<div style={{ fontSize: '0.8rem'}} className="p-2">
								{nodeData.name}
								{Object.entries(nodeData.attributes).map(function (key, i) {
										if (key[0] != 'node_status') {
											return (
												<span key={i} className="d-flex flex-row align-items-center">
													<span className="mr-1">{key[1]}</span>
													<span className="mr-1">{unit ? unit[key[0]] : null}</span>
													<span className="">{key[0]}</span>
												</span>
											);
										}
									})}
								
								</div>}
							trigger="hover"
						> 
						<div className="d-flex flex-row align-items-center justify-content-between ---">
							<div className="node-title" onClick={() => drawerOpen(nodeData)}>
								{nodeData.name}
								{/* <span className="custom-tooltip">{nodeData.name}</span> */}
							</div>
							<MDBIcon
								className="node-title mr-2 p-2"
								icon={currentNode === nodeData.nodeId ? 'chevron-left' : 'chevron-right'}
							/>
						</div>
					</Popover>
						{Object.entries(nodeData.attributes).map(function (key) {
							if (key[0] != 'node_status') {
								return (
									<div key={key} className="d-flex flex-row align-items-center">
										{/* <span className="node-attr-1">{polarity ? polarity[key[0]] : null}</span> */}
										{/* <span>{polarity ? <MDBIcon icon={polarity[key[0]]=="-"?"arrow-down":"arrow-up"}/> : null}</span> */}
										<span className="mr-1 node-attr-3">{unit && unit[key[0]] === '$' ? convertToInternationalCurrencySystem(key[1]) : key[1].toLocaleString('en-US')}</span>
										<span className="node-attr-1 mr-2">{unit ? unit[key[0]] : null}</span>
										<span className="node-attr-2">{key[0]}</span>
									</div>
								);
							}
						})}
					</div>
					<div
						className="node-status"
						style={{ backgroundColor: this.getNodeStatus(this.props.nodeData.attributes.node_status) }}
					></div>
					{nodeData._children ? (
						<div
							className="node-action"
						// title={nodeData._collapsed ? "Expand" : "Collapse"}
						>
							{nodeData._children &&
								(nodeData._collapsed ? <MDBIcon icon="plus" /> : <MDBIcon icon="minus" />)}
						</div>
					) : null}
				</div>
				{!nodeData._collapsed && nodeData.relation ? (
					<div
						id="child-relation"
						title={nodeData.relation}
						style={{
							border: '1px solid #000',
							padding: '5px',
							transform: transform,
							color: '#fff',
							textAlign: 'center',
							background: this.getNodeStatus(this.props.nodeData.attributes.node_status),
							borderRadius: 20,
							maxHeight: '4.5rem',
						}}
					>
						{nodeData.relation.substring(0, 20) + "..."}
					</div>
				) : null}
			</React.Fragment>
		);
	}
}

class TreeChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			zoom: 0.75,
		};
		this.t = undefined;
		this.start = 100;

		this.onMouseDown = this.onMouseDown.bind(this);
		this.repeat = this.repeat.bind(this);
		this.zoom = this.zoom.bind(this);

		// this.onMouseUp = this.onMouseUp.bind(this)
		this.zoomOut = this.zoomOut.bind(this);
		this.zoomOutRepeat = this.zoomOutRepeat.bind(this);
		this.zoomOutDown = this.zoomOutDown.bind(this);

		this.onMouseUp = this.onMouseUp.bind(this);
	}
	//const dimensions = props.treeData.treeContainer.getBoundingClientRect();

	nodeSvgShape = {
		shape: 'rect',
		shapeProps: {
			width: 140,
			height: 55,
			y: -20,
			x: -10,
			style: { fill: 'skyblue', stroke: 'black', strokeWidth: 1 },
		},
	};
	nodeSize = {
		x: 250,
		y: 305,
	};
	translate = {
		x: 540,
		y: 10,
		// x: dimensions.width / 2,
		// y: dimensions.height / 2
	};
	separation = {
		siblings: 1,
		nonSiblings: 1,
	};

	elbow = (d, i) => {
		let margin = { top: 20, right: 40, bottom: 20, left: 30 },
			width = 250 - margin.left - margin.right,
			height = 270 - margin.top - margin.bottom;
		return (
			'M' +
			d.source.x +
			',' +
			(height + d.source.y) +
			'V' +
			d.target.y +
			'H' +
			d.target.x +
			'V' +
			(height + d.target.y - width)
		);
	};

	// ZOOM IN
	onMouseDown() {
		this.repeat();
	}

	repeat() {
		this.zoom();
		this.t = setTimeout(this.repeat, this.start);
		this.start = this.start / 2;
	}

	zoom() {
		this.setState({ zoom: this.state.zoom + 0.1 });
	}

	// ZOOM OUT
	zoomOut() {
		this.setState({ zoom: this.state.zoom - 0.1 });
	}

	zoomOutRepeat() {
		this.zoomOut();
		this.t = setTimeout(this.zoomOutRepeat, this.start);
		this.start = this.start / 2;
	}

	zoomOutDown(e) {
		e.preventDefault();
		this.zoomOutRepeat();
	}

	// STOP ZOOMING
	onMouseUp() {
		clearTimeout(this.t);
		this.start = 100;
	}

	handleClick = (nodeData, evt) => {
		this.props.drawerOpen(nodeData);
	};

	render() {
		let colorThreshold = [];
		// console.log("TREE PROPS", this.props);
		//PNC Header

		if (this.props.colorThreshold && this.props.colorThreshold !== "automatic") {

			for (const [key, value] of Object.entries(this.props.colorThreshold)) {
				if (key) {

					colorThreshold.push({ range: key, color: colorRange.filter((col) => col.val === value)[0].color });
				}
			}
		} else {
			colorThreshold = colorRange.map(val => ({ range: val.label, color: val.color }));
		}
		return (
			<AppContext.Consumer>
				{({ }) => {

					return (
						<React.Fragment>
							<div id="treeWrapper" className="zoomControl">
								<Tree
									collapsible={true}
									data={this.props.treeData}
									orientation="vertical"
									zoom={this.state.zoom}
									// onClick={}
									pathFunc={this.elbow}
									initialDepth={1}
									allowForeignObjects
									nodeSvgShape={{ shape: 'none' }}
									nodeSize={{ x: 250, y: 305 }}
									separation={{ siblings: 2, nonSiblings: 2 }}
									styles={{
										links: {
											stroke: '#CCC',
											strokeWidth: 2.5,
										},
									}}
									nodeLabelComponent={{
										render: (
											<NodeLabel
												className="tree-node"
												drawerOpen={this.props.drawerOpen}
												unit={this.props.unit}
												polarity={this.props.polarity}
												currentNode={this.props.currentNode}
												expand
											/>
										),
										foreignObjectWrapper: {
											style: {
												width: '260px',
												height: Object.keys(this.props.treeData[0].attributes).length > 4 ? '200px' : '160px',
												x: -130,
												y: 50,
											},
										},
									}}
									translate={{
										x: window.innerWidth / 2 - 150,
										y: -30,
									}}
								/>
							</div>

							{this.props.colorThreshold ? (
								<React.Fragment>
									<div className="tree-legend tree-legend-right">
										<div className="d-flex flex-row justify-content-center">
											<button
												className="zoomIn p-2 m-2 mb-0 h-10 zoom-btn"
												onMouseUp={this.onMouseUp}
												onMouseDown={this.onMouseDown}
											>
												<i className="fas fa-search-plus"></i>
											</button>
											<button
												className="zoomOut p-2 m-2 h-10 zoom-btn"
												onMouseUp={this.onMouseUp}
												onMouseDown={this.zoomOutDown}
											>
												<i className="fas fa-search-minus"></i>
											</button>
										</div>
									</div>

									<div className="tree-legend tree-legend-left">
										{/* <h6 style={{fontSize:"0.8rem"}} className="text-center">Legend</h6> */}
										<ul className="d-flex flex-column align-items-start justify-content-center pl-5">
											{colorThreshold.map((item, i) => {
												// let classStatus = item;
												return (
													<li key={i} className="d-flex flex-row align-items-center justify-content-center mb-2">
														<div
															className="color-block"
															style={{ backgroundColor: item.color }}
														></div>
														<div className="legend-range ml-1">{item.range}</div>
													</li>
												);
											})}
										</ul>
									</div>
								</React.Fragment>
							) : null}
						</React.Fragment>
					);
				}}
			</AppContext.Consumer>
		);
	}
}

// const TreeChart = (props) => {
//   return (
//     <div id="treeWrapper" style={{ width: "100%", height: "30em" }}>
//       <Tree
//         orientation="vertical"
//         zoom={3}
//         zoomable={true}
//         data={props.treeData}
//       />
//     </div>
//   );
// };

export default TreeChart;
