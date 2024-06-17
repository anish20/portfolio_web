"use client";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";

import { Container, Image } from "react-bootstrap";
import InputText from "../Reusable/InputText/InputText";
import Buttons from "../Reusable/Buttons/Buttons";
import InputPassword from "../Reusable/InputText/InputPassword";
import Link from "next/link";
import { Form } from "antd/lib";
import { useRouter } from "next/router";
import axios from "axios";
import { envUrl, endPoints } from "@/utils/factory";
// import { setCity, setInsuranceCategory, setInsuranceType, setLoadStatusMaster, setPremiumType, setState, setUser } from "@/redux-toolkit/features/user";
// import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ cookies }) => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");

  // const onFinish=(value)=>{
  //   router.push("/dashboard")
  // }

  const [openSnackAlert, setOpenSnackAlert] = useState(false);
  const handleCloseSnackAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackAlert(false);
  };

  const login = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${envUrl.baseUrl}${endPoints.login}`,
        { userid: values.userid, password: values.password },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
       console.log("login", response);
      if (response.status === 200 && response.data.data.loginStatus!=="inactive") {
        const userinRedux = {
          ...response.data.data,
          token:response && response?.data?.data?.token,
        };
        loadInsuranceTypeData();
        loadInsuranceCategoryData();
        loadPremiumTypeData();
        loadStatusMasterData();
        // saving in redux
        dispatch(setUser(userinRedux));
        router.push("/dashboard");
      }else{
        setMessageText("Inactive user, please contact admin!");
        setOpenSnackAlert(true);
        setLoading(false);
        return;
      }
    } catch (error) {
      // console.log(error.response);
      if (error && error.response) {
        const { data } = error.response;
        if (data && data.data?.loginStatus == "incorrect") {
          setMessageText("Please enter valid credentials!");
          setOpenSnackAlert(true);
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  const loadInsuranceTypeData = async () => {
    try {
      {
        await axios
          .get(
            `${envUrl.baseUrl}${endPoints.loadInsuranceType}`,
          )
          .then((response) => {
            if(response && response.data?.list){
              dispatch(setInsuranceType(response.data?.list))
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadInsuranceCategoryData = async () => {
    try {
      {
        await axios
          .get(
            `${envUrl.baseUrl}${endPoints.loadInsuranceCategory}`,
          )
          .then((response) => {
            if(response && response.data?.list){
              dispatch(setInsuranceCategory(response.data?.list))
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const loadPremiumTypeData = async () => {
    try {
      {
        await axios
          .get(
            `${envUrl.baseUrl}${endPoints.loadPremiumType}`,
          )
          .then((response) => {
            if(response && response.data?.list){
              dispatch(setPremiumType(response.data?.list))
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const loadStatusMasterData = async () => {
    try {
      {
        await axios
          .get(
            `${envUrl.baseUrl}${endPoints.loadStatusMaster}`,
          )
          .then((response) => {
            if(response && response.data?.list){
              dispatch(setLoadStatusMaster(response.data?.list))
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <Grid className={styles.LoginWrapper}>
      <Container className="loginForm">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
          method="post"
        >
          <Grid className={styles.LoginContainer}>
            {/* <Grid className={styles.LogoConatiner}>
              <Image src="/images/newlogo.webp" alt="loginlogo" />
            </Grid> */}
            <Grid className={styles.LoginForm}>
              <Typography variant="h2">Admin Login</Typography>
              {/* <Typography>Log in to get started.</Typography> */}
              <Grid className={styles.FormContainer}>
                <Grid className={styles.FormGroup}>
                  <Form.Item
                    name="userid"
                    rules={[
                      {
                        required: true,
                        message: "Please input the userid!",
                      },
                    ]}
                  >
                    <InputText
                      className={styles.InputText}
                      name="userid"
                      placeholder="userid"
                    />
                  </Form.Item>
                </Grid>
                <Grid className={styles.FormGroup}>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input the password!",
                      },
                    ]}
                  >
                    <InputPassword
                      type="password"
                      className={styles.InputPassword}
                      s
                      name="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                </Grid>
                <Grid className={styles.FormGroup}>
                  {!loading ? (
                    <Buttons block htmlType={"submit"}>
                      Log In
                    </Buttons>
                  ) : (
                    <Buttons block disabled={true}>
                      Please wait...
                    </Buttons>
                  )}

                  {/* <Typography className={styles.RegisterText}>Don’t have an account? <Link href={"/register"}>Create An Account</Link></Typography> */}
                </Grid>
              </Grid>
              <Typography className={styles.InfoText}>
                By sign in you agree to our <span>Terms of Use</span> and{" "}
                <span>Privacy Policy.</span>
              </Typography>
            </Grid>
          </Grid>
        </Form>
      </Container>
      {/* Message Alert */}
      <Snackbar
        open={openSnackAlert}
        autoHideDuration={6000}
        onClose={handleCloseSnackAlert}
      >
        <Alert
          onClose={handleCloseSnackAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {messageText}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;
