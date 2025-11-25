import React, { useState } from 'react';
import { useSignUpMutation } from '../../store/api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/common.css"
import "../../assets/css/main.css"
import "../../assets/css/responsive.css"

import Shape1 from "../../assets/images/shape1.svg"
import Shape2 from "../../assets/images/shape2.svg"
import Shape3 from "../../assets/images/shape3.svg"
import Google from "../../assets/images/google.svg"
import Logo from "../../assets/images/logo.svg"
import RegistrationImg from "../../assets/images/registration.png"
import DarkShape from "../../assets/images/dark_shape.svg"
import DarkShape1 from "../../assets/images/dark_shape1.svg"
import DarkShape2 from "../../assets/images/dark_shape2.svg"
import Registration1 from "../../assets/images/registration1.png"


const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUp, { isLoading, error }] = useSignUpMutation();


  const handleGoogleSignUp = () => {
    console.log('Google sign-up clicked');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to terms & conditions');
      return;
    }
    try {
      const result = await signUp({
        firstName: `${firstName} `,
        lastName: `${lastName}`,
        email,
        password,
      }).unwrap();
      console.log('Sign-up successful:', result);
      dispatch(setCredentials({ user: result.user, token: result.token }));
      // Navigate to feed after successful registration
      navigate('/');
    } catch (err) {
      console.error('Sign-up failed:', err);
    }
  };

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout" style={{ paddingTop: '0px' }}>
        <section className="_social_registration_wrapper">
          <div className="_shape_one">
            <img src={Shape1} alt="" className="_shape_img" />
            <img src={DarkShape} alt="" className="_dark_shape" />
          </div>
          <div className="_shape_two">
            <img src={Shape2} alt="" className="_shape_img" />
            <img src={DarkShape1} alt="" className="_dark_shape _dark_shape_opacity" />
          </div>
          <div className="_shape_three">
            <img src={Shape3} alt="" className="_shape_img" />
            <img src={DarkShape2} alt="" className="_dark_shape _dark_shape_opacity" />
          </div>
        <div className="_social_registration_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_registration_right">
                  <div className="_social_registration_right_image">
                    <img src={RegistrationImg} alt="Image" />
                  </div>
                  <div className="_social_registration_right_image_dark">
                    <img src={Registration1} alt="Image" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_registration_content">
                  <div className="_social_registration_right_logo _mar_b28">
                    <img src={Logo} alt="Image" className="_right_logo" />
                  </div>
                  <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                  <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                  <button type="button" className="_social_registration_content_btn _mar_b40" onClick={handleGoogleSignUp}>
                    <img src={Google} alt="Image" className="_google_img" /> 
                    <span>Register with google</span>
                  </button>
                  <div className="_social_registration_content_bottom_txt _mar_b40">
                    <span>Or</span>
                  </div>

                  {error && (
                    <div className="alert alert-danger _mar_b40" role="alert">
                      {typeof error === 'object' && 'data' in error ? (error.data as any)?.message || 'Sign-up failed' : 'Sign-up failed'}
                    </div>
                  )}

                  <form className="_social_registration_form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8" htmlFor="firstName">First Name</label>
                          <input 
                            id="firstName"
                            type="text" 
                            className="form-control _social_registration_input" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8" htmlFor="lastName">Last Name</label>
                          <input 
                            id="lastName"
                            type="text" 
                            className="form-control _social_registration_input" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8" htmlFor="email">Email</label>
                          <input 
                            id="email"
                            type="email" 
                            className="form-control _social_registration_input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8" htmlFor="password">Password</label>
                          <input 
                            id="password"
                            type="password" 
                            className="form-control _social_registration_input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_registration_form_input _mar_b14">
                          <label className="_social_registration_label _mar_b8" htmlFor="repeatPassword">Repeat Password</label>
                          <input 
                            id="repeatPassword"
                            type="password" 
                            className="form-control _social_registration_input" 
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                        <div className="form-check _social_registration_form_check">
                          <input 
                            className="form-check-input _social_registration_form_check_input" 
                            type="checkbox" 
                            id="agreeTerms" 
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                          />
                          <label className="form-check-label _social_registration_form_check_label" htmlFor="agreeTerms">
                            I agree to terms & conditions
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                        <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                          <button 
                            type="submit" 
                            className="_social_registration_form_btn_link _btn1"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Registering...' : 'Register now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_bottom_txt">
                        <p className="_social_registration_bottom_txt_para">
                          Already have an account? <Link to="/login">Login here</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
};

export default Registration;