import React, {useState, useEffect} from 'react';
import { MDBCard, MDBCardTitle, MDBCardBody, MDBBtn } from 'mdbreact';
import { Button } from "@material-ui/core";
import { CONTEXT } from "../../../config";

const KPIInsights = (props) => {
    const [insights, setInsights] = useState([]);
    const [isActiveNewInsight, setActiveNewInsight] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [textarea, setTextarea] = useState('');
    const _keyInsights = insights.map(({insightsId, insightsValue, createdBy, email, createdDate}) => {
        if(isEdit === insightsId ){
            return <div className="w-100 border rounded mb-3 add-new-insight">
                <textarea onChange={(e) => setTextarea(e.target.value+'\r\n')} placeholder="Enter your insight here" className="w-100 p-3 border-0">{insightsValue}</textarea>
                <div className="d-flex justify-content-end py-1 px-2 add-new-insight-footer" style={{ backgroundColor: "#fafafa" }}>
                    <MDBBtn size="md" color="primary" outline style={{ boxShadow: 'none' }}
                        onClick={() => { setEdit(null); setTextarea(''); }}
                    >Cancel</MDBBtn>
                    <MDBBtn size="md" color="primary" style={{ boxShadow: 'none' }} disabled={textarea.length > 0 ? false : true}
                        onClick={() => { props.updateInsightsData(props.nodeId, insightsId, textarea, props.user); setEdit(false); }}
                    >Submit</MDBBtn>
                </div>
            </div>
            }

        return <div key={insightsId} className="mb-3" style={{backgroundColor: "#fafafa"}}>
                <div className="pt-4">
                    <div className="d-flex justify-content-between user-details">
                        <h5 className="font-weight-bold text-capitalize">{createdBy}</h5>
                        <p className='text-muted'>{new Date(createdDate).getDate() + '/' + (new Date(createdDate).getMonth() + 1) + '/' + new Date(createdDate).getFullYear()}</p>
                    </div>
                    <p className="pr-5" style={{whiteSpace: "pre-wrap"}}>{insightsValue}</p>
                </div>
                <div className="d-flex justify-content-end align-items-center pb-2 border-bottom">
                    {props.user.userMail === email && <>
                        <Button size="small" variant="outlined" className="text-primary-blue px-3 py-1 mr-2"
                            onClick={() => setEdit(insightsId)}>
                            Edit
                        </Button>
                        <Button size="small" className={'bg-primary-blue text-white px-3 py-1'}
                            onClick={() => {props.deleteInsightsData(props.nodeId, insightsId); setEdit(false);}}>
                            Delete
                        </Button>
                    </>}
                    {/* SI-79 Call Action Recommendation Creation: Need to comment before build */}
                    {/* <MDBBtn size="md" color="secondry" style={actionBtn} 
                       onClick={() => props.triggerCreateActionRecommendation(true)}>
                        Write an Action Recommendation
                    </MDBBtn> */}
                </div>
            </div>
    });

    useEffect(() => {
        if(props.insights === null){
            setInsights([]);
            return
        }
        if (props.insights.length > 0) {
            let filter = JSON.stringify(props.filter);
            const filteredInsights = props.insights.filter(rec => rec.entity === props.entity && rec.filter === filter);
            setInsights(filteredInsights);
        } else {
            props.getInsightsData(props.nodeId);
        }

    }, [props.insights]);


    return <MDBCard className="p-4 m-0 mt-2 shadow-none border">
            <div className="d-flex justify-content-between">
                <MDBCardTitle>Key Insights</MDBCardTitle>
                {!isActiveNewInsight ? 
                    <MDBBtn size="md" color="primary" onClick={() => setActiveNewInsight(true)}>
                        +ADD NEW INSIGHT
                    </MDBBtn>
                : null}
            </div>
            <MDBCardBody>
                <div>
                {isActiveNewInsight ? 
                    <div className="w-100 border rounded mb-3 add-new-insight">
                        <textarea onChange={(e) => setTextarea(e.target.value+'\r\n')} placeholder="Enter your insight here" className="w-100 p-3 border-0"></textarea>
                        <div className="d-flex justify-content-end py-1 px-2 add-new-insight-footer" style={{ backgroundColor: "#fafafa" }}>
                            <MDBBtn size="md" color="primary" outline style={{ boxShadow: 'none' }}
                                onClick={() => { setActiveNewInsight(false); setEdit(null); setTextarea(''); }}
                            >Cancel</MDBBtn>
                            <MDBBtn size="md" color="primary" style={{ boxShadow: 'none' }}
                                disabled={textarea.length > 0 ? false : true}
                                onClick={() => { props.createInsightsData(props.nodeId, textarea, props.user); setActiveNewInsight(false);}}
                            >Submit</MDBBtn>
                        </div>
                    </div>
                : null}
                {
                    insights.length > 0 ? _keyInsights :
                        <div className="w-100 row align-items-center justify-content-center my-5">
                            <div className="col-md-4">
                                <img className="w300" src={`${CONTEXT}/empty-state.svg`} alt="Empty State" />
                            </div>
                            <div className="col-md-4 text-center">
                                <h4>No Key Insights!</h4>
                                <p className="fs16">There are no Key Insights for this node. The business analysts and executives can share their insights here as a result of their Root Cause Analysis.</p>
                            </div>
                        </div>
                }
                </div>
            </MDBCardBody>
        </MDBCard>
}
const actionBtn = {
    boxShadow: 'none',
    border: '2px solid #4184f2',
    color: '#4184f2',
    borderRadius: '5px',
    fontSize: '1rem',
    textTransform: 'inherit',
    padding: '8px 12px',
}
export default KPIInsights;