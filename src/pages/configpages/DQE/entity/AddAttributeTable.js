import React, { Component } from "react";
import axios from "axios";
import { Button, Popconfirm, Badge } from "antd";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";

import AddRuleTable from "./AddRuleTable";
import { API_ROOT, PYTHON_API_ROOT } from "../../../../config";

class AddAttributeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.addRuleModal = false;
    this.state.ruleMaster = [];
  }

  componentDidMount() {
    this.getRulesFromMaster();
  }

  getRulesFromMaster() {
    const url =
    PYTHON_API_ROOT +
      `dqRuleList/isSelectable/${this.props.token}`;
    axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        if (result.data.code === 200) {
          this.setState({
            ruleMaster:
              result.data.response.length > 0 ? result.data.response : null,
          });
        }
      })
      .catch((err) => {
        console.error("getRulesFromMasterError..#", err);
      });
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }

  handleRowDel(attribute) {
    let UpdateAttributes = { ...this.props.newEntity };
    var index = UpdateAttributes.attributes.indexOf(attribute);
    UpdateAttributes.attributes.splice(index, 1);
    this.props.setNewEntity(UpdateAttributes);
  }

  handleAddEvent(evt) {
    let UpdateAttributes = { ...this.props.newEntity };
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const attribute = {
      id: id,
      attributeName: "",
      attributeDesc: "",
      dataExamples: "",
      isPK: "",
      isNullable: "",
      dataType: "",
      length: "",
      dateFormat: "",
      rules: [{ type: "", severity: "", operator: "" }],
    };

    UpdateAttributes.attributes.push(attribute);
    this.props.setNewEntity(UpdateAttributes);
  }

  handleProductTable(evt) {
    evt.preventDefault();
    let UpdateAttributes = { ...this.props.newEntity };
    let value = evt.target.value;
    let elId=evt.target.id;
    // remove zero from value
    if(evt.target.name==="length" && value < 1){
      value = '';
    }
    if (evt.target.type === "checkbox") {
      //console.log("checkbox121", evt.target.checked);
      if (evt.target.checked) {
        value = "TRUE";
      } else {
        value = "FALSE";
      }
    }
  
    var item = {
      id: evt.target.id.split("-").pop(),
      name: evt.target.name,
      value: value,
    };
    var products = UpdateAttributes.attributes.slice();
    //console.log("target121", evt.target);
    //console.log("item121", item);
    //console.log("products121", products);
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;
          if (key === "dataType") {
            product["length"] = "";
            product["dateFormat"] = "";
          }
        }
      }
      return product;
    });
    UpdateAttributes.attributes = newProducts;
    this.props.setNewEntity(UpdateAttributes);
    //console.log(document.getElementById(elId))
    setTimeout(()=>{
      document.getElementById(elId).focus()
    }, 200)
  }

  toggleAddRuleModal(record = null) {
    this.setState({
      addRuleModal: !this.state.addRuleModal,
      currentAttrID: record ? record.id : null,
      attrIndex: record
        ? this.props.newEntity.attributes.indexOf(record)
        : null,
    });
  }

  handleBlurEvent = (e) => {
    const currentVal = e.target.value;
    const check = this.props.newEntity.attributes.filter(
      (attr) => attr.attributeName === currentVal
    );
    //console.log('handleBlurEvent',check.length)
    if (check.length > 1) {
      document.getElementById(e.target.id).style.border = "2px solid #f2000072";
      this.props.setFormValid(false);
    } else {
      document.getElementById(e.target.id).style.border = "1px solid #ced4da";
    }
  };

  handleBlankAttribute = () => {
    console.log("handleBlankAttribute", this.rowAttribute);
  };

  render() {
    return (
      <div>
        <ProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          attributes={this.props.newEntity.attributes}
          filterText={this.state.filterText}
          toggleAddRuleModal={this.toggleAddRuleModal.bind(this)}
          handleBlurEvent={this.handleBlurEvent.bind(this)}
          //handleBlankAttribute={this.handleBlankAttribute.bind(this)}
        />
        <AddRuleTable
          addRuleModal={this.state.addRuleModal}
          toggleAddRuleModal={this.toggleAddRuleModal.bind(this)}
          attributes={this.props.newEntity.attributes}
          entity={this.props.newEntity}
          currentAttrID={this.state.currentAttrID}
          attrIndex={this.state.attrIndex}
          setNewEntity={this.props.setNewEntity}
          ruleMaster={this.state.ruleMaster}
          token={this.props.token}
          entities={this.props.entities}
          currentEntityId={this.props.currentEntityId}
        />
      </div>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.rowAttribute = React.createRef();
  }

  clickEvent = () => {
    const current = this.rowAttribute.current;
    // const rows = document.querySelectorAll("tr");
    // for (let index = 0; index < current.length; index++) {
    //   const element = array[index];

    // }

    console.log("clickEvent121", current);
  };

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var toggleAddRuleModal = this.props.toggleAddRuleModal;
    var handleBlurEvent = this.props.handleBlurEvent;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var attribute = this.props.attributes
      ? this.props.attributes.map(function (attribute, i) {
          if (attribute.attributeName.indexOf(filterText) === -1) {
            return;
          }
          return (
            <ProductRow
              onProductTableUpdate={onProductTableUpdate}
              product={attribute}
              onDelEvent={rowDel.bind(this)}
              key={attribute.id}
              toggleAddRuleModal={toggleAddRuleModal}
              handleBlurEvent={handleBlurEvent}
              //handleBlankAttribute={this.props.handleBlankAttribute}
            />
          );
        })
      : null;
    return (
      <div
        style={{ overflowY: "scroll", maxHeight: "20rem", overflowX: "hidden" }}
      >
        {/* <div onClick={() => this.clickEvent()}>Click me</div> */}
        <table className="table table-bordered">
          <thead>
            <tr className="bold">
              <th>Attribute Name *</th>
              <th>Attribute Description</th>
              <th>Data Examples</th>
              <th>is PK?</th>
              <th>is Nullable?</th>
              <th>Data Type *</th>
              <th>Length</th>
              <th>Format</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody ref={this.rowAttribute}>{attribute}</tbody>
        </table>

        <Button
          type="primary"
          className="blue-bg pull-right mr-2"
          onClick={this.props.onRowAdd}
        >
          + Add Attribute
        </Button>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }

  getRulesCount(rules) {
    const attrRules = rules.filter((rule) => rule.type !== "");
    //console.log("getRulesCount", attrRules);
    return attrRules.length;
  }

  render() {
    return (
      <tr className="eachRow" style={{ lineHeight: "0.5rem" }}>
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "attributeName",
            inputType: "text",
            width: "30%",
            value: this.props.product.attributeName,
            id: `attributeName-${this.props.product.id}`,
          }}
          handleBlurEvent={this.props.handleBlurEvent}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "attributeDesc",
            inputType: "text",
            width: "15%",
            value: this.props.product.attributeDesc,
            id: `attributeDesc-${this.props.product.id}`,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "dataExamples",
            inputType: "text",
            width: "15%",
            value: this.props.product.dataExamples,
            id: `dataExamples-${this.props.product.id}`,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "isPK",
            inputType: "checkbox",
            value: this.props.product.isPK,
            id: `isPK-${this.props.product.id}`,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "isNullable",
            inputType: "checkbox",
            value: this.props.product.isNullable,
            id: `isNullable-${this.props.product.id}`,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "dataType",
            inputType: "select",
            width: "8%",
            option: [
              { key: "int", val: "int" },
              { key: "float", val: "float" },
              { key: "date", val: "date" },
              { key: "datetime", val: "datetime" },
              { key: "string", val: "string" },
            ],
            value: this.props.product.dataType,
            id: `dataType-${this.props.product.id}`,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "length",
            inputType: "number",
            value: this.props.product.length,
            id: `length-${this.props.product.id}`,
            disabled: ["date", "datetime"].includes(this.props.product.dataType)
              ? true
              : false,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          handleBlurEvent={false}
          cellData={{
            type: "dateFormat",
            inputType: "text",
            width: "10%",
            value: this.props.product.dateFormat,
            disabled: ["date", "datetime"].includes(this.props.product.dataType)
              ? false
              : true,
            id: `dateFormat-${this.props.product.id}`,
          }}
        />
        <td className="del-cell">
          {/* <span onClick={this.onDelEvent.bind(this)}>Del</span> */}

          <span
            className="pr-2"
            onClick={() => this.props.toggleAddRuleModal(this.props.product)}
          >
            <a>
              <Badge
                size="small"
                count={this.getRulesCount(this.props.product.rules)}
                title="Validation Rule"
                style={{ backgroundColor: "#52c41a" }}
              >
                <SettingOutlined style={{ fontSize: 18 }} />
              </Badge>
            </a>
          </span>

          <Popconfirm
            overlayClassName="pop-padding"
            title="Sure to delete?"
            onConfirm={() => this.onDelEvent()}
          >
            <DeleteOutlined
              title="Delete Entity"
              style={{
                paddingLeft: "0.3rem",
                fontSize: "1.2rem",
                color: "#dc3545",
              }}
            />
          </Popconfirm>
        </td>
      </tr>
    );
  }
}

