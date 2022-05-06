import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Icon, Button } from '@material-ui/core';

export const tableHeader = (cohortSelected, handleAddActionToCohort) => {
    const contextMenu = (record) => {
        return (
        <Menu>
          <Menu.Item key="0">
            <Button fullWidth color="primary" className="outline-none" onClick={() => handleAddActionToCohort(record)}>Add action to this cohort</Button>
          </Menu.Item>
        </Menu>
      );
    }

    return [
      {
        title: cohortSelected,
        dataIndex: "segments",
        key: "segments",
        sorter: (a, b) => a.segments - b.segments,
      },
      {
        title: "# of accounts",
        dataIndex: "noOfAccounts",
        key: "noOfAccounts",
        sorter: (a, b) => a.noOfAccounts - b.noOfAccounts,
      },
      {
        title: "Change(%)",
        dataIndex: "changedValue",
        key: "changedValue",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => parseInt(a.change) - parseInt(b.change),
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (txt) => {
          let icon = "fa fa-circle";
          let fontColor = "grey-text";
          switch (txt) {
            case "G":
              fontColor = "green-text";
              break;
            case "A":
              fontColor = "amber-text";
              break;
            case "R":
              fontColor = "red-text";
              break;

            default:
              break;
          }
          return {
            children: (
              <span className={fontColor}>
                <i className={icon} aria-hidden="true"></i>
              </span>
            ),
          };
        },
      },
      {
        title: "Collection Rate (This Period)",
        dataIndex: "currentValue",
        key: "currentValue",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => parseInt(a.currentValue) - parseInt(b.currentValue),
      },
      {
        title: "Collection Rate (Pre Period)",
        dataIndex: "previousValue",
        key: "previousValue",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => parseInt(a.previousValue) - parseInt(b.previousValue),
      },
      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (_, record) => {
          return (
            <Dropdown overlay={contextMenu(record)} trigger={['click']}>
                <Button color="primary" disabled={true} className="outline-none" onClick={e => e.preventDefault()}>
                <Icon
                  className="align-middle"
                  title="Create action for this Cohort"
                >
                  more_vert
                </Icon>
                </Button>
            </Dropdown>
          );
        },
      },
    ];
  };

  export const tableHeader_WM = (cohortSelected, handleAddActionToCohort) => {
    const contextMenu = (record) => {
        return (
        <Menu>
          <Menu.Item key="0">
            <Button fullWidth color="primary" className="outline-none" onClick={() => handleAddActionToCohort(record)}>Add action to this cohort</Button>
          </Menu.Item>
        </Menu>
      );
    }

    return [
      {
        title: cohortSelected,
        dataIndex: "segments",
        key: "segments",
      },
      {
        title: "# Accounts",
        dataIndex: "noOfAccounts",
        key: "noOfAccounts",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => a.noOfAccounts - b.noOfAccounts,
        render: (txt) => {
          if(typeof txt === "number"){
            txt = <span>
              {" "}
              {txt.toLocaleString("en-US") }
            </span>
          }else{
            txt = <span>{txt}</span>
          }
          
          return txt;
        },
      },
      {
        title: "AUM Growth",
        dataIndex: "currentValue",
        key: "currentValue",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => a.currentValue - b.currentValue,
        render: (txt) => {
          txt = <span>{(txt*100).toFixed(2) + '%'}</span>
          return txt;
        }
      },
      {
        title: "Net Flow Change",
        dataIndex: "collected",
        key: "collected",
        sortDirections: ["descend", "ascend"],
        sorter: (a, b) => a.collected - b.collected,
        render: (txt) => {
          txt = <span>{(txt*100).toFixed(2) + '%'}</span>
          return txt;
        }
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (txt) => {
          let icon = "fa fa-circle";
          let fontColor = "grey-text";
          switch (txt) {
            case "G":
              fontColor = "green-text";
              break;
            case "A":
              fontColor = "amber-text";
              break;
            case "R":
              fontColor = "red-text";
              break;

            default:
              break;
          }
          return {
            children: (
              <span className={fontColor}>
                <i className={icon} aria-hidden="true"></i>
              </span>
            ),
          };
        },
      },
     
     
      {
        title: "",
        dataIndex: "",
        key: "action",
        render: (_, record) => {
          return (
            <Dropdown overlay={contextMenu(record)} trigger={['click']}>
                <Button color="primary" disabled={true} className="outline-none" onClick={e => e.preventDefault()}>
                <Icon
                  className="align-middle"
                  title="Create action for this Cohort"
                >
                  more_vert
                </Icon>
                </Button>
            </Dropdown>
          );
        },
      },
    ];
  };

