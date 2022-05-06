import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  //MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import moment from "moment";
import { Button, Dropdown, Menu, Checkbox, DatePicker } from "antd";
import { CSVLink } from "react-csv";
import { FilterFilled } from "@ant-design/icons";
import { TextField, Icon } from "@material-ui/core";
import { EditTwoTone, DeleteOutlined } from "@ant-design/icons";
import MenuItem from "@material-ui/core/MenuItem";

import Loader from "../../utilities/Loader";
import "./style.css";
const { RangePicker } = DatePicker;

const FilterModal = forwardRef((props, ref) => {
  const { appliedFilters } = props;
  const [loading, setLoading] = useState(props.tableLoading);
  const [d, setData] = useState({
    header: [],
    isModalOpen: false,
    operators: [
      { key: "=", lbl: "Equal To" },
      { key: "!=", lbl: "Not Equal To" },
      { key: "<", lbl: "Less Than" },
      { key: ">", lbl: "Greater Than" },
      { key: "<=", lbl: "Less Than Equal To" },
      { key: ">=", lbl: "Greater Than Equal To" },
      { key: "contains", lbl: "Contains" },
      { key: "between", lbl: "Between" },
    ],
    searchInputs: [{}],
    searchRules: [],
  });
  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false)
  const [checkedColumns, setCheckedColumns] = useState([])
  const [initialColumns, setInitialColumns] = useState([])

  const toggleModal = () => {
    let sinputs = [];
    d.searchRules.forEach((v) => {
      sinputs.push({ ...v });
    });
    if (sinputs.length === 0) {
      sinputs.push({});
    }
    d.searchInputs = sinputs;

    setData({ ...d, isModalOpen: !d.isModalOpen });
  };

  const addSearchInput = () => {
    d.searchInputs.push({});
    setData({ ...d });
  };

  const removeSearchInput = (i) => {
    d.searchInputs.splice(i, 1);
    setData({ ...d });
  };

  const removeSearchRule = (i) => {
    d.searchRules.splice(i, 1);
    setData({ ...d });
    props.filterResult(d.searchRules);
    if (appliedFilters) {
      appliedFilters.current = d.searchRules;
    }
  };

  const handleSearchRuleInput = (e, obj, key) => {
    obj[key] = e.target.value;
    if (key === "field") {
      d.header.forEach((v) => {
        if (v.field === obj[key]) {
          obj["headerName"] = v.headerName;
          obj['fieldType'] = v.type;
        }
      });
    }
    setData({ ...d });
  };

  const applySearch = () => {
    d.searchRules = [];
    d.searchInputs.forEach((v, i) => {
      if (v.field && v.operator) {
        if (!Array.isArray(v.data)) {
          v.data = v.data.trim();
        }
        d.searchRules.push({ ...v });
      }
    });
    toggleModal();
    props.filterResult(d.searchRules);
    if (appliedFilters) {
      appliedFilters.current = d.searchRules;
    }
  };

  const init = () => {
    if (appliedFilters) {
      if (appliedFilters.current) {
        d.searchRules = appliedFilters.current;
        //setData({ ...d });
      }
    }

    let header = props.header || [];
    setData({
      ...d,
      header,
    });
    // setColumns(header)
    if (props.defaultHideCol)
      setCheckedColumns(props.defaultHideCol)
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, [props.header]);

  useEffect(() => {
    setLoading(props.tableLoading);
    // eslint-disable-next-line
  }, [props.tableLoading]);

  useEffect(() => {
    setInitialColumns(d.header)

  }, [d.header]);

  useImperativeHandle(ref, () => ({}));

  const onChange = e => {
    var checkColumns = checkedColumns;
    if (e.target.checked) {
      checkColumns = checkColumns.filter(id => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      checkColumns.push(e.target.id);
    }
    var filtered = initialColumns;
    for (var i = 0; i < checkColumns.length; i++)
      filtered = filtered.filter(el => {
        return el.field !== checkColumns[i];
      });

    setCheckedColumns(checkColumns)
    props.setColumns(filtered)
  };
  const handleVisibleChange = flag => {
    setVisibleMenuSettings(flag)
  };

  const getRowsForCSV = () => {
    let rows = [];
    let cols = [];
    let headers = [];
    for (let c of props.columns) {
      cols.push(c.field);
      headers.push(c.headerName);
    }
    props.rows.forEach(row => {
      let obj = {};
      for (let c of cols) {
        obj[c] = row[c]
      }
      rows.push(obj);
    })
    //console.log('12row',rows,props.columns,props.rows);
    //rows.unshift(headers);
    return rows;
  }

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Columns">
        {initialColumns.map((item, i) => (
          <Menu.Item key={i}>
            <Checkbox
              id={item.field}
              onChange={onChange}
              defaultChecked={props.defaultHideCol ? !props.defaultHideCol.includes(item.field) : true}
            >
              {item.headerName}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );
  return (
    <div>
      <div className="d-flex" style={{ width: props.exportCsvBtnDefault && '91%'}}>
        <div className="my-auto flex-grow-1">
          {d.searchRules.map((v, i) => (
            <div key={i} className="chip waves-effect">
              {v.headerName} <span className="text-primary">{v.operator}</span>{" "}
              {v.data && Array.isArray(v.data) ? v.data[0] +" - "+ v.data[1] : v.data}
              <i
                className="fa fa-times-circle fs14 ml5"
                onClick={() => removeSearchRule(i)}
              ></i>
            </div>
          ))}
        </div>

        {props.tblRecords ? (
          <>
            {props.tblRecords.loaded < props.tblRecords.total &&
              <div className="ml-auto mr5">
                Fetched {props.tblRecords.loaded} of {props.tblRecords.total}
              </div>
            }
          </>
        ) : null}
        {loading ? (
          <Loader type="TailSpin" style={{ margin: "0 5px" }} />
        ) : (
          <div className="my-auto">
            <Button
              className="mr-2"
              onClick={toggleModal}
              style={{ borderColor: "#205684" }}
            >
              <FilterFilled
                style={{ verticalAlign: "middle", color: "#205684" }}
              />
            </Button>
            {props.showHideCol &&
              <Dropdown
                overlay={menu}
                placement="bottomCenter"
                onVisibleChange={handleVisibleChange}
                visible={visibleMenuSettings}

              >
                <Button className="tile-btn mr-2" style={{ borderColor: '#205684' }}>
                  <i style={{ transform: ' rotate(90deg)', color: '#205684' }} className="fa fa-bars" aria-hidden="true"></i>
                </Button>
              </Dropdown>
            }
            {props.exportCsvBtn &&
              <CSVLink
                data={getRowsForCSV()} filename={props.csvFileName || "export.csv"}
              >
                <i className="fa fa-file-export"
                  style={{ verticalAlign: "middle", color: "#205684", border: "1px solid #205684", padding: "8px 15px", height: "32px", borderRadius: "2px" }}></i>
              </CSVLink>
              }
          </div>
        )}
      </div>

      <MDBModal
        size="lg"
        isOpen={d.isModalOpen}
        className="modal-less-hf-pad"
        toggle={() => { }}
      >
        <MDBModalHeader toggle={toggleModal}>Filter</MDBModalHeader>
        <MDBModalBody>
          <MDBTable small borderless className="m-0 table-text-vmid">
            <MDBTableBody>
              {d.searchInputs.map((v, i) => (
                <tr key={i}>
                  <td className="w200">
                    <TextField
                      select
                      style={{ width: "100%" }}
                      className="custom-txtfield"
                      label={"Field"}
                      variant="outlined"
                      value={v.field || ""}
                      onChange={(e) => handleSearchRuleInput(e, v, "field")}
                    >
                      {d.header
                        ? d.header
                          .filter((h) => h.useInFilter !== false)
                          .map((option, j) => (
                            <MenuItem key={j} value={option.field}>
                              {option.headerName}
                            </MenuItem>
                          ))
                        : null}
                    </TextField>
                  </td>

                  <td className="w200">
                    <TextField
                      select
                      style={{ width: "100%" }}
                      className="custom-txtfield"
                      label={"Condition"}
                      variant="outlined"
                      value={v.operator || ""}
                      onChange={(e) => handleSearchRuleInput(e, v, "operator")}
                    >
                      {d.operators
                        ? d.operators.map((option, j) => {

                          if ((option.key === 'between' || option.key === '>=' || option.key === '<=' || option.key === '>' || option.key === '<') &&
                          !(v.fieldType === 'date' || v.fieldType === 'number')) {
                            return null
                          }
                          return (
                            <MenuItem key={j} value={option.key}>
                              {option.lbl}
                            </MenuItem>
                          )
                        })
                        : null}
                    </TextField>
                  </td>

                  <td>
                    {v.fieldType === 'date' ? (
                      v.operator === 'between' ?
                        <div>
                          <RangePicker
                            allowEmpty={[true, true]}
                            style={{ width: '100%', height: '42px', borderRadius: '4px' }}
                            value={v.data ? [moment(new Date(v.data[0])), moment(new Date(v.data[1]))] : null}
                            onChange={(dt) => {

                              if (dt && dt.length > 1 && dt[1] != null) {
                                var startDate = dt[0] ? dt[0].format("YYYY-MM-DD") : null;
                                var endDate = dt[1] ? dt[1].format("YYYY-MM-DD") : null;

                                v.data = [startDate, endDate]
                              } else {
                                v.data = null
                              }

                              setData({ ...d });
                            }}
                            format="YYYY-MM-DD"
                          />
                        </div>
                        :
                        <div>
                          <DatePicker
                            style={{ width: '100%', height: '42px', borderRadius: '4px' }}
                            inputReadOnly
                            format="YYYY-MM-DD"
                            value={v.data ? moment(new Date(v.data)) : null}
                            onChange={dt => {
                              v.data = dt ? moment(dt).format("YYYY-MM-DD") : null;
                              setData({ ...d });
                            }}
                          />
                        </div>
                    ) : (
                      v.fieldType === 'number' &&
                        v.operator === 'between' ?
                        <div className="d-flex align-items-center">
                          <TextField
                            style={{ width: "50%" }}
                            className="custom-txtfield mr-1"
                            label={"Value"}
                            variant="outlined"
                            value={v.data ? v.data[0] : null}
                            onChange={(e) => {
                              let dt = e.target.value
                              if (v.data) {
                                v.data[0] = dt
                              } else {
                                v.data = [dt, null]
                              }
                              setData({ ...d });
                            }}
                          />
                          <span>~</span>
                          <TextField
                            style={{ width: "50%" }}
                            className="custom-txtfield ml-1"
                            label={"Value"}
                            variant="outlined"
                            value={v.data ? v.data[1] : null}
                            onChange={(e) => {
                              let dt = e.target.value
                              if (v.data) {
                                v.data[1] = dt
                              } else {
                                v.data = [null, dt]
                              }
                              setData({ ...d });
                            }}
                          />
                        </div>
                        :
                        <TextField
                          style={{ width: "100%" }}
                          className="custom-txtfield"
                          label={"Value"}
                          variant="outlined"
                          value={v.data || ""}
                          onChange={(e) => handleSearchRuleInput(e, v, "data")}
                        />
                    )}

                  </td>

                  <td className="w40 p-0 text-right">
                    {
                      i !== 0 ? (
                        <DeleteOutlined
                          onClick={() => removeSearchInput(i)}
                          style={{
                            paddingLeft: "0.3rem",
                            fontSize: "1.2rem",
                            color: "#dc3545",
                            cursor: "pointer",
                          }}
                        />
                      ) : null /* (
                      <Button
                        className="blue-bg"
                        type="primary"
                        onClick={addSearchInput}
                      >
                        <i className="fa fa-plus"></i>
                      </Button>
                    ) */
                    }
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          <div className="pl5">
            <Button className="blue-bg" type="primary" onClick={addSearchInput}>
              <i className="fa fa-plus"></i>
            </Button>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          {/* <MDBBtn size="sm" color="secondary" onClick={toggleModal}>Close</MDBBtn> */}

          <Button className="blue-bg" type="primary" onClick={applySearch}>
            Apply
          </Button>
        </MDBModalFooter>
      </MDBModal>
    </div>
  );
});

export default FilterModal;