class EditableCell extends React.Component {
  getImgUrl = (name) => {
    return name ? require(`../../../../assets/dqe/${name}.png`) : null;
  };

  render() {
    const width = this.props.cellData.width ? this.props.cellData.width : "";
    return (
      <td style={{ width: width, padding: "0.5rem" }}>
        {this.props.cellData.inputType === "select" ? (
          <select
            name={this.props.cellData.type}
            id={this.props.cellData.id}
            value={this.props.cellData.value}
            className="form-control datatype-img"
            onChange={this.props.onProductTableUpdate}
          >
            {this.props.cellData.option.map((opt) => {
              return (
                <option key={opt.key} value={opt.key} className={opt.key}>
                  {` ${opt.val}`}
                </option>
              );
            })}
          </select>
        ) : this.props.cellData.inputType === "checkbox" ? (
          <div>
            <input
              type="checkbox"
              name={this.props.cellData.type}
              id={this.props.cellData.id}
              value={this.props.cellData.value}
              defaultChecked={
                this.props.cellData.value === "TRUE" ? "TRUE" : ""
              }
              onChange={this.props.onProductTableUpdate}
              className="form-control"
              style={{ height: "1.5rem" }}
            />
          </div>
        ) : this.props.cellData.inputType === "number" ? (
          <div>
            <input
              type="number"
              min="1"
              max="50"
              name={this.props.cellData.type}
              id={this.props.cellData.id}
              value={this.props.cellData.value}
              onChange={this.props.onProductTableUpdate}
              className="form-control"
              disabled={this.props.cellData.disabled ? true : false}
              autoComplete="off"
            />
          </div>
        ) : (
          <input
            type="text"
            name={this.props.cellData.type}
            id={this.props.cellData.id}
            value={this.props.cellData.value}
            onChange={this.props.onProductTableUpdate}
            className="form-control"
            autoComplete="off"
            disabled={this.props.cellData.disabled ? true : false}
            onBlur={
              this.props.handleBlurEvent ? this.props.handleBlurEvent : () => {}
            }
          />
        )}
      </td>
    );
  }
}

export default AddAttributeTable;
