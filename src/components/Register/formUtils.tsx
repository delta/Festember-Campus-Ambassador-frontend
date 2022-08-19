export const GenderList = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export const StreamList = [
  'Engineering',
  'Medical',
  'Arts',
  'Commerce',
  'Design',
  'Architecture',
  'Management',
  'Other',
];
export const YearOfStudyList = [
  '1st year',
  '2nd year',
  '3rd year',
  '4th year',
  '5th year',
];

export const interestsList: { [key: string]: boolean } = {
  Music: false,
  Dance: false,
  Dramatics: false,
  'Literary Arts': false,
  'Fine Arts': false,
  Quizzing: false,
  'Design and Digital arts': false,
  Fashion: false,
  Gaming: false,
  Sports: false,
};

export function convertDateFormat(str: Date | null) {
  if (str == null) return null;
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}
