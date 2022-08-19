import React from 'react';
import axios from 'axios';
import * as emailValidator from 'email-validator';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { InputContainer, DropDownContainer } from './FormComponents';
import { StyledButton } from '../../theme';
import styles from './styles.module.css';
import Toast from '../Toast';
import { BACKEND_URL } from '../../../config/config';
import { FormProps } from './types';
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
  const [userName, setUserName] = React.useState<string>('');
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [collegeState, setCollegeState] = React.useState<string>('');
  const [collegeCity, setCollegeCity] = React.useState<string>('');
  const [collegeName, setCollegeName] = React.useState<string>('');
  const [dob, setDob] = React.useState<Date | null>(new Date(Date.now()));
  const [stream, setStream] = React.useState<string>(StreamList[0]);
  const [gender, setGender] = React.useState<string>(GenderList[0]);
  const [YearOfStudy, setYearOfStudy] = React.useState<string>(
    YearOfStudyList[0],
  );
  const [mobileNumber, setMobileNumber] = React.useState<string>('');
  const [referralCode, setReferralCode] = React.useState<string>('');
  const [userInstagramLink, setUserInstagramLink] = React.useState<string>('');
  const [userTwitterLink, setUserTwitterLink] = React.useState<string>('');
  const [userFacebookLink, setUserFacebookLink] = React.useState<string>('');
  const [userLinkedInLink, setUserLinkedInLink] = React.useState<string>('');
  const [userInterests, setUserInterests] = React.useState(interestsList);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string>('');
  const [toastSeverity, setToastSeverity] = React.useState<'success' | 'error'>(
    'success',
  );

  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const validateForm = () => {
    const requiredFields = [
      userName,
      userEmail,
      collegeState,
      collegeCity,
      collegeName,
      mobileNumber,
    ];
    if (requiredFields.includes('')) {
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

    await axios({
      method: 'post',
      url: `${BACKEND_URL}/crew/register`,
      data: JSON.stringify({
        user_name: userName,
        user_email: userEmail,
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
      }),
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
        <InputContainer
          inputLabel="College State"
          value={collegeState}
          onChange={e => setCollegeState(e.target.value)}
          isRequired={true}
        />
        <InputContainer
          inputLabel="College City"
          value={collegeCity}
          onChange={e => setCollegeCity(e.target.value)}
          isRequired={true}
        />
        <InputContainer
          inputLabel="College Name"
          value={collegeName}
          onChange={e => setCollegeName(e.target.value)}
          isRequired={true}
        />
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
