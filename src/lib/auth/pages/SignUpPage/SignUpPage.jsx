import { Box, Checkbox, Container, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { EntranceAnimation } from "src/animation";
import UserDoc from "src/classes/User.class";
import {
  deleteUserFromFirebase,
  signupWithFirebase,
  updateUser,
} from "src/config/firebase-utils";
import { roles } from "src/constants/roles";
import { allRules, errorMessages, labels } from "src/data";
import { UserService } from "src/services/user.service";
import { ArrowButton, TransitionsModal } from "src/ui";
import FormInputField from "src/ui/FormInputField";
import FormSelectField from "src/ui/FormSelectField";
import Loader from "./components/Loader";
import SignUpMethod from "./components/SignUpMethod";
import css from "./style.module.css";
import { UserAuth } from "../../authContext";
import { Link } from "react-router-dom";

const FIELDS_MAP = {
  TextField: FormInputField,
  Select: FormSelectField,
};

export const SigninMethods = {
  FIREBASE: "FIREBASE",
  GOOGLE: "GOOGLE",
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [methodClicked, setMethodClicked] = React.useState(null);

  const [formValues, setFormValues] = React.useState({});
  const [openRulesModal, setOpenRulesModal] = React.useState(false);
  const [rules, setRules] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(null);
  const [profilePicPreview, setProfilePicPreview] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const { user } = UserAuth();
  const [validationErrors, setValidationErrors] = React.useState({});

  const storage = getStorage();

  const filterdLabels =
    methodClicked === SigninMethods.FIREBASE
      ? labels
      : labels.filter((label) => label.key !== "password");

  const handleFirebaseSignUp = async () => {
    const newAuthUser = await signupWithFirebase({
      email: formValues.email.trim(),
      password: formValues.password?.trim(),
    });

    // TODO: export to function
    setLoader(true);
    let profilePicUrl = "";
    if (profilePic) {
      const storageRef = ref(storage, `profilePics/${profilePic.name}`);
      await uploadBytes(storageRef, profilePic);
      profilePicUrl = await getDownloadURL(storageRef);
    }
    setLoader(false);

    await updateUser(newAuthUser, {
      displayName: formValues.fullName?.trim(),
      photoURL: profilePicUrl,
    });

    return newAuthUser;
  };

  const onSignupHandler = async () => {
    try {

      const validationState = filterdLabels.reduce(
        (obj, { key, validator }) => {
          obj[key] = !validator(formValues[key]);
          return obj;
        },
        {}
      );

      setValidationErrors(validationState);

      if (Object.keys(validationState).length === 0) return;
      for (const key in validationState) {
        if (key === "experienceDetails" && formValues["experience"] !== "כן") {
          validationState[key] = validationState["experience"];
        }

        if (validationState[key]) {
          return;
        }
      }
      if (!rules) return;


      let userData = null;

      if (methodClicked === SigninMethods.FIREBASE) {
        userData = await handleFirebaseSignUp();
      }

      if (methodClicked === SigninMethods.GOOGLE) {
        userData = user;
      }

      const userDocData = new UserDoc({
        first_name: formValues.fullName.trim(),
        last_name: formValues.fullName.trim(),
        card_id: formValues.id.trim(),
        phone_number: formValues.phoneNumber.trim(),
        role: roles.applicant,
        appliciant_data: {
          field_of_study: formValues.fieldOfStudy,
          school_year: formValues.schoolYear,
          program: formValues.program,
          experience: formValues.experience,
          experience_details: (formValues.experienceDetails ?? "").trim(),
        },
      });

      await UserService.create({ userCredential: userData, ...userDocData });
      setOpenModal(true); // TODO: add button to go to home page
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      await deleteUserFromFirebase(user);
    }
  };

  const inputHandler = (validator, key, value) => {
    const isValid = validator(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [key]: !isValid,
    }));
  };

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const goHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <EntranceAnimation>
      <Container
        maxWidth="md"
        sx={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginBottom: "50px",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          <span className={css["text-yellow"]}>הרשמה</span> לאתר
        </Typography>
        <div className={css["container-signup"]}>
          {!methodClicked && (
            <SignUpMethod
              setMethodClicked={setMethodClicked}
              setEmail={setEmail}
              setName={setName}
              setProfilePicPreview={setProfilePicPreview}
              setFormValues={setFormValues}
            />
          )}
        </div>

        <div className={css["container"]}>
          {methodClicked && (
            <>
              <Box
                sx={{
                  backgroundColor: "#0a0a1b",
                  padding: {
                    lg: "20px 80px 20px 80px",
                  },
                  borderRadius: "10px",
                  border: "1px solid #1F1F53",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  marginBottom={7}
                  marginTop={2}
                >
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      marginBottom: "15px",
                      bgcolor: "grey",
                    }}
                    src={profilePicPreview}
                  />
                  <Box
                    component="label"
                    sx={{
                      backgroundColor: "#f6c927",
                      borderRadius: "5px",
                      width: "fit-content",
                      padding: "10px",
                      color: "black",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0px 0px 10px 0px #f6c927bd",
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadClick}
                    />
                  </Box>
                </Grid>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  {filterdLabels.map(
                    (
                      { inputType, type, label, key, options, validator },
                      index
                    ) => {
                      const FieldComponent = FIELDS_MAP[inputType];
                      return label === "Experience Details" &&
                        formValues["experience"] !== "כן" ? null : (
                        <EntranceAnimation
                          key={index}
                          animationDelay={
                            label === "Experience Details" ? 0 : index * 0.2
                          }
                        >
                          <Box
                            sx={{
                              marginBottom: {
                                xs: "0.75rem",
                              },
                            }}
                          >
                            <FieldComponent
                              type={type ?? "text"}
                              sx={{
                                width: {
                                  xs: "90%",
                                  lg: "100%",
                                },
                                alignSelf: "center",
                              }}
                              options={options}
                              label={label}
                              email={email ?? user.email}
                              name={name ?? user.displayName}
                              onChange={(event) => {
                                setFormValues((prev) => {
                                  return { ...prev, [key]: event.target.value };
                                });
                                inputHandler(
                                  validator,
                                  key,
                                  event.target.value
                                );
                              }}
                              error={validationErrors[key]}
                            />
                          </Box>
                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "#f44336",
                            }}
                          >
                            {validationErrors[key] ? errorMessages[key] : ""}
                          </Typography>
                        </EntranceAnimation>
                      );
                    }
                  )}
                </Box>
                <Grid
                  container
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item xs={12} md={6}>
                    <TransitionsModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      title={"נרשמת לאתר בהצלחה!"}
                      closeOnOverlay={false}
                      btnText="מעבר לדף הבית"
                      btnOnClick={goHome}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          textAlign: "center",
                          marginBottom: "2rem",
                          marginTop: "1rem",
                        }}
                      >
                        אם עדיין לא נרשמת ליום המיון –{" "}
                        <Link
                          to="/sortday"
                          style={{
                            textDecoration: "underline",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          onClick={() => setOpenModal(false)}
                        >
                          לחץ כאן
                        </Link>
                      </Typography>
                    </TransitionsModal>

                    <TransitionsModal
                      openModal={openRulesModal}
                      setOpenModal={setOpenRulesModal}
                      title={"תקנון"}
                      closeOnOverlay={true}
                      btnText="סגור"
                      btnOnClick={() => setOpenRulesModal(false)}
                    >
                      <ul>
                        {allRules.map((rule) => {
                          return <li key={rule}>{rule}</li>;
                        })}
                      </ul>
                      <Container
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      ></Container>
                    </TransitionsModal>

                    <Loader loading={loader} />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { sm: "1fr", md: "1fr" },
                        gap: "1rem",
                      }}
                    >
                      <Container
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "30px",
                        }}
                      >
                        <Checkbox
                          defaultChecked={rules ? true : false}
                          onClick={() => {
                            setRules((prev) => !prev);
                            setOpenRulesModal(false);
                          }}
                          sx={{ color: "white" }}
                        />
                        <Typography>
                          אני מאשר\ת את תנאי{" "}
                          <span
                            className={css["terms"]}
                            onClick={() => setOpenRulesModal((prev) => !prev)}
                          >
                            התקנון
                          </span>
                        </Typography>
                      </Container>
                    </Box>

                    {/* {rules && ( */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "40px",
                      }}
                    >
                      <ArrowButton onClick={onSignupHandler}>
                        Submit
                      </ArrowButton>
                    </div>
                    {/* )} */}
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </div>
      </Container>
    </EntranceAnimation>
  );
};

export default SignUpPage;
