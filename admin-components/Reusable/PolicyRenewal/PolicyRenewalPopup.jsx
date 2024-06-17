import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Stack, Typography } from '@mui/material';
import styles from './PolicyRenewalPopup.module.scss';
import CloseIcon from '@mui/icons-material/Close';

import { DatePicker, message, Radio, Select } from "antd/lib";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { endPoints, envUrl } from "@/utils/factory";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ApplicationContext } from "@/Context/ApplicationContext";
// import SnackbarAlert from "../../Reusable/AlertMessage/SnackbarAlert";
import { bytesToMb } from "@/utils/fileValidation";
// import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd/lib';
import InputText from '../InputText/InputText';
import SelectBox from '../SelectBox/SelectBox';
import Buttons from '../Buttons/Buttons';
import SnackbarAlert from '../AlertMessage/SnackbarAlert';

const InsurancePolicyRenewalPopup = ({
  visibleInsuranceRenewalPopup,
  handleCloseInsurancePopup,
  insurancePolicyData,
  getIncommingPolicyExpiryList,
  getNotificationData
}) => {

  const user = useSelector((state) => state.userReducer.user);
  const insuranceList = useSelector((state) => state.userReducer.insuranceType);
  const insuranceCatList = useSelector((state) => state.userReducer.insuranceCategory);
  const premiumList = useSelector((state) => state.userReducer.premiumType);
  const router = useRouter();
  const [benificiaryError, setBenificiaryError] = useState("");
  const [insuranceTypeError, setInsuranceTypeError] = useState("");
  const [insuranceCatError, setInsuranceCatError] = useState("");
  const [premiumTypeError, setPremiumTypeError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [issueDateError, setIssueDateError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [formItem, setFormItem] = useState({
    id: 0,
    policyNo:"",
    customerId: "",
    insuranceType: null,
    insuranceCategory:null,
    insuranceCategoryName:null,
    insuranceName:null,
    premiumType: null,
    oldPremiumTyp:null,
    amount: "",
    issueDate: "",
    expiryDate: "",
    prevIssuesDate:"",
    prevExpiryDate:"",
    email:"",
    name:""
  });
  const [insuranceTypeList,setInsuranceTypeList]=useState([]);
  const [insuranceCategoryList,setInsuranceCategoryList]=useState([]);
  const [premiumTypeList,setPremiumTypeList]=useState([]);
  const [filteredInsuranceType,setFilteredInsuranceType]=useState([]);

  // Alert Message Context
  const {
    alertMenu: {
      openAlert,
      setOpenAlert,
      alertMessage,
      setAlertMessage,
      alertMessageType,
      setAlertMessageType,
      handleCloseAlert,
    },
  } = useContext(ApplicationContext);

 const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormItem({ ...formItem, [name]: value });
    // Remove if Error
    if (name == "benificiary") {
      setBenificiaryError("");
    }
    if (name == "insuranceCategory") {
      setInsuranceCatError("");
    }
    if (name == "insuranceType") {
      setInsuranceTypeError("");
    }
    if (name == "premiumType") {
      setPremiumTypeError("");
    }
    if (name == "amount") {
      setAmountError("");
    }
    if (name == "issueDate") {
      setIssueDateError("");
    }
    if (name == "expiryDate") {
      setExpiryDateError("");
    }
    
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // save
      if (formItem.id !== 0) {
        
        
        if (!formItem.premiumType) {
          setPremiumTypeError("Please select the premium!");
        }
        
        if (formItem.issueDate == "" || !formItem.issueDate.trim()) {
          setIssueDateError("Please select the issue date!");
        }
        if (
          formItem.expiryDate == "" ||
          !formItem.expiryDate?.trim()
        ) {
          setExpiryDateError("Please select the expiry date!");
        }
       
        if (
          
          formItem.premiumType &&
          formItem.issueDate &&
          formItem.expiryDate
        ) {
          setIsLoading(true);
         
          const url = `${envUrl.baseUrl}${endPoints.renewalInsurancePolicy}`;
          formItem.createdBy=user && user?.username;
          await axios
            .post(url, formItem, {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                // ContentType: "multipart/form-data",
              },
            })
            .then((response) => {
             console.log(response)
             if (response && response?.data?.statusCode==200 && response.data?.result == "updated") {
              setOpenAlert(true);
              setAlertMessage("Insurance Policy Renewal successfully!");
              setAlertMessageType("success");
              setIsLoading(false);
              handleClosePopup();
              getIncommingPolicyExpiryList();
              getNotificationData();
            }
           
            })
            .catch((error) => {
              const err = new Error(error);
              console.log(err);
              setIsLoading(false);
            });
        }
      }
      // update
      
    } catch (error) {
      const err = new Error(error);
      console.log(err);
      setIsLoading(false);
    } finally {
      // setOpenAlert(false);
      setIsLoading(false);
    }
  };


