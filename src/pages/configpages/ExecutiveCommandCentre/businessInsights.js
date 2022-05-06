import React, { useState, useContext, useEffect } from 'react';
import { Table, Select } from "antd";
import { Icon, Button } from '@material-ui/core';
import { MDBContainer, MDBModal, MDBIcon, MDBModalBody, MDBModalFooter, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import ReactECharts from 'echarts-for-react';
import { CONTEXT } from "../../../config";
import { Link } from 'react-router-dom';
import { AppContext } from "../../../AppProvider";
import PageTitle from '../../../utilities/PageTitle';

const BusinessInsights = () => {

    const { Option } = Select;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({
         chart: 'line',
         data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6]
        });

    const optionsModel = {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            left: '5%',
            right: '2%',
            top: '8%'
        },
        xAxis: {
            type: 'category',
            data: 'xname' in selectedData ? selectedData['xname'] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: selectedData.data,
            type: selectedData.chart,
            barWidth: 40,
            color: '#007bff',
            lineStyle: {
                color: '#007bff',
                width: 3,
                type: 'solid'
            },
            Symbol:'circle',
            symbolSize: 6,
            itemStyle: {
                borderWidth: 2,
                borderColor: '#007bff',
                color: '#000'
            }
        }]
    };

    const [treeLink, setTreeLink] = useState("#");
    const selectedTreeId = useContext(AppContext).selectedTemplateTreeID; 
    const page = useContext(AppContext).pageContent.filter(page=>page.treeID===selectedTreeId);
    useEffect(()=>{
       
        if(page.length > 0){
           setTreeLink(page[0].link);
        }else{
            setTreeLink("#");
        }     
    },[]);

	const changeData = e => {
        switch(e){
            case 'behave':
                setSelectedData({chart: 'line', data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6] });
            break;
            case 'debincrat':
                setSelectedData({chart: 'line', data: [5.1, 5.6, 6.3, 7.3, 8.3, 9.9, 11.6, 13.2, 14.8, 14.7] });
            break;
            case 'creshawal':
                setSelectedData({chart: 'line', data: [5.6, 5.8, 6.2, 7.5, 8.1, 9.1, 10.0, 11.9, 12.4, 14.8] });
            break;
            case 'lenrel':
                setSelectedData({chart: 'line', data: [5.2, 5.6, 6.7, 7.2, 8.4, 9.5, 10.1, 12.5, 13.1, 15.2] });
            break;
            case 'totloaout':
                setSelectedData({chart: 'line', data: [5.2, 5.7, 6.3, 7.2, 8.8, 10.2, 13.7, 14.9, 11.7, 9.5] });
            break;
            case 'debincrat':
                setSelectedData({chart: 'line', data: [5.1, 5.6, 6.3, 7.3, 8.3, 9.9, 11.6, 13.2, 14.8, 14.7] });
            break;
            case 'balexicar':
                setSelectedData({chart: 'line', data: [5.3, 6.7, 7.4, 8.1, 8.2, 8.9, 9.9, 11.1, 12.4, 14.5] });
            break;
            case 'complaints':
                setSelectedData({chart: 'line', data: [15.2, 14.3, 12.8, 10.9, 9.7, 8.5, 8.1, 7.9, 7.5, 6.1] });
            break;
            case 'marseg':
                setSelectedData({chart: 'bar', data: [8, 12], xname:['Massive', 'Premium'] });
            break;
            case 'numproava':
                setSelectedData({chart: 'bar', data: [7, 9, 12], xname:[1, 2, 3] });
            break;

            default:
                setSelectedData({chart: 'line', data: [11.9, 14.8, 15.4, 13.1, 12.5, 10.4, 9.2, 8.3, 7.4, 6.6] });
        }
	};

    return <div className="container-fluid mt-4 mb-5">
        
        {selectedTreeId && treeLink!=="#" && <Button className="mx-3 mb-3"variant="contained" color="primary" style={{ background: "#3f88c5"}}>
        { /* Sanjit - Set Tree Link from Saved KPI Tree ID*/}
            <Link 
            to={`${CONTEXT}${treeLink}`}
            className="text-white">{`< Analysis Tree`}</Link>
        </Button>}
        {/* <h4 className="mx-3"></h4> */}
        <PageTitle  title={"Business Insights - AI Enabled Cross Sell"} marginLeft={0}/>
        <div className="container-fluid mt-4 mb-5">
            <MDBRow>
                <MDBCol md="9">
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody className="pb-0">
                                <MDBCardTitle tag="h5">Significant Feature List</MDBCardTitle>
                                    <ReactECharts option={optionsFeature} style={{minHeight: '382px'}}/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody className="pb-0">
                                <MDBCardTitle tag="h5">Relationship with Model Event</MDBCardTitle>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="m-0">
                                        Select Feature
                                        <img src="./right.svg" style={{ height: '1rem', width: '1rem', marginLeft: '0.5rem' }}/>
                                    </h6>
                                    <Select defaultValue="behave" style={{ width: 240 }} onChange={e => changeData(e)}>
                                        <Option value="behave">Behavior score</Option>
                                        <Option value="debincrat">Debt to Income ratio</Option>
                                        <Option value="lenrel">Length of Relationship</Option>
                                        <Option value="creshawal">Credit Share of Wallet</Option>
                                        <Option value="marseg">Market Segment</Option>
                                        <Option value="balexicar">Balance on existing card</Option>
                                        <Option value="complaints">Complaints in the last 6 months</Option>
                                        <Option value="numproava">Number of products owned</Option>
                                        <Option value="totloaout">Total loan outstanding</Option>
                                    </Select>
                                </div>
                                    <ReactECharts option={optionsModel} style={{minHeight: '350px'}}/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                </MDBCol>
                <MDBCol md="3">
                    <MDBCard className="h-100">
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Key Insights</MDBCardTitle>
                            {
                                keyInsights.map(({title, description, link}, i) => (
                                    <div key={i} className="pb-2 mb-2 border-bottom">
                                        <div className="d-flex justify-content-between">
                                        </div>
                                        <div className="pt5 pb5">{description}</div>
                                    </div>
                                ))
                            }
                            <div className="d-flex mt-4">
                                <Button variant="contained" color="primary" style={{ background: "#3f88c5" }} onClick={() => setIsOpen(true)}>Campaign List</Button>
                                <Button variant="contained" color="primary" style={{ background: "#3f88c5", marginLeft: "0.5em"}}>
                                    <Link to={`${CONTEXT}/SG9tZS1SZXNwb25zZSBQcm9wZW5zaXR5IE1vZGVscyBDcmVkaXQgQ2FyZHM=`} className="text-white">ML Ops Engine</Link>
                                </Button>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </div>
        <MDBModal isOpen={isOpen} className="cascading-modal px-5 my-5" size="fluid">
            <div className="py-3 px-4 d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #dee2e6" }}>
                <h2 className="m-0 font-weight-normal" style={{ color: '#1E4564' }}>Campaign List</h2>
                <button className="border-0 bg-white" onClick={() => setIsOpen(false)}><MDBIcon icon="times" /></button>
            </div>
            <MDBModalBody className="py-4">
                <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
            </MDBModalBody>
        </MDBModal>
    </div>
}

