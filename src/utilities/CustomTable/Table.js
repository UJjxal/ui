import React, { useState, useEffect, useRef } from "react";
// import { DataGrid, GridToolbarContainer, GridToolbarExport, } from "@material-ui/data-grid";
import { DataGrid } from "@material-ui/data-grid";
import FilterModal from "./FilterModal";
import axios from "axios";
import "./style.css";

const Table = (props) => {
	const {appliedFilters}=props;
	const allResults = useRef([]);
	const apiCall = useRef();
	const [d, setData] = useState({
		header: [],
		result: [],
		height: 400,
		pagination: true,
		pageSize: props.pageSize || 10,
		disableColumnMenu: false,
		filterBtn: false,
		resultTotal: 0,
	});
	const [columns, setColumns] = useState([]);
	const [reinitTable, setReinitTable]=useState(false);

	const filterResult = (rules, isReturn) => {
		//console.log(allResults.current)
		let results = [];
		allResults.current.forEach((v) => {
			let flg = 1;
			rules.forEach((r) => {
				let val=v[r.field]+"";
				let data=r.data+"";
				let startData = null;
				let endData = null;
				if(r.fieldType==='date' && r.operator==='between'){
					val=new Date(val).getTime();
					let date = data.split(",")
					startData = new Date(date[0]).getTime();
					endData = new Date(date[1]).getTime();
				}
				else if(r.fieldType==='date' && r.operator!=='contains'){
					val=new Date(val).getTime();
					data=new Date(data).getTime();
				}else if(r.fieldType==='number' && r.operator==='between'){
					let num = data.split(",")
					startData = num[0]
					endData =num[1]
				}
				else{
					if(r.operator==='=' || r.operator==='!=' || r.operator==='contains'){
						val=val.toLowerCase();
						data=data.toLowerCase();
					}
				}
				switch (r.operator) {
					case "=":
						if(!(val===data)){
							flg = 0;
						}
					break;
					case "!=":
						if(!(val!==data)){
							flg = 0;
						}
					break;
					case "<":
						if(!(val * 1 < data * 1)){
							flg = 0;
						}
					break;
					case ">":
						if (!(val * 1 > data * 1)) {
							flg = 0;
						}
					break;
					case "<=":
						if (!(val * 1 <= data * 1)) {
							flg = 0;
						}
					break;
					case ">=":
						if (!(val * 1 >= data * 1)) {
							flg = 0;
						}
					break;
					case "contains":
						let sourceData = (val + "");
						let searchData = (data + "").split(",");
						let f = 0;
						for (let i = 0; i < searchData.length; i++) {
							let str = searchData[i].trim();
							if (sourceData.indexOf(str) >= 0) {
								f = 1;
							}
						}

						if (!(f === 1)) {
							flg = 0;
						}
					break;
					case "between":	
						if (!(val * 1 <= endData * 1) || !(val * 1 >= startData * 1) || (val+'').length===0){
							flg = 0;
						}
					break;
					default:
				}
			});
			if(flg){
				results.push({ ...v });
			}
		});

		if(isReturn){
			return results;
		}

		setData({...d, result: results});
	};

	const init = () => {
		let results = Array.isArray(props.result) ? props.result : [];
		results.forEach((v, i) => {
			if (typeof v.id === "undefined") {
				v.id = i + 1;
			}
		});
		allResults.current = [...results];
		// let header = props.header || [];
		// setColumns(header)

		if(appliedFilters){
			if(appliedFilters.current){
				results=filterResult(appliedFilters.current, true);
			}
		}

		setData({
			...d,
			header: props.header || [],
			result: results,
			height: props.height || 400,
			pagination: props.pagination === false ? false : true,
			//pageSize: props.pageSize || 10,
			rowHeight:props.rowHeight || 52,
			headerHeight:props.headerHeight || 56,
			filterBtn: props.filterBtn || false,
			disableColumnMenu: props.disableColumnMenu || false,
		});

		var header = [];
		props.header.map((item) => {
			if (props.defaultHideCol) {
			if (!props.defaultHideCol.includes(item.field)) {
				header.push(item)
			}
			} else {
			header.push(item)
			}
		})
		setColumns(header);
	};

	const onPageSizeChange=(e)=>{
		console.log(e, "On page size change MUI");
		let pageSize=typeof e==="object"?e.pageSize:e;
		setData({...d, pageSize});
	}

	useEffect(()=>{
		console.log("MUI Table reinit")
		setReinitTable(true);
	}, [d.pageSize]);

	useEffect(()=>{
		if(reinitTable){
			setReinitTable(false);
		}
	}, [reinitTable]);

	useEffect(() => {
		init();
		// eslint-disable-next-line
		props.apiCall ? handleOnRowsScrollEnd() : "";
	}, [props.header, props.result, props.height, props.pagination, props.pageSize, props.rowHeight, props.headerHeight, props.filterBtn, props.disableColumnMenu]);

  /**check */
  const handleOnRowsScrollEnd = () => {
    let ob = window.$;
    let el = ob(".MuiDataGrid-window")[0];
    ob(".MuiDataGrid-window").scroll(function () {
      console.log("hello");
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
        console.log("hello", "bottom!");
        getMoreData();
      }
    });
  };

  const getMoreData = async () => {
    if (apiCall.current === 1) {
      return;
    }
    try {
      const params = {
        startingPos: d.result.length,
        limit: "50",
        userId: "All",
      };
      const url = props.apiCall;
      console.log("helloparams", params);
      apiCall.current = 1;
      let { data } = await axios.post(url, params);
      //console.log("getRecommendedProspects", data);
      if (data.code === 200) {
        //
        let results = Array.isArray(data.response.results)
          ? data.response.results
          : [];
        results.forEach((v, i) => {
          if (typeof v.id === "undefined") {
            v.id = i + 1;
          }
        });
        //
        let results1 = [...d.result, ...results];
        d.result = results1;
        d.resultTotal = data.response.total;

        allResults.current = results1;
      }
    } catch (error) {
      console.error("getRecommendedProspectsError##", error);
    }
    apiCall.current = 0;
    setData({ ...d });
    console.log("drecommended", d.result);
  };
