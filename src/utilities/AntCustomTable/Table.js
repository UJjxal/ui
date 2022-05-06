import React, {Fragment} from 'react';
import {Table} from "ant-table-extensions";
import ReactDragListView from 'react-drag-listview';
import "./style.css";

const DataTable = (props) => {

    const tableHeader = () => {
        const record = props.rows;
        var column = [];
        if (record) {
            var keys = Object.keys(props.rows[0]);
            keys.forEach((item) => {
                column.push({
                    dataIndex: item,
                    title: item,
                    title:
                        item.charAt(0).toUpperCase() +
                        item
                            .slice(1)
                            .replace(/([A-Z])/g, " $1")
                            .trim(),
                    key: item,
                    ellipsis: true,
                });
            });
        }
        return column;
    }
    const onTableChange = (pagination) => {
        // console.log('params', pagination);
        if (props.setSelectedPage) {
            props.setSelectedPage(pagination.current)
        }
        if (props.setSelectedRowPerPage) {
            props.setSelectedRowPerPage(pagination.pageSize)
        }
        // if (props.currentPage !== pagination.current) {
        //   props.apiCall(pagination.current)
        // }
    }

    // Drag and Drop Column
    /*
    * Note : list index should always start from 0.
    * For eg - If we are moving first item then fromIndex should be 0.
    */
    const onDragEnd = (fromIndex, toIndex) => {
        const columnsCopy = props.columns?.slice();
        const item = columnsCopy.splice(fromIndex, 1)[0];
        columnsCopy.splice(toIndex, 0, item);
        props.setColumns(columnsCopy)
    };
    return (
        <Fragment>
            {props.rows ?
                (
                    <ReactDragListView.DragColumn onDragEnd={props.onDragEnd ? onDragEnd : () => {
                    }}
                                                  nodeSelector="th">
                        <Table
                            className='ant-datatable'
                            columns={props.columns ? props.columns : tableHeader()}
                            dataSource={props.rows}
                            pagination={{
                                position: "bottomCenter",
                                showSizeChanger: true,
                                defaultCurrent: props.selectedPage ? props.selectedPage : 1,
                                pageSize: props.selectedRowPerPage ? props.selectedRowPerPage : 10
                            }}
                            // pagination={{
                            //   current: props.currentPage,
                            //   pageSize: props.pageSize,
                            //   total: props.total
                            // }}
                            onChange={onTableChange}
                            rowKey={props.rowKey}
                            scroll={{y: 660}}
                        />
                    </ReactDragListView.DragColumn>
                ) : null}
        </Fragment>
    )
}

export default DataTable;
