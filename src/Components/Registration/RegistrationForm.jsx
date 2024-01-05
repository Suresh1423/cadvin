import {
  Box,
  Center,
  FileInput,
  InputError,
  PinInput,
  Select,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { FcUpload } from "react-icons/fc";
import toast from "react-hot-toast";
import { c4eApi } from "../../ApiData/ApiConstants";
import AvinyaLoader from "../Loader/AvinyaLoader";
import { useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
import { Appbar } from "../Appbar/Appbar";

const RegistrationForm = () => {
  const icon = <FcUpload style={{ height: rem(300), width: rem(200) }} />;
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [base64img, setBase64img] = useState("");
  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    if (e.size > 2000000) {
      toast.error("File size should be less than 2mb", 4000);
      return;
    }
    setFile(URL.createObjectURL(e));
    const base64 = await convertToBase64(e);
    setBase64img(base64);
  };

  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      grade: "",
      schoolname: "",
    },
    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value.length > 10 || value.length < 10
          ? "Phone number should be 10 digits"
          : null,
    },
  });

  const otpForm = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      otp:""
    },
    // functions will be used to validate values at corresponding key
    validate: {
      otp: (value) =>
        value.length > 6 || value.length < 6
          ? "Otp should be of 6 digits"
          : null,
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && form.values.grade !== "") {
      e.preventDefault();
      const formData = {
        address: form.values.address,
        email: form.values.email,
        grade: parseInt(form.values.grade),
        image: base64img,
        phoneNumber: form.values.phone,
        registeredTime: "",
        schoolName: form.values.schoolname,
        studentName: form.values.name,
      };
      setLoading(true)
      await c4eApi
        .post("", formData)
        .then((resp) => {
          toast.success("Student Registered kindly verify the otp");
          setOtp(true);
          setLoading(false);
        })
        .catch((err) => {toast.error("Unable to proceed kindly contact adminstration"); setLoading(false)});
      }
      else if(form.values.grade === ""){
        toast.error("Enter grade")
        setLoading(false);
        return;
      }
      else{
        toast.error("Upload Id proof")
        setLoading(false);
        return;
      }
  };

  const valdiateOtp = async (e)=>{
    e.preventDefault();
    const otpFormData = {
      email:form.values.email,
      otp:otpForm.values.otp
    }
    if (otpFormData.otp.length == 6) {
      setLoading(true);
      await c4eApi
        .post("/validate-otp", otpFormData)
        .then((resp) => {
          toast.success("Otp validated successfully");
          setOtp(true);
          setLoading(false);
          localStorage.setItem('user', (AES.encrypt(JSON.stringify(resp.data),'SHIKSHAKPRO@2023ASAT')).toString());
          navigate("/instructions")
        })
        .catch((err) => {toast.error("Invalid otp"); setLoading(false)});
      }
      else{
        toast.error("Enter valid otp")
        setLoading(false);
        return;
      }
  }

  return (
    <>
    {
      loading ? <AvinyaLoader/> : 
      <>
      <Appbar/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <Stack
          bg=""
          style={{
            borderRadius: "6px",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          }}
          p={10}
          w={"85%"}
          maw={{ xs: "95%", sm: "90%", md: "70%", xl: "50%" }}
        >
          <Center
            style={{ display: "flex", flexDirection: "column" }}
            c={"cyan.8"}
          >
            <Text size="1.5rem" fw={"600"}>
              Registration
            </Text>
            <Box w={{ base: "95%", sm: "80%", md: "50%" }} p={10}>
            
              <form onSubmit={handleSubmit}>
              {
                  otp?"":
                  <>
                <TextInput
                  label="Name"
                  placeholder="Name"
                  required
                  {...form.getInputProps("name")}
                />
                <TextInput
                  mt="sm"
                  label="Email"
                  placeholder="Email"
                  required
                  {...form.getInputProps("email")}
                />
                <TextInput
                  mt="sm"
                  label="Phone"
                  placeholder="Phone"
                  type="number"
                  required
                  {...form.getInputProps("phone")}
                />
                <TextInput
                  mt="sm"
                  label="Address"
                  placeholder="Address"
                  required
                  {...form.getInputProps("address")}
                />
                <Select
                  required
                  mt="sm"
                  label="Select Grade"
                  placeholder="Select Grade"
                  data={["9", "11"]}
                  {...form.getInputProps("grade")}
                />
                <TextInput
                  mt="sm"
                  label="School Name"
                  placeholder="School Name"
                  required
                  {...form.getInputProps("schoolname")}
                />
                <FileInput
                  variant="unstyled"
                  rightSection={icon}
                  bg={"cyan.1"}
                  clearable
                  required
                  accept="image/png,image/jpeg,image/jpg"
                  label="Attach your Id proof"
                  placeholder="Upload your Id proof"
                  rightSectionPointerEvents="none"
                  p={10}
                  type="file"
                  style={{ borderRadius: "4px" }}
                  mt="md"
                  mb={"md"}
                  onChange={handleFileUpload}
                />
                {file ? (
                  <img
                    src={file}
                    alt="Image"
                    height="150px"
                    width="100%"
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  ""
                )}
                
                <Button
                  type="submit"
                  mt="sm"
                  w={{ base: "100%" }}
                  variant="gradient"
                >
                  Get Otp
                </Button>
                </>
                }
                
              </form>

              {otp ? (
                <>
                <form onSubmit={valdiateOtp}>
                  <Text size="1.2rem" fw={"600"} mt={10}>
                    Enter Otp
                  </Text>
                  <PinInput
                    type={/^[0-9]*$/}
                    inputType="tel"
                    inputMode="numeric"
                    oneTimeCode
                    length={6}
                    mt={10}
                    w={"100%"}
                    size="lg"
                    required
                   {...otpForm.getInputProps("otp")}
                  />
                  <Button
                    type="submit"
                    mt="sm"
                    w={{ base: "100%" }}
                    variant="gradient"
                  >
                  Submit
                </Button>
                </form>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Center>
        </Stack>
      </div>
      </>
      }
    </>
  );
};

export default RegistrationForm;
