import React from "react";

const style = {
  tableTh: {
    padding: 10,
    fontWeight: "bold",
    width: "10rem",
    maxWidth: "10rem",
  },
  tableTd: { padding: 10, width: "10rem", maxWidth: "10rem" },
};

class TableCustom extends React.Component {
  render() {
    return (
      <>
        <table
          className="customize-tbl justify-content-md-center"
          border="1"
          style={{ marginTop: "0rem" }}
        >
          {this.props.column ? (
            <tr style={{ lineHeight: 1 }}>
              {this.props.column.map((item) => {
                return <th style={style.tableTh}>{item}</th>;
              })}
            </tr>
          ) : null}

          {this.props.tableData.map((item) => {
            let skip = Object.keys(item).indexOf("skip");
            return (
              <tr
                style={{
                  height: "6rem",
                  background: item.skip.fill,
                  color: item.skip.fill === "#fff" ? "#000" : "#fff",
                }}
              >
                {/* {console.log('key121',skip)} */}
                {Object.values(item).map((col, index) => {
                  return index != skip ? (
                    <td
                      style={item.skip.style ? item.skip.style : style.tableTd}
                    >
                      {col}
                    </td>
                  ) : (
                    ""
                  );
                })}
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default TableCustom;
