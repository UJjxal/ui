import React, {useState, useEffect} from 'react';
import {
    MDBTable, 
    MDBTableBody,
    MDBTableHead ,
} from "mdbreact";
import "./style.css";

const SimpleTable=(props)=>{
    const [d, setData]=useState({
        header:[],
        result:[],
        showSrNo:false,
        pagination:false,
        pageSize:10,
        pageRecords:[],
        fixedHeader:false,
        bodyHeight:400,
        textCenter:false,
        striped:false,
        small:true,
    });

    const getPagedData=(allResults, pageSize)=>{
        if(!props.pagination){
            return allResults;
        }
        let res=[];
        let n=allResults.length>pageSize?pageSize:allResults.length;
        for(let i=0; i<n; i++){
            res.push(allResults[i]);
        }
        return res;
    }

    const init=()=>{
        let allResults=Array.isArray(props.result)?props.result:[];
        let pageSize=props.pageSize || 10;
        let pageRecords=getPagedData(allResults, pageSize);

        setData({
            ...d, 
            header:props.header || [], 
            result:allResults,
            showSrNo:props.showSrNo || false,
            pagination:props.pagination || false,
            pageSize,
            pageRecords,
            fixedHeader:props.fixedHeader || false,
            bodyHeight:props.bodyHeight || 400,
            textCenter:props.textCenter || false,
            striped:props.striped || false,
            small:props.small || true,
        });
    }

    useEffect(()=>{
        init();
        // eslint-disable-next-line
    }, [props]);

    return(
        <div className={d.fixedHeader?"sticky-tbl":''} style={{maxHeight:(d.fixedHeader?(d.bodyHeight+'px'):'')}}>
            {d.fixedHeader && <div className="pos-sticky-1px"></div>}
            <MDBTable small={d.small} striped={d.striped} className={`m-0 ${d.textCenter?'text-center':''}`}>
                <MDBTableHead>
                    <tr className="uc">
                        {d.showSrNo?(
                            <th width="20px">SN</th>
                        ):null}
                        {d.header.map((v,i)=>(
                            <th key={i} width={v.width?(v.width+'px'):''}>{v.lbl}</th>
                        ))}
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {d.pageRecords.map((v,i)=>(
                        <tr key={i}>
                            {d.showSrNo?(
                                <td>{i+1}.</td>
                            ):null}
                            {d.header.map((h,j)=>(
                                <td key={j}>
                                    {v[h.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>

            {d.pagination?(
                <div className="d-flex">
                    <div className="my-auto fs13 bold500">
                        Showing {d.pageRecords.length} records.
                    </div>
                    <div className="my-auto ml-auto">

                    </div>
                </div>
            ):null}
        </div>
    )
}

export default SimpleTable;