import React, { useState } from "react";
import { Form, Input, Button, Radio, Modal, Select, Row, Col } from "antd/lib";
// import { DeleteOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
const ConfirmDeletePopup = ({
  content,
  visible,
  handleOk,
  handleCancel,
  DeleteContentflag,
  deleteApi,
  submitLoading,
  setSubmitLoading,
}) => {
  //   const content = useSelector((status) => status.contentReducer.content);
  //   const [submitLoading, setSubmitLoading] = useState(false);

  const delete_page = async () => {
    setSubmitLoading(true);
    try {
      const variables = {
        id: content.id ? content.id : null,
      };

      const data = await axios
        .post(`${envUrl.baseUrl}${cmsendPoint.deleteContent}`, variables, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(function (result) {
          if (result) {
            if (result.data.deleteContent === "success") {
              setSubmitLoading(false);
              DeleteContentflag();
              handleCancel();
            } else {
              //not deleted
            }
          } else {
            //error
          }
        })
        .catch(function (error) {
          console.log("@@@@@@@@@@@@@@@result-1", error);
        });
    } catch (error) {
      console.log("error signIn:", error.message);
      setSubmitLoading(false);
    }
  };
  return (
    <>
      <Modal
        title={null}
        open={visible}
        onOk={handleOk}
        centered={true}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={386}
      >
        <Row>
          <Col span={1} offset={11}>
            {/* <DeleteOutlined className={styles.deletePopupBoxIcon} /> */}
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <div className={styles.textArea}>
              <p className={styles.deleteText1}>{content}</p>
              <p className={styles.text2}>Are you sure?</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={3}>
            <Button
              className={styles.yesButton}
              onClick={deleteApi}
              loading={submitLoading}
            >
              Yes
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={3}>
            <Button className={styles.noButton} onClick={handleCancel}>
              No
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ConfirmDeletePopup;
