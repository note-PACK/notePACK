import { store } from '../redux/store.js';
import { loadCategories } from '../redux/userDataSlice.js';

// dataInput to be replaced by actual response from backend
// const dataInput = {
//   'To Do': ['pay bills', 'pick up kids from school', 'do laundry'],
//   'Important Dates': [
//     "Dad's Birthday on Friday",
//     "Suzy's Recital tomorrow",
//     'Dentist Appt. 03/22',
//   ],
//   'Phone Numbers': [
//     "Nancy's Pizza: 516-555-1212",
//     "Honest Don's Car Repair: 718-555-1212",
//   ],
//   Credentials: [
//     'Facebook login: scatman pass: SkiBaB0pBaD0pB0p',
//     'Yahoo login: scatmaN pass: redux5x23',
//   ],
// };

export const getCategories = (dataInput) => {
  // add in fetch request to backend
  store.dispatch(loadCategories(dataInput));
};
