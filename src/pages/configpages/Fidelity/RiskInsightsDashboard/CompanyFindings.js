import React, {useState, useEffect} from "react";
import CustomTable from "../../../../utilities/CustomTable/Table";
import {companiesNames} from "./companiesNames";

const CompanyFindings=()=>{
    let [d, setData]=useState({
        header:[],
        result:[],
    });

    useEffect(()=>{
        let header=[
            {field:'company', headerName:'Company Name', width:300},
        ];
        for(let i=1; i<=30; i++){
            let d=i>9?i:('0'+i);
            let dateKey='f'+d+'0421';
            let dateLabel=d+'/04/21';
            header.push({field:dateKey, headerName:dateLabel, width:150, type:'number'});
        }

        let result=[];
        companiesNames.forEach(c=>{
            let data={company:c};
            for(let i=1; i<=30; i++){
                let d=i>9?i:('0'+i);
                let dateKey='f'+d+'0421';
                data[dateKey]=Math.floor(Math.random() * 60) + 1;
            }
            result.push(data);
        });

        setData({header, result});

        // eslint-disable-next-line
    }, []);

    return (
        <div className="whitebx">
            <div className="heading">Entity - Findings</div>
            <div className="content">
                <CustomTable
                    header={d.header}
                    result={d.result}
                    height={600}
                    pageSize={10}
                    filterBtn={false}
                />
            </div>
        </div>
    );
}
export default CompanyFindings;
