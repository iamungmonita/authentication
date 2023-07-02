export default function login_validate(values) {
    const errors = {}
    if (!values.email) { 

        errors.email = 'Required';
   
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
   
        errors.email = 'Invalid email address';
   
      }

    if (!values.password) {
        errors.password = 'Required'
    }

    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'must be more than 8 and less than 20 characters long'
    }
    else if (values.password.includes(' ')) {
        errors.password = 'invalid password'
    }
    return errors
}


export  function register_validate(values) {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required';
    }
    else if (values.username.includes(' ')) {
        errors.username = 'invalid username'
    }

    if (!values.email) { 

        errors.email = 'Required';
   
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
   
        errors.email = 'Invalid email address';
   
      }

    if (!values.password) {
        errors.password = 'Required'
    }

    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'must be more than 8 and less than 20 characters long'
    }
    else if (values.password.includes(' ')) {
        errors.password = 'invalid password'
    }
    if (!values.cpassword) {
        errors.cpassword = 'Required'
    }

    else if (values.password !== values.cpassword) {
        errors.cpassword = 'password did not match'
    }
    else if (values.cpassword.includes(' ')) {
        errors.cpassword = 'invalid password'
    }
    return errors
}