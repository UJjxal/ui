import React, { useContext, useState, useEffect, useCallback  } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { DatePicker } from "antd";
import moment from "moment";
import { AppContext } from "../../../../../AppProvider";
import { CONTEXT, API_ROOT } from "../../../../../config";
import axios from "axios";

const GeneralManagement = (props) => {
  const { token, hasRights, menuContent } = useContext(AppContext);
  const [businessDay, setBusinessDay] = useState("");
  const [isCheckbox, setIsCheckbox] = useState({ year: {}, month: {} });
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    getFirstBusinessDay();
  }, []);

  const handleCheckbox = (e, type) => {
    const name = e.target.name;
    setIsCheckbox({ ...isCheckbox, [type]: { name } });
    setSelectedDate(moment(selectedDate).set(type, name));
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getFirstBusinessDay = useCallback(() => {
    axios({
      method: "get",
      url: API_ROOT + `listBusinessDay/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        let bday = res.data.response.filter(
          (item) => item.kpi_domain === props.KPIdomain
        );
        if (bday.length > 0) {
          let resDate = moment(bday[0]["date"]);
          setSelectedDate(resDate);
          setIsCheckbox({
            year: { name: "" + resDate.year() },
            month: { name: "" + resDate.format("MMM") },
          });
          setBusinessDay(bday[0]["key"]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const setFirstBusinessDay = (kpi_domain) => {
    let data = {
      key: `First Business Day`,
      month: moment(selectedDate).format("MMM"),
      year: moment(selectedDate).year(),
      date: moment(selectedDate).format("YYYY-MM-DD"),
      kpiDomain: kpi_domain,
    };
    axios({
      method: "post",
      url: API_ROOT + `businessDay/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      data,
    })
      .then((res) => {
        if (res.data.response === "success") {
          //Promise.reject();
          window.alert(`Business Day added successfully!`);
        } else {
          window.alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const selectYear = [
    {
      name: "2021",
      label: "2021",
    },
    {
      name: "2020",
      label: "2020",
    },
    {
      name: "2019",
      label: "2019",
    },
    {
      name: "2018",
      label: "2018",
    },
    {
      name: "2017",
      label: "2017",
    },
  ];
  const selectMonth = [
    {
      name: "Jan",
      label: "Jan",
    },
    {
      name: "Feb",
      label: "Feb",
    },
    {
      name: "Mar",
      label: "Mar",
    },
    {
      name: "Apr",
      label: "Apr",
    },
    {
      name: "May",
      label: "May",
    },
    {
      name: "Jun",
      label: "Jun",
    },
    {
      name: "Jul",
      label: "Jul",
    },
    {
      name: "Aug",
      label: "Aug",
    },
    {
      name: "Sep",
      label: "Sep",
    },
    {
      name: "Oct",
      label: "Oct",
    },
    {
      name: "Nov",
      label: "Nov",
    },
    {
      name: "Dec",
      label: "Dec",
    },
  ];
  const dayOptions = ["First Business Day"]; //'Last Business Day', 'Mid Month Pay Cycle'

  // count children

  let homePage = [];
  const processChildren = (children) => {
    children.length > 0 && children.forEach((child) => processChild(child));
  };

  const processChild = (menu) => {
    if (CONTEXT + menu.link === props.pageUrl) {
      homePage.push(menu);
    } else {
      menu.children &&
        menu.children.length > 0 &&
        processChildren(menu.children);
    }
  };

  menuContent.forEach((menu) => {
    if (CONTEXT + menu.link === props.pageUrl) {
      homePage.push(menu);
    } else {
      menu.children &&
        menu.children.length > 0 &&
        processChildren(menu.children);
    }
  });

  let newChildren = [];

  if (
    homePage.length > 0 &&
    homePage[0].children &&
    homePage[0].children.length > 0
  ) {
    homePage[0].children.forEach((child) => {
      let foundGroup = false;
      if (child.userGroups) {
        child.userGroups.forEach((group) => {
          if (hasRights.includes(group)) {
            foundGroup = true;
          }
        });
      } else {
        foundGroup = true;
      }
      if (foundGroup) {
        newChildren.push({ ...child });
      }
    });

    homePage[0].children = [...newChildren];
  }

  return (
    <div>
      <FormControl variant="outlined" style={{ width: "25rem" }}>
        <InputLabel id="demo-simple-select-outlined-label">
          Business Day
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={`First Business Day`}
          onChange={(event) => setBusinessDay(event.target.value)}
          label="Business Day"
          placeholder="Business Day"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dayOptions.map((option) => (
            <MenuItem key={option} className="text-capitalize" value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h6 className="my-3">Select the Year</h6>
      <ul className="list-inline mb-4">
        {selectYear.map(({ name, label }, i) => (
          <li key={i} className="list-inline-item">
            <label
              className={
                isCheckbox.year["name"] !== name
                  ? `pills`
                  : `pills bg-primary border-primary text-white`
              }
            >
              <input
                name={name}
                type="checkbox"
                className="d-none"
                checked={isCheckbox.year["name"] !== name ? false : true}
                onChange={(e) => handleCheckbox(e, `year`)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
      <h6 className="mb-3">Select the Month</h6>
      <ul className="list-inline mb-4">
        {selectMonth.map(({ name, label }, i) => (
          <li key={i} className="list-inline-item">
            <label
              className={
                isCheckbox.month["name"] !== name
                  ? `pills`
                  : `pills bg-primary border-primary text-white`
              }
            >
              <input
                name={name}
                type="checkbox"
                className="d-none"
                checked={isCheckbox.month["name"] !== name ? false : true}
                onChange={(e) => handleCheckbox(e, `month`)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
      <h6 className="mb-0">Select the Date</h6>
      <DatePicker
        mode={`date`}
        open
        value={selectedDate}
        renderExtraFooter={() => null}
        getPopupContainer={() =>
          document.querySelector(".calender-wrapper-default")
        }
        placeholder="Select the Date"
        onChange={handleDateChange}
        style={{ height: 0, visibility: "hidden" }}
        dropdownClassName="position-static"
      />
      <div className="calender-wrapper-default position-relative"></div>
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#3f88c5" }}
          onClick={() => setFirstBusinessDay(homePage[0].displayName)}
        >
          {`Submit`}
        </Button>
      </div>
    </div>
  );
};

export default GeneralManagement;
