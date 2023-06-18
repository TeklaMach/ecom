import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email: values.email,
          password: values.password,
        });
        const { token } = response.data; // Assuming the token is returned in the response

        // Save the token to local storage or session storage
        localStorage.setItem('token', token);

        console.log('Login successful!');
        // Redirect the user to the ShopAll page
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        setLoginError('Invalid email or password');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Login
        </Typography>
        <Box sx={{ mt: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            />
            {loginError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/registration" underline="none">
              Register Here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
