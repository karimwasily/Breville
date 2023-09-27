const Validation = {
  phoneOptional: {
    pattern: { value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, message: "Please enter valid phone number"},
    minLength: { value: 10, message: "Phone number must be 10 characters long" },
    maxLength: { value: 10, message: "Phone number must be 10 characters long" },
  },
  zipCode: {
    required: 'Please enter your zip code',
    minLength: { value: 4, message: 'Zip code must be between 4 and 5 characters long' },
    maxLength: { value: 5, message: 'Zip code must be between 4 and 5 characters long' }
  },
  address: {
    required: 'Please enter your address',
    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?!.*[^A-Za-z0-9\-#\.\/ ])/, message: 'Please enter valid address' },
    maxLength: { value: 150, message: 'Address must be less than 150 characters long' }
  },
  name: {
    required: 'Please enter your name',
    pattern: { value: /^[a-z ,.'-]+$/i, message: 'Please enter valid name' },
    maxLength: { value: 30, message: 'Name must be less than 30 characters long' }
  },
  firstName: {
    required: 'Please enter your first name',
    pattern: { value: /^[a-z ,.'-]+$/i, message: 'Please enter valid first name' },
    maxLength: { value: 30, message: 'First name must be less than 30 characters long' }
  },
  lastName: {
    required: 'Please enter your last name',
    pattern: { value: /^[a-z ,.'-]+$/i, message: 'Please enter valid last name' },
    maxLength: { value: 30, message: 'Last name must be less than 30 characters long' }
  },
  phone: {
    required: 'Please enter your phone number',
    pattern: { value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, message: 'Please enter valid phone number'},
    minLength: { value: 10, message: 'Phone number must be 10 characters long' },
    maxLength: { value: 10, message: 'Phone number must be 10 characters long' },
  },
  email: {
    required: 'Please enter your email',
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Please enter valid email'
    }
  },
  city: {
    required: 'Please enter your city/town',
    pattern: { value: /^[a-z ,.'-]+$/i, message: 'Please enter valid city/town' }
  },
  password: {
    required: 'Please enter your password',
    minLength: { value: 6 }, // Minimum 6 Characters and 1 Number
    pattern: { value: /^(?=\D*\d)\S{6,}$/, message: 'Password must be minimum 6 characters including number' }
  },
  repeatPassword: {
    required: 'Please confirm your password',
    confirmMatch: 'Passwords should match',
  }
};

export default Validation;