//   function CustomToolbar() {  
// 	return (
		
// 	  <GridToolbarContainer className="export-default-btn">
// 		<GridToolbarExport/>
// 	  </GridToolbarContainer>
// 	);
//   }


  return (
    <div>
      <div className="mb15">
        {d.filterBtn ? (
          <div className="mb5">
            <FilterModal
              header={d.header}
              filterResult={filterResult}
              tblRecords={props.tblRecords}
              tableLoading={props.tableLoading}
              setColumns={setColumns}
              rows={d.result}
              showHideCol={props.showHideCol}
              exportCsvBtn={props.exportCsvBtn}
			  exportCsvBtnDefault={props.exportCsvBtnDefault}
              csvFileName={props.csvFileName}
              defaultHideCol={props.defaultHideCol}
              columns={columns}
			  appliedFilters={appliedFilters}
            />
          </div>
        ) : null}

        <div
          className={`${d.pagination ? "" : "no-pagination"}`}
          style={{ height: d.height, width: "100%" }}
        >
          {props.apiCall ? (
            <DataGrid
              rows={d.result}
              columns={d.header}
              rowsPerPageOptions={[]}
            />
          ) : (
			  <>
				{!reinitTable?(
					<DataGrid
						rows={d.result}
						columns={columns}
						// columns={d.header}
						disableColumnFilter={false}
						disableColumnMenu={d.disableColumnMenu}
						pageSize={d.pageSize}
						rowHeight={d.rowHeight}
						headerHeight={d.headerHeight}
						rowsPerPageOptions={[10, 25, 50, 100]}
						onPageSizeChange={onPageSizeChange}
						//sortModel={props.sortDefault ? props.sortDefault : null}
						// components={{
						// 	Toolbar: props.exportCsvBtnDefault && CustomToolbar,
						// }}
					/>
				):null}
			</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