const handleClosePopup=()=>{
  handleCloseInsurancePopup();
    setIssueDateError("");
    setExpiryDateError("");
}

  console.log(formItem)


  // handlle Dob
const handleChangeIssueDate=(date, dateString)=>{
console.log(date, dateString)
setFormItem({...formItem,issueDate:dateString});
setIssueDateError("")
}

// handlle Aniversarydate
const handleChangeExpiryDate=(date, dateString)=>{
console.log(date, dateString)
setFormItem({...formItem,expiryDate:dateString});
setExpiryDateError("")
}
const handleChangeBenificiary=(benificiary)=>{
setFormItem({...formItem,benificiary:benificiary});
setBenificiaryError("")
}
  const handleChangeCategory=(category)=>{
    if(category){
    const fileter=insuranceTypeList && insuranceTypeList.filter(item=>item.category==category);
    setFilteredInsuranceType(fileter)
    setFormItem({...formItem,insuranceCategory:category,insuranceType:null});
    setInsuranceCatError  ("")
    }else{
      setFilteredInsuranceType([])
      setFormItem({...formItem,insuranceCategory:null,insuranceType:null});
      setInsuranceCatError  ("")
    }
  }
  
  const handleChangeInsuranceType=(insuranceType)=>{
      setFormItem({...formItem,insuranceType:insuranceType});
      setInsuranceTypeError("")
  }
  

  useEffect(() => {
    if (insuranceList && premiumList && insuranceCatList) {
      setInsuranceTypeList(insuranceList);
      setPremiumTypeList(premiumList);
      setInsuranceCategoryList(insuranceCatList);

    }
  }, [insuranceList,premiumList,insuranceCatList]);
  
  useEffect(()=>{
    if(insurancePolicyData){
      setFormItem({
        ...formItem,
        id:insurancePolicyData?.id,
        policyNo:insurancePolicyData?.policy_no,
        customerId:insurancePolicyData?.customer_id,
        insuranceCategory:insurancePolicyData?.insurance_category,
        insuranceType: insurancePolicyData?.insurance_name,
        premiumType: insurancePolicyData?.premium_type,
        insuranceCategoryName: insurancePolicyData?.category_name,
        insuranceName:insurancePolicyData?.insurance_name,
        oldPremiumTyp:insurancePolicyData?.premium_name,
        amount: insurancePolicyData?.amount,
        prevIssuesDate:insurancePolicyData?.issue_date,
        prevExpiryDate:insurancePolicyData?.expiry_date,
        email:insurancePolicyData?.email,
        name:insurancePolicyData?.full_name,
        issueDate: "",
        expiryDate:""

      })
    }
  },[insurancePolicyData])

  return (
   <>
     <Dialog
    open={visibleInsuranceRenewalPopup}
    onClose={handleClosePopup}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    className={styles.Dialog}
    maxWidth="md"
    fullWidth
  >
    <DialogTitle className={styles.PopupHeader}>
        <h5>Insurance Policy Renewal</h5> <CloseIcon onClick={handleClosePopup} />
    </DialogTitle>
    <DialogContent>
       <Grid className={styles.InsuranceContainer}>
       <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                method="post"
              >
                <Grid container direction={"row"} spacing={2.5}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography className={styles.Title}>
                     Policy No <span>*</span>
                    </Typography>
                    <InputText
                      size={"large"}
                      name="policyNo"
                      value={formItem.policyNo}
                      onChange={handleChangeForm}
                      disabled
                      
                    />
                    
  
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography className={styles.Title}>
                     Client/Customer Id <span>*</span>
                    </Typography>
                    <InputText
                      size={"large"}
                      name="customerId"
                      value={formItem.customerId}
                      onChange={handleChangeForm}
                      disabled
                    />
                    
  
                  </Grid>
               
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography className={styles.Title}>
                      Insurance Category <span>*</span>
                    </Typography>
                    
                    <SelectBox
                    disabled
                    style={{ width: "100%" }}
                    placeholder={"Insurance Category"}
                    size={"large"}
                    name={"insuranceCategory"}
                     value={formItem?.insuranceCategory}
                    options={insuranceCategoryList && insuranceCategoryList.map((item)=>{
                      return { label:item?.category_name,value:item?.id }
                    })}
                    allowClear
                    onChange={handleChangeCategory}
                  />
                    <Typography className={styles.ErrorText}>
                      {insuranceCatError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography className={styles.Title}>
                      Insurance Type <span>*</span>
                    </Typography>
                    <SelectBox
                    disabled
                    style={{ width: "100%" }}
                    placeholder={"Insurance Type"}
                    size={"large"}
                    name={"insuranceType"}
                     value={formItem?.insuranceType}
                    options={filteredInsuranceType && filteredInsuranceType.map((item)=>{
                      return { label:item?.insurance_name,value:item?.id }
                    })}
                    allowClear
                    onChange={handleChangeInsuranceType}
                  />
                    <Typography className={styles.ErrorText}>
                      {insuranceTypeError}
                    </Typography>
                  </Grid>
                  
                
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography className={styles.Title}>
                      Amount <span>*</span>
                    </Typography>
                    <InputText
                    disabled
                      placeholder={"Amount"}
                      size={"large"}
                      name="amount"
                      value={formItem?.amount}
                      onChange={handleChangeForm}
                    />
                    <Typography className={styles.ErrorText}>
                      {amountError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography className={styles.Title}>
                     Premium Type <span>*</span>
                    </Typography>
                   
                    <SelectBox
                    placeholder={"Premium Type"}
                    style={{ width: "100%" }}
                    size={"large"}
                    name={"premiumType"}
                     value={formItem?.premiumType}
                    options={premiumTypeList && premiumTypeList.map((item)=>{
                      return { label:item?.premium_name,value:item?.id }
                    })}
                    allowClear
                    onChange={(e)=>{setFormItem({...formItem,premiumType:e});setPremiumTypeError("")}}
                  />
                    <Typography className={styles.ErrorText}>
                      {premiumTypeError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography className={styles.Title}>
                      New Issue Date <span>*</span>
                    </Typography>
                   
                    {/* <InputText
                      size={"large"}
                      name="issueDate"
                      value={formItem?.issueDate}
                      onChange={handleChangeForm}
                    /> */}
                    <DatePicker
                    style={{width:'100%'}}
                    size={"large"}
                    placeholder="Issue Date"
                    // defaultValue={dayjs(custFormItem.dob, dateFormat)}
                    // format={dateFormat}
                    // value={dayjs(custFormItem.dob, dateFormat)}
                    onChange={handleChangeIssueDate}
                    popupStyle={{zIndex:2000}}
                     />
                    <Typography className={styles.ErrorText}>
                      {issueDateError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography className={styles.Title}>
                      New Expiry Date <span>*</span>
                    </Typography>
                    {/*
                    <InputText
                      size={"large"}
                      name="expiryDate"
                      value={formItem?.expiryDate}
                      onChange={handleChangeForm}
                    />
                  */}
                  <DatePicker
                    style={{width:'100%'}}
                    size={"large"}
                    placeholder="Expiry Date"
                    // defaultValue={dayjs(custFormItem.dob, dateFormat)}
                    // format={dateFormat}
                    // value={dayjs(custFormItem.dob, dateFormat)}
                    onChange={handleChangeExpiryDate}
                    popupStyle={{zIndex:2000}}
                     />
                    <Typography className={styles.ErrorText}>
                      {expiryDateError}
                    </Typography>
                  </Grid>
               
                  <Grid item sm={12} md={12} lg={12}>
                    <Stack direction={"row"} justifyContent={"right"} spacing={2}>
                      {/* <Buttons
                        htmlType={"reset"}
                        className={styles.BackBlog}
                      >
                        Back
                      </Buttons> */}
                      {!isLoading ? (
                        <>
                            <Buttons
                              htmlType={"submit"}
                              className={styles.BtnCreateBlog}
                            >
                              Renew Policy
                            </Buttons>
                        </>
                      ) : (
                        <Buttons
                          // htmlType={"submit"}
                          disabled={true}
                          className={styles.BtnCreateBlog}
                          style={{background:'#7978E9',color:'#fff'}}
                        >
                          Loading...
                        </Buttons>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </form>
       </Grid>
    </DialogContent>
      
  </Dialog>
  <SnackbarAlert />
   </>
  )
}

export default InsurancePolicyRenewalPopup