const optionsFeature = {
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '35%',
        right: '2%',
        top: '5%'
    },
    xAxis: {
        type: 'value',
    },
    yAxis: {
        type: 'category',
        axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value) {
              return (value.length > 20 ? (value.slice(0,18)+"...") : value )
            }
        },
        data: ['Others', 'Total loan outstanding', 'Number of products owned', 'Complaints in the last 6 months', 'Balance on existing card', 'Market Segment', 'Credit Share of Wallet', 'Length of Relationship', 'Debt to Income ratio', 'Behaviour Score']
    },
    series: [{
        data: [4, 6, 7, 7, 7, 9, 11, 11, 17, 23 ],
        type: 'bar',
        color: '#92B4F3',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    }]
};

const keyInsights = [
    {title: 'Portfolio Size', description: 'Customers with high behaviour score are less likely to respond to cross sell campaigns', link: ''},
    {title: 'Channel Distribution', description: 'No. of products & total loan outstanding, are the least important factors impacting the response to cross sell campaigns ', link: ''},
    {title: 'Sales Conversion', description: 'Balance on existing card is 4 times less important that debt to income ratio ', link: ''},
]
const columns = [
    {
        title: 'S.No.',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Campaign ID',
        dataIndex: 'CampaignID',
        key: 'CampaignID',
      },
      {
        title: 'Recommended List',
        dataIndex: 'RecommendedList',
        key: 'RecommendedList',
      }
    ]
const dataSource = [
    {
        "key": "1",
        "CampaignID": "Campaign_123_July",
        "RecommendedList": <a style={{color:"#1f7244"}} target="_blank" href={`${CONTEXT}/Campaign_123_July.csv`}><MDBIcon icon="file-csv" size="2x" /></a>
    },
    {
        "key": "2",
        "CampaignID": "Campaign_234_Sep",
        "RecommendedList": <a style={{color:"#1f7244"}}><MDBIcon icon="file-csv" size="2x" /></a>
    },
    {
        "key": "3",
        "CampaignID": "Campaign_3E1_Jan",
        "RecommendedList": <a style={{color:"#1f7244"}}><MDBIcon icon="file-csv" size="2x" /></a>
    },
    {
        "key": "4",
        "CampaignID": "Campaign_586_Dec",
        "RecommendedList": <a style={{color:"#1f7244"}}><MDBIcon icon="file-csv" size="2x" /></a>
    },
]
export default BusinessInsights;