import React, {useState, useEffect} from 'react';
import {
	MDBTable,
    MDBTableBody,
    MDBIcon
} from 'mdbreact';

const KeyInsights=(props)=>{
    const [data, setData]=useState(props.data);

    useEffect(()=>{
        setData(props.data);
        // eslint-disable-next-line
    }, [props.data]);

    return (
        <MDBTable small className="m0">
            <MDBTableBody>
                {data?.map((v, i)=>(
                    <tr className="table-text-vmid" key={i}>
                        {typeof v.title!=="undefined" && <td className="pl20"><MDBIcon icon="circle" className={`fa-2x ${v.status==='Up'?'text-success':'text-danger'}`} /></td>}
                        {typeof v.title!=="undefined" && <td className="bold600">{v.title}</td>}
                        {typeof v.title!=="undefined" && <td className="bold600">
                            {v.percent?(<span>{v.percent}%</span>):(<span>{v.value || ''}</span>)}
                        </td>
                        }
                        <td className={typeof v.title==="undefined"?"pl20":""}>
                            {/* <MDBIcon icon={`chevron-circle-${v.status==='Up'?'up':'down'}`} className={`fs18 ${v.status==='Up'?'text-success':'text-danger'}`} /> */}
                            <MDBIcon icon={`caret-${v.status==='Up'?'up':'down'}`} className={`fa-3x ${v.status==='Up'?'text-success':'text-danger'}`} />
                        </td>
                        <td className="font-sm bold600 pr20">
                            {v.items.length>1?(
                                <ul className="m0">
                                    {v.items.map((item, j)=>(
                                        <li key={j}>
                                            {(props.dtlPage && item.dtlLink===true)?(
                                                <span onClick={props.dtlPage} className="light-blue-text cpointer">{item.title}</span>
                                            ):(
                                                <span>{item.title}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ):(
                                <div>
                                    {(props.dtlPage && v.items[0].dtlLink===true)?(
                                        <span onClick={props.dtlPage} className="light-blue-text cpointer">{v.items[0].title}</span>
                                    ):(
                                        <span>{v.items[0].title}</span>
                                    )}
                                </div>
                            )}
                            
                        </td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    )
}

export default KeyInsights;