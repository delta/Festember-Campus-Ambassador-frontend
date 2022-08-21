import React, { useEffect, useState, SyntheticEvent } from 'react';
import axios from 'axios';
import * as emailValidator from 'email-validator';
import {
  Autocomplete,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { InputContainer, DropDownContainer } from './FormComponents';
import { StyledButton } from '../../theme';
import styles from './styles.module.css';
import Toast from '../Toast';
import { BACKEND_URL } from '../../../config/config';
import { FormProps, CollegeObject } from './types';
import {
  GenderList,
  StreamList,
  YearOfStudyList,
  interestsList,
  convertDateFormat,
} from './formUtils';

export default function RegisterForm({
  isRegistered,
  handleRegister,
}: FormProps) {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [collegeData, setCollegeData] = useState<CollegeObject[]>([
    { id: 0, college_name: 'Other' },
  ]);
  const [collegeId, setCollegeId] = useState<Number>(-1);
  const [collegeState, setCollegeState] = useState<string>('');
  const [collegeCity, setCollegeCity] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('');
  const [dob, setDob] = useState<Date | null>(new Date(Date.now()));
  const [stream, setStream] = useState<string>(StreamList[0]);
  const [gender, setGender] = useState<string>(GenderList[0]);
  const [YearOfStudy, setYearOfStudy] = useState<string>(YearOfStudyList[0]);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');
  const [userInstagramLink, setUserInstagramLink] = useState<string>('');
  const [userTwitterLink, setUserTwitterLink] = useState<string>('');
  const [userFacebookLink, setUserFacebookLink] = useState<string>('');
  const [userLinkedInLink, setUserLinkedInLink] = useState<string>('');
  const [userInterests, setUserInterests] = useState(interestsList);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success',
  );

  useEffect(() => {
    const getCollegeData = async () => {
      await axios({
        method: 'get',
        url: `${BACKEND_URL}/colleges`,
      })
        .then(response => {
          const fetchedColleges = collegeData.concat(response.data.message);
          setCollegeData(fetchedColleges);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getCollegeData();
  }, []);

  const handleToastClose = (
    event?: SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const validateForm = () => {
    const requiredFields = [userName, userEmail, mobileNumber];
    if (collegeId === 0) {
      requiredFields.push(collegeName, collegeState, collegeCity);
    }
    if (requiredFields.includes('') || collegeId === -1) {
      setToastOpen(true);
      setToastMessage('Please fill all required fields');
      setToastSeverity('error');
      return false;
    } else if (!emailValidator.validate(userEmail)) {
      setToastOpen(true);
      setToastMessage('Please enter a valid Email Id');
      setToastSeverity('error');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    let convertedDate = convertDateFormat(dob);
    let userInterestsArr = [];
    for (const interest in userInterests) {
      if (userInterests[interest]) userInterestsArr.push(interest);
    }

    await axios
      .post(`${BACKEND_URL}/crew/register`, {
        user_name: userName,
        user_email: userEmail,
        user_other_college: collegeId === 0 ? 1 : 0,
        user_college_id: collegeId,
        user_college_state: collegeState,
        user_college_name: collegeName,
        user_college_city: collegeCity,
        user_date_of_birth: convertedDate,
        user_gender: gender,
        user_stream: stream,
        user_year_of_study: YearOfStudy,
        user_mobile_number: mobileNumber,
        user_insta_link: userInstagramLink,
        user_facebook_link: userFacebookLink,
        user_twitter_link: userTwitterLink,
        user_linkedin_link: userLinkedInLink,
        user_interests: userInterestsArr,
      })
      .then(res => {
        console.log(res.data);
        handleRegister();
        setToastOpen(true);
        setToastMessage('Successfully Registered!');
        setToastSeverity('success');
      })
      .catch(err => {
        console.log(err);
        setToastOpen(true);
        setToastMessage('Oops! Something went wrong!');
        setToastSeverity('error');
      });
  };

  return (
    <>
      <div className={styles.formContainer}>
        <InputContainer
          inputLabel="Name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          isRequired={true}
        />
        <InputContainer
          inputLabel="Email"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
          isRequired={true}
        />
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>College Name*</div>
          <Autocomplete
            style={{ width: "inherit" }}
            onChange={(event, value) => {
              let selectedCollege = collegeData.find(
                college => college.college_name === value,
              );
              if (selectedCollege) {
                setCollegeId(selectedCollege.id);
              } else {
                setCollegeId(-1);
              }
            }}
            options={collegeData.map(option => option.college_name)}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} />}
          />
        </div>
        {collegeId === 0 ? (
          <>
            <InputContainer
              inputLabel="College Name"
              value={collegeName}
              onChange={e => setCollegeName(e.target.value)}
              isRequired={true}
            />
            <InputContainer
              inputLabel="College City"
              value={collegeCity}
              onChange={e => setCollegeCity(e.target.value)}
              isRequired={true}
            />
            <InputContainer
              inputLabel="College State"
              value={collegeState}
              onChange={e => setCollegeState(e.target.value)}
              isRequired={true}
            />
          </>
        ) : (
          ''
        )}
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>Date of birth</div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={dob}
              onChange={newValue => setDob(newValue)}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <DropDownContainer
          inputLabel="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
          dropDownList={GenderList}
        />
        <DropDownContainer
          inputLabel="Stream"
          value={stream}
          onChange={e => setStream(e.target.value)}
          dropDownList={StreamList}
        />
        <DropDownContainer
          inputLabel="Year of Study"
          value={YearOfStudy}
          onChange={e => setYearOfStudy(e.target.value)}
          dropDownList={YearOfStudyList}
        />
        <InputContainer
          inputLabel="Mobile Number"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
          isRequired={true}
        />
        <InputContainer
          inputLabel="Referral Code"
          value={referralCode}
          onChange={e => setReferralCode(e.target.value)}
          isRequired={false}
        />
        <div className={styles.socialProfiles}>Social Media Profiles: </div>
        <InputContainer
          inputLabel="Instagram Link"
          value={userInstagramLink}
          onChange={e => setUserInstagramLink(e.target.value)}
          isRequired={false}
        />
        <InputContainer
          inputLabel="Facebook Link"
          value={userFacebookLink}
          onChange={e => setUserFacebookLink(e.target.value)}
          isRequired={false}
        />
        <InputContainer
          inputLabel="Twitter Link"
          value={userTwitterLink}
          onChange={e => setUserTwitterLink(e.target.value)}
          isRequired={false}
        />
        <InputContainer
          inputLabel="LinkedIn Link"
          value={userLinkedInLink}
          onChange={e => setUserLinkedInLink(e.target.value)}
          isRequired={false}
        />
        <div className={styles.inputContainer}>
          <div className={styles.inputLabel}>Interests</div>
          <div className={styles.interestOptionsContainer}>
            {Object.keys(userInterests).map(interest => (
              <div
                className={userInterests[interest] ? styles.interestOption : ''}
                onClick={() => {
                  setUserInterests({
                    ...userInterests,
                    [interest]: !userInterests[interest],
                  });
                }}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
        <StyledButton
          className={styles.submitButton}
          variant="contained"
          onClick={handleFormSubmit}
        >
          Submit
        </StyledButton>
      </div>
      <Toast
        toastOpen={toastOpen}
        toastMessage={toastMessage}
        toastSeverity={toastSeverity}
        handleToastClose={handleToastClose}
      />
    </>
  );
}
