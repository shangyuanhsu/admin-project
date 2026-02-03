import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { loginSuccess } from '../authSlice';
import { loginWithCredentials } from '../api/auth';
import styles from './Login.module.css';

/**
 * Login Feature Component
 * 
 * Represents the main login screen of the application.
 * Manages form state, validation, API integration, and Redux state updates.
 */
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    account: '',
    password: '',
    captcha: ''
  });

  // Redirect if already authenticated
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [errors, setErrors] = useState({
    account: '',
    password: '',
    captcha: ''
  });

  /**
   * Handle input field changes.
   * Updates state and clears error message for the specific field being edited.
   * 
   * @param e - The change event from the input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Handle form submission.
   * Validates all required fields are filled. If valid, proceeds with login logic (API + Redux).
   * 
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation mock
    const newErrors = { account: '', password: '', captcha: '' };
    let hasError = false;

    if (!formData.account) {
      newErrors.account = 'Please enter your account';
      hasError = true;
    }
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
      hasError = true;
    }
    if (!formData.captcha) {
      newErrors.captcha = 'Verification code required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      // 1. Call API
      const response = await loginWithCredentials({
        account: formData.account,
        password: formData.password
      });

      // 2. Dispatch to Redux Store
      dispatch(loginSuccess({
        token: response.token,
        user: response.user,
        menus: response.menus
      }));

      // 3. Navigate to Dashboard
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Login failed', error);
      // In a real app, you would set a global error message or field error here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>AdminPortal</div>
      </header>

      <main className={styles.content}>
        <div className={styles.formCard}>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>Please sign in to continue</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              title="Account"
              name="account"
              placeholder="Enter your account"
              value={formData.account}
              onChange={handleChange}
              isError={!!errors.account}
              errorMessage={errors.account}
            />

            <Input
              title="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              isError={!!errors.password}
              errorMessage={errors.password}
            />

            <div className={styles.captchaRow}>
              <div className={styles.captchaInput}>
                <Input
                  title="Verification Code"
                  name="captcha"
                  placeholder="1234"
                  value={formData.captcha}
                  onChange={handleChange}
                  isError={!!errors.captcha}
                  errorMessage={errors.captcha}
                />
              </div>
              <div className={styles.captchaVisual} title="Click to refresh">
                8392
              </div>
            </div>

            <div className={styles.actions}>
              <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
            </div>

            <Button 
              type="submit" 
              size="full" 
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Log In'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};
