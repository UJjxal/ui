import axiosClient from "../../../../services/axiosClient";

// const getAlertData = async (offset, limit) => {
const getAlertData = async () => {
    const res = await axiosClient().get(
        `risk360/alerts-dashboard`
    );
    return res && res.data && res.data.response;
    // const res = await axiosClient().get(
    //     `risk360/alerts-dashboard?offset=${offset}&limit=${limit}`
    // );
    // return res && res.data;
};
const getNewsAlertData = async (alertID) => {
    const res = await axiosClient().get(
        `risk360/case-details/${alertID}`
    );
    return res && res.data && res.data.response;
};
const getUpdateAlertData = async (alertID) => {
    const res = await axiosClient().get(
        `risk360/alerts-dashboard/${alertID}`
    );
    return res && res.data && res.data.response;
};

const getUpdateCaseOwner = async (body) => {
    const res = await axiosClient().put(
        `risk360/case-details`,
        body
    );
    return res && res.data && res.data.response;
};

const getSaveNewsAlertData = async (body) => {
    const res = await axiosClient().post(
        `risk360/case-details`,
        body
    );
    return res && res.data && res.data.response;
};

const getNotificationsData = async (body) => {
    const res = await axiosClient().post(
        `notification`,
        body
    );
    return res && res.data && res.data.response;
};

const getEmailData = async (body) => {
    const res = await axiosClient().post(
        'email-notification',
        body
    );
    return res && res.data && res.data.response;
};

export { getAlertData, getNewsAlertData, getUpdateAlertData, getUpdateCaseOwner, getSaveNewsAlertData, getNotificationsData, getEmailData };