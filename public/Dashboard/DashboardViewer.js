import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Loader from '../../../utilities/Loader';
import MuiTable from '../../../utilities/MuiTable';
import { Layout, Button, Popconfirm } from "antd";
import DashboardLogin from './DashboardLogin';
const { Content } = Layout;

const DashboardViewer = (props) => {

    const [dashboard, setDashboard] = useState(null);
    const [csrftoken, setcsrftoken] = useState(null);

    useEffect(() => {
        getLogin();
        // getDashboard();
        // eslint-disable-next-line
    }, []);

    const getLogin = async ()=>{
       
        try{
            let loginInfo = await axios({
                method: 'get',
                url: 'https://idsp.incedolabs.com:8093/login/'
            })
        
        let temptoken = loginInfo.data.substring(
            loginInfo.data.indexOf("value=") + 7 , 
            loginInfo.data.lastIndexOf(">")
        );    

        let token = temptoken.substring(0, temptoken.indexOf(">") - 1);
        console.log("Superset Login Info", token, typeof(loginInfo.data), loginInfo);
        setcsrftoken(token);  
        }catch(e){
            // let token = text.substring(
            //     text.indexOf("value=") + 7, 
            //     text.lastIndexOf(">"));
            //     // setcsrftoken(token); 
            //     let newtoken = token.substring(0, token.indexOf(">") - 1);
            // console.log("AAja token", e, newtoken);
          
            
        }
       
    }

    const getDashboard = async () => {
        try{
        let listDashboard = await axios({
            method: 'get',
            url: 'https://idsp.incedolabs.com:8093/api/v1/dashboard/?q={%22order_column%22:%22changed_on_delta_humanized%22,%22order_direction%22:%22desc%22,%22page%22:0,%22page_size%22:25}',
            //url: '/dashboard/dashboardlist.json'
            "crossDomain": true,
                "headers": {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
        });
        console.log('Dashboard', listDashboard.data);
        if (listDashboard.data.label_columns) { setDashboardHeader(listDashboard.data.label_columns, listDashboard.data.result); }
        // if(listDashboard.data.result){setDashboardRecords(listDashboard.data.result);}
    }catch(e){
        throw e;
    }
    };

    const setDashboardHeader = (listColumns, listRecords) => {
        let dashboardHeader = [{
            field: "dashboard_title",
            headerName: "Dashboard",
            flex:2
        },
        {
            field: "changed_by_name",
            headerName: "Modified By",
            flex:2
        },
        {
            field: "changed_on_utc",
            headerName: "Modified On",
            flex:2
        }
        ]

        let dashboardRecords = [...listRecords];

        // dashboardRecords.forEach(record => {
        //     dashboardHeader.forEach(header => {
        //         if (!record[header.field]) {
        //            console.log(record);
        //             dashboardRecords.push(record);
        //         }
        //     })
        // })

        setDashboard({ dashboardHeader, dashboardRecords });

    }


    //csrftoken &&
    return (<>
            {
            
                // <div dangerouslySetInnerHTML={{__html: csrftoken}} />
            

            <DashboardLogin token={csrftoken}/>}
            {/* {dashboard ? (
                <>
                    <MuiTable
                        columns={dashboard.dashboardHeader}
                        rows={dashboard.dashboardRecords}
                    />
                </>
            ) : (
                <Loader style={{ marginLeft: "40%" }} />
            )} */}

        </>
    )
}

export default DashboardViewer;