import * as Yup from 'yup';

const SchemaValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too short!')
    .max(50, 'Too long')
    .required('Required'),
});

export default SchemaValidation;
