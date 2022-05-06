import React, { useState, Fragment } from 'react';
import { Drawer, Button, Select, DatePicker, Checkbox } from 'antd';
import { FilterFilled } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const FilterSidebar = (props) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const filterDuplicateItem = (key) => {
    let list = props.rows.filter(
      (ele, ind) =>
        ind ===
        props.rows.findIndex(
          (elem) =>
            elem[key] === ele[key]
        )
    );
    return list;
  };


  const filterColumns = props.columns.filter(item => (item.applySideBarFilter == true));
  const itemIndex = filterColumns.findIndex(
    (elem) =>
      elem.dataIndex === "dateAdded"
  )
  filterColumns.push(filterColumns.splice(itemIndex, 1)[0])

  const filterList = filterColumns.map((item, index) => {

    let list = props.rows

    if (props.rows) {
      list = filterDuplicateItem(item.dataIndex)
    }

    return (
      <div className="filter-wrapper" key={index}>
        <label>By {item.title} </label>
        <Select
          mode="multiple"
          allowClear
          value = {props.filterData[item.dataIndex]}
          style={{ width: '100%' }}
          placeholder={`Search By ${item.title}`}
          onChange={value => props.handleFilter(value, item.dataIndex)}

        >
          {list ?
            list.map((k, i) => {
              return (
                <Select.Option key={i} value={k[item.dataIndex]}>
                  {k[item.dataIndex]}
                </Select.Option>
              )
            }) : null
          }
        </Select>
      </div>

    )
  })
  const handleChange = () =>{
    setChecked( !checked)
  }

  return (
    <Fragment>
      <Button onClick={showDrawer} style={{borderColor: '#205684', borderRadius: '4px'}}>
        <FilterFilled style={{ verticalAlign: "middle", color: '#205684' }} />
      </Button>
      <Drawer
        className="filter-drawer"
        title="Filter"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
          {filterList}

          <div className="filter-wrapper">
            <label>By Date</label>
            <Checkbox
              className="d-flex"
              checked= {props.isTodayDate === true ? true : false}
              onChange={props.filterTodayDate}>
              Today
            </Checkbox>
            <Checkbox
              className="d-flex"
              checked= {props.isYesterdayDate === true ? true : false}
              onChange={props.filterYesterdayDate}>
              Yesterday
            </Checkbox>
            <div className="d-flex">
            <Checkbox
              onChange={handleChange}>
              Custom
            </Checkbox>
            { checked ?
            <RangePicker
              allowEmpty={[true, true]}
              className="range-picker ml-2"
              onChange={props.handleDateRange}
              value = {props.dateRangeValue}
              format="MM/DD/YYYY"
            /> : null }
            </div>
          </div>
      
      </Drawer>
    </Fragment>

  );
};

export default FilterSidebar;