export const tableHeader_CX = (cohortSelected) => {
    return [
        {
            title: cohortSelected,
            dataIndex: 'segments',
            key: 'segments',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (txt) => {
                let icon = 'fa fa-circle';
                let fontColor = 'grey-text';
                switch (txt) {
                    case 'G':
                        fontColor = 'green-text';
                        break;
                    case 'A':
                        fontColor = 'amber-text';
                        break;
                    case 'R':
                        fontColor = 'red-text';
                        break;

                    default:
                        break;
                }
                return {
                    children: (
                        <span className={fontColor}>
                            <i className={icon} aria-hidden="true"></i>
                        </span>
                    ),
                };
            },
        },

        {
            title: '#Accounts',
            dataIndex: 'noOfAccounts',
            key: 'noOfAccounts'
        },
        {
            title: '% Contribution',
            dataIndex: 'contributionValue',
            key: 'contributionValue',
        },

        {
            title: '% Change',
            dataIndex: 'changedValue',
            key: 'changedValue',
            render: (txt) => {
                return {
                    children: (
                        <>{txt}</>
                    ),
                };
            }
        },
        {
            title: cohortSelected==='Activity'?'Roll Rate':'Recommended Action',
            dataIndex: cohortSelected==='Activity'?'currentValue':'recommendedAction',
            key: cohortSelected==='Activity'?'currentValue':'recommendedAction',
            render: (txt) => {
                return {
                    children: (
                        <>{cohortSelected==='Activity'?txt+"%":txt}</>
                    ),
                };
            }
        }
        

    ];
};

export const tableHeader_CS = (cohortSelected) => {
  return [
      {
          title: cohortSelected,
          dataIndex: 'segments',
          key: 'segments',
      },
      {
        title: '#Accounts',
        dataIndex: 'noOfAccounts',
        key: 'noOfAccounts'
    },
      {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (txt) => {
              let icon = 'fa fa-circle';
              let fontColor = 'grey-text';
              switch (txt) {
                  case 'G':
                      fontColor = 'green-text';
                      break;
                  case 'A':
                      fontColor = 'amber-text';
                      break;
                  case 'R':
                      fontColor = 'red-text';
                      break;

                  default:
                      break;
              }
              return {
                  children: (
                      <span className={fontColor}>
                          <i className={icon} aria-hidden="true"></i>
                      </span>
                  ),
              };
          },
      },
      {
        title: 'Change(%)',
        dataIndex: 'changedValue',
        key: 'changedValue',
        render: (txt) => {
            return {
                children: (
                    <>{(txt*100).toFixed(2) + '%'}</>
                ),
            };
        }
    },

      {
          title: 'Collection Rate (Current Period)',
          dataIndex: 'currentValue',
          key: 'currentValue',
          render: (txt) => {
            return {
                children: (
                    <>{(txt*100).toFixed(2) + '%'}</>
                ),
            };
        }
      },
      {
          title: 'Collection Rate (Previous Period)',
          dataIndex: 'previousValue',
          key: 'previousValue',
          render: (txt) => {
            return {
                children: (
                    <>{(txt*100).toFixed(2) + '%'}</>
                ),
            };
        }
      }
  ];
};

export const tableHeader_RX = (cohortSelected) => {
  return [
    {
      title: cohortSelected,
      dataIndex: 'segments',
      key: 'segments',
    },

    {
      title: 'Sales M12',
      dataIndex: 'currentValue',
      key: 'currentValue',
      sorter: (a, b) => b.currentValue - a.currentValue,
      defaultSortOrder: ['descend'],
      render: (txt) => {
        return {
          children: (
            <>{'$'}{txt.toLocaleString("en-US")}</>
          ),
        };
      }
    },

    {
      title: 'Sales growth M11 vs M12',
      dataIndex: 'previousValue',
      key: 'previousValue',
      render: (txt) => {
        return {
          children: (
            <>{txt}%</>
          ),
        };
      }
    },

    {
      title: 'Call growth M11 vs M12',
      dataIndex: 'changedValue',
      key: 'changedValue',
      render: (txt) => {
        return {
          children: (
            <>{txt}%</>
          ),
        };
      }
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (txt) => {
        let icon = 'fa fa-circle';
        let fontColor = 'grey-text';
        switch (txt) {
          case 'G':
            fontColor = 'green-text';
            break;
          case 'A':
            fontColor = 'amber-text';
            break;
          case 'R':
            fontColor = 'red-text';
            break;

          default:
            break;
        }
        return {
          children: (
            <span className={fontColor}>
              <i className={icon} aria-hidden="true"></i>
            </span>
          ),
        };
      },
    },

  ];
};

export const tableHeader_SRX = (cohortSelected) => {
  return [
    {
      title: cohortSelected,
      dataIndex: 'segments',
      key: 'segments',
    },

    {
      title: 'M12 NBRx Volume',
      dataIndex: 'currentValue',
      key: 'currentValue',
      sorter: (a, b) => b.currentValue - a.currentValue,
      defaultSortOrder: ['descend'],
      render: (txt) => {
        return {
          children: (
            <>{txt.toLocaleString("en-US")}</>
          ),
        };
      }
    },

    {
      title: 'M12 NBRx%' ,
      dataIndex: 'previousValue',
      key: 'previousValue',
      render: (txt) => {
        return {
          children: (
            <>{txt}%</>
          ),
        };
      }
    },

    {
      title: 'NBRx % Growth M11 vs M12',
      dataIndex: 'changedValue',
      key: 'changedValue',
      render: (txt) => {
        return {
          children: (
            <>{txt}%</>
          ),
        };
      }
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (txt) => {
        let icon = 'fa fa-circle';
        let fontColor = 'grey-text';
        switch (txt) {
          case 'G':
            fontColor = 'green-text';
            break;
          case 'A':
            fontColor = 'amber-text';
            break;
          case 'R':
            fontColor = 'red-text';
            break;

          default:
            break;
        }
        return {
          children: (
            <span className={fontColor}>
              <i className={icon} aria-hidden="true"></i>
            </span>
          ),
        };
      },
    },

  ];
};


const _tableHeader = () => {
    return [
      {
        title: "Zip",
        dataIndex: "zip",
        key: "zip",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "HCPcount",
        dataIndex: "hcpcount",
        key: "hcpcount",
      },
      {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
        render: (_, record) => '$'+record.revenue
      },
      {
        title: "Revenue Growth",
        dataIndex: "revenue_growth",
        key: "revenue_growth",
        render: (_, record) => '$'+record.revenue_growth
      },
      {
        title: "Rx",
        dataIndex: "rx",
        key: "rx",
        render: (_, record) => '$'+record.rx
      },
      {
        title: "Rx  growth",
        dataIndex: "rxgrowth",
        key: "rxgrowth",
        render: (_, record) => '$'+record.rxgrowth
      }
    ]
  }

  
  //PNC Header
  const tableHeader_PNC = (cohortSelected, headers) => {
    let processedHeaders = [];
    if (headers.length > 0) {
      processedHeaders = headers.map((header) => {
        let headerprops = {
          title: header.title === "Segments" ? cohortSelected : header.title,
          dataIndex: header.dataindex,
          key: header.key,
          render: (txt) => {
            if(typeof txt === "number"){
              txt = <span>
                {" "}
                {header.setprevaluesymbol +
                  txt.toLocaleString("en-US") +
                  header.setpostvaluesymbol}
              </span>
            }else{
              txt = <span>{txt}</span>
            }
            
            return txt;
          },
        };
        if (header.setsort) {
          headerprops.sorter = (a, b) => {
            if (typeof a[header.dataindex] === "string") {
              let _a = a[header.dataindex].charAt(
                a[header.dataindex].length - 1
              );
              if (_a === "%") {
                let str_a = a[header.dataindex].slice(0, -1),
                  str_b = b[header.dataindex].slice(0, -1);
                return parseInt(str_b) - parseInt(str_a);
              }
            }
            return b[header.dataindex] - a[header.dataindex];
          };
          headerprops.sortDirections = ["descend", "ascend"];
          headerprops.showSorterTooltip = false;
        }
        if (header.setgraphic) {
          headerprops.render = (txt) => {
            let icon = "fa fa-circle";
            let fontColor = "grey-text";
            switch (txt) {
              case "G":
                fontColor = "green-text";
                break;
              case "A":
                fontColor = "amber-text";
                break;
              case "R":
                fontColor = "red-text";
                break;

              default:
                break;
            }
            return {
              children: (
                <span className={fontColor}>
                  <i className={icon} aria-hidden="true"></i>
                </span>
              ),
            };
          };
        }
        return headerprops;
      });
    }
    return processedHeaders;
  };

  //WM Header
  