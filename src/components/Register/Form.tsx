import React, { useEffect, useState, SyntheticEvent } from 'react';
import axios from 'axios';
import * as emailValidator from 'email-validator';
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
  genderList,
  streamList,
  yearOfStudyList,
  interestsList,
  convertDateFormat,
} from './formUtils';

export default function RegisterForm({ handleRegister }: FormProps) {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userOtherCollege, setUserOtherCollege] = useState<boolean>(false);
  const [collegeData, setCollegeData] = useState<CollegeObject[]>([]);
  const [collegeId, setCollegeId] = useState<number>(-1);
  const [selectedCollege, setSelectedCollege] = useState<string>('');
  const [collegeState, setCollegeState] = useState<string>('');
  const [collegeCity, setCollegeCity] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('');
  const [dob, setDob] = useState<Date | null>(new Date(Date.now()));
  const [stream, setStream] = useState<string>(streamList[0]);
  const [gender, setGender] = useState<string>(genderList[0]);
  const [yearOfStudy, setYearOfStudy] = useState<string>(yearOfStudyList[0]);
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
          setCollegeData(response.data.message);
        })
        .catch(err => {
          console.log(err);
          setToastOpen(true);
          setToastMessage('Oops! Something went wrong!');
          setToastSeverity('error');
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
    if (userOtherCollege) {
      requiredFields.push(collegeName, collegeState, collegeCity);
    }
    if (
      requiredFields.includes('') ||
      (!userOtherCollege && collegeId === -1)
    ) {
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

    const convertedDate = convertDateFormat(dob);
    const userInterestsArr = [];
    for (const interest in userInterests) {
      if (userInterests[interest]) userInterestsArr.push(interest);
    }

    await axios
      .post(`${BACKEND_URL}/crew/register`, {
        user_name: userName,
        user_email: userEmail,
        user_other_college: userOtherCollege ? 1 : 0,
        user_college_id: collegeId,
        user_college_state: collegeState,
        user_college_name: collegeName,
        user_college_city: collegeCity,
        user_date_of_birth: convertedDate,
        user_gender: gender,
        user_stream: stream,
        user_year_of_study: yearOfStudy,
        user_mobile_number: mobileNumber,
        user_insta_link: userInstagramLink,
        user_facebook_link: userFacebookLink,
        user_twitter_link: userTwitterLink,
        user_linkedin_link: userLinkedInLink,
        user_interests: userInterestsArr,
      })
      .then(() => {
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
          <div className={styles.inputLabel}>Select your college*</div>
          <Autocomplete
            disabled={userOtherCollege}
            style={{
              width: 'inherit',
            }}
            onChange={(event, value) => {
              const userSelectedCollege = collegeData.find(
                college => college.college_name === value,
              );
              if (userSelectedCollege) {
                setSelectedCollege(userSelectedCollege.college_name);
                setCollegeId(userSelectedCollege.id);
              } else {
                setCollegeId(-1);
              }
            }}
            value={userOtherCollege ? '' : selectedCollege}
            options={collegeData.map(option => option.college_name)}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} />}
          />
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => setUserOtherCollege(!userOtherCollege)}
                style={{
                  color: '#fff',
                }}
              />
            }
            label={
              <span className={styles.inputLabel}>
                College name not in the list
              </span>
            }
          />
        </FormGroup>
        {userOtherCollege ? (
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
          <div className={styles.inputLabel}>Date of birth*</div>
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
          inputLabel="Gender*"
          value={gender}
          onChange={e => setGender(e.target.value)}
          dropDownList={genderList}
        />
        <DropDownContainer
          inputLabel="Stream*"
          value={stream}
          onChange={e => setStream(e.target.value)}
          dropDownList={streamList}
        />
        <DropDownContainer
          inputLabel="Year of Study*"
          value={yearOfStudy}
          onChange={e => setYearOfStudy(e.target.value)}
          dropDownList={yearOfStudyList}
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
                key={interest}
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
