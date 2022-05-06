import React from 'react';
import { Table } from "antd";

const IllustrativePriorAuthorization = () => {
    return <div className="p-4">
        <div className="mb-5">
            <h3>KPI Dashboard & Data Insights: Illustrative I Prior Authorization</h3>
            <div className="mb-5">
                <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
          </div>
        </div>
      </div>
}
const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'KPI Name',
        dataIndex: 'KPIName',
        key: 'KPIName',
      },
      {
        title: 'KPI Definition',
        dataIndex: 'KPIDefinition',
        key: 'KPIDefinition',
      },
      {
        title: 'KPI Measurement',
        dataIndex: 'KPIMeasurement',
        key: 'KPIMeasurement',
      },
      {
        title: 'KPI Type',
        dataIndex: 'KPIType',
        key: 'KPIType',
      },
      {
        title: 'Desired State',
        dataIndex: 'DesiredState',
        key: 'DesiredState',
      }
]
const dataSource = [{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
},
{
    "key": "1",
    "KPIName": "Reimbursement Admin TAT for gathering medical documents from i) HCPs ii) Payers",
    "KPIDefinition": "Total average time for gathering medical from i) HCPs ii) Payersdocuments",
    "KPIMeasurement": "(Time (days) from when Prior-Auth. request submitted by Healthcare Provider in PA System to  all documents submitted to the portal for HCP)/ Total Number of Prior Auth. Requests.",
    "KPIType": "Lagging",
    "DesiredState": "Lower TAT"
}
];
export default IllustrativePriorAuthorization;
