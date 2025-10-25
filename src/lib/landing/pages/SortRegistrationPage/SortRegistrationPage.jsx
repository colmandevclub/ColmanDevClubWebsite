import * as React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { EntranceAnimation } from "src/animation";
import { ArrowButton, TransitionsModal } from "src/ui";
import FormInputField from "src/ui/FormInputField";
import FormSelectField from "src/ui/FormSelectField";
import { sortRegistrationService } from "src/services/sortRegistrationService";
import { Validators } from "src/services/validators.service";
import { toast } from "react-toastify";
import css from "src/lib/auth/pages/SignUpPage/style.module.css";
import Loader from "src/lib/auth/pages/SignUpPage/components/Loader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const FIELD_OF_STUDY_OPTIONS = [
  "מדעי המחשב",
  "הנדסת תוכנה",
  "מערכות מידע",
  "אחר",
];
const SCHOOL_YEAR_OPTIONS = ["א'", "ב'", "ג'", "ד'"];
const EXPERIENCE_OPTIONS = ["כן", "לא"];
const PREFERRED_DATE_OPTIONS = ["09.11.2025", "13.11.2025"];

const SortRegistrationPage = () => {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    fieldOfStudy: "",
    schoolYear: "",
    experience: "",
    experienceDetails: "",
    preferredDate: "", 
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();

  const setVal = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const next = {
      fullName: !Validators.validateName(form.fullName),
      email: !Validators.validateEmail(form.email),
      phoneNumber: !Validators.validatePhone(form.phoneNumber),
      fieldOfStudy: !form.fieldOfStudy,
      schoolYear: !form.schoolYear,
      experience: !form.experience,
      preferredDate: !form.preferredDate,
      
      experienceDetails:
        form.experience === "כן"
          ? !(
              form.experienceDetails && form.experienceDetails.trim().length > 1
            )
          : false,
    };
    setErrors(next);
    
    return !Object.values(next).some(Boolean);
  };

  const onSubmit = async () => {
    if (!validate()) {
      toast.error("יש שדות חסרים או שגויים");
      return;
    }
    setLoading(true);
    const ok = await sortRegistrationService.create({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      fieldOfStudy: form.fieldOfStudy,
      schoolYear: form.schoolYear,
      experience: form.experience === "כן" ? "p" : "n", 
      experienceDetails:
        form.experience === "כן" ? (form.experienceDetails ?? "").trim() : "",
      preferredDate: form.preferredDate, 
    });
    setLoading(false);
    if (ok) setOpenModal(true);
  };

  const goHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <EntranceAnimation>
      <Container
        maxWidth="md"
        sx={{ paddingTop: "3rem", paddingBottom: "3rem" }}
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
          <span className={css["text-yellow"]}>הרשמה</span> ליום מיון
        </Typography>

        <Box
          sx={{
            backgroundColor: "#0a0a1b",
            padding: { lg: "20px 80px 20px 80px" },
            borderRadius: "10px",
            border: "1px solid #1F1F53",
          }}
        >
          <Loader loading={loading} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <FormInputField
              label="Full Name (English)"
              name=""
              onChange={(e) => setVal("fullName", e.target.value)}
              error={errors.fullName}
            />
            <FormInputField
              label="Email"
              type="email"
              email=""
              onChange={(e) => setVal("email", e.target.value)}
              error={errors.email}
            />
            <FormInputField
              label="Phone"
              onChange={(e) => setVal("phoneNumber", e.target.value)}
              error={errors.phoneNumber}
            />
            <FormSelectField
              label="Field of Study"
              options={FIELD_OF_STUDY_OPTIONS}
              onChange={(e) => setVal("fieldOfStudy", e.target.value)}
              error={errors.fieldOfStudy}
            />
            <FormSelectField
              label="School Year"
              options={SCHOOL_YEAR_OPTIONS}
              onChange={(e) => setVal("schoolYear", e.target.value)}
              error={errors.schoolYear}
            />
            <FormSelectField
              label="Preferred Date"
              options={PREFERRED_DATE_OPTIONS}
              onChange={(e) => setVal("preferredDate", e.target.value)}
              error={errors.preferredDate}
            />
            <FormSelectField
              label="Experience"
              options={EXPERIENCE_OPTIONS}
              onChange={(e) => setVal("experience", e.target.value)}
              error={errors.experience}
            />

            {form.experience === "כן" && (
              <FormInputField
                label="Experience Details"
                onChange={(e) => setVal("experienceDetails", e.target.value)}
                error={errors.experienceDetails}
              />
            )}
          </Box>

          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12} md={6}>
              <TransitionsModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={"נרשמת ליום המיון בהצלחה!"}
                closeOnOverlay={false}
                btnText="מעבר לדף הבית"
                btnOnClick={goHome}
                btnSize="small"
                btnSx={{ padding: '6px 14px', fontSize: '0.9rem' }}
              >
                <Typography
                  variant="p"
                  component="p"
                  sx={{
                    textAlign: "right",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  מוזמנים להצטרף לקבוצת הוואטסאפ שלנו{" "}
                  <a
                    style={{
                      textDecoration: "underline",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    href={process.env.REACT_APP_WHATSAPP_GROUP}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    לחץ כאן
                  </a>
                </Typography>

                <Typography
                  variant="p"
                  component="p"
                  sx={{
                    textAlign: "right",
                    display: "block",
                    marginBottom: "1rem",
                    marginTop: 0,
                  }}
                >
                  אם עדיין לא נרשמת לאתר{" "}
                  <Link
                    to="/signup"
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "40px",
                }}
              >
                <ArrowButton onClick={onSubmit}>Submit</ArrowButton>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </EntranceAnimation>
  );
};

export default SortRegistrationPage;
