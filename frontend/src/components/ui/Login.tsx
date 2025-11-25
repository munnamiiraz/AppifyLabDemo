import React, { useState } from "react";
import { useSignInMutation } from "../../store/api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

import "../../assets/css/bootstrap.min.css"
import "../../assets/css/common.css"
import "../../assets/css/main.css"
import "../../assets/css/responsive.css"

import Shape1 from "../../assets/images/shape1.svg"
import Shape2 from "../../assets/images/shape2.svg"
import Shape3 from "../../assets/images/shape3.svg"
import Google from "../../assets/images/google.svg"
import Logo from "../../assets/images/logo.svg"
import LoginImg from "../../assets/images/login.png"
import DarkShape from "../../assets/images/dark_shape.svg"
import DarkShape1 from "../../assets/images/dark_shape1.svg"
import DarkShape2 from "../../assets/images/dark_shape2.svg"


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signIn, { isLoading, error }] = useSignInMutation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn({ email, password }).unwrap();
      console.log('Sign-in successful:', result);
      dispatch(setCredentials({ user: result.user, token: result.token }));
      // Navigate to feed after successful login
      navigate('/');
    } catch (err) {
      console.error('Sign-in failed:', err);
    }
  };

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout" style={{ paddingTop: '0px' }}>
        <section className="_social_login_wrapper">
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

          <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src={LoginImg} alt="Login illustration" className="_left_img" />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src={Logo} alt="Logo" className="_left_logo" />
                </div>

                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>

                <button type="button" className="_social_login_content_btn _mar_b40">
                  <img src={Google} alt="Google" className="_google_img" /> <span>Or sign-in with google</span>
                </button>

                <div className="_social_login_content_bottom_txt _mar_b40"> <span>Or</span>
                </div>

                {error && (
                  <div className="alert alert-danger _mar_b40" role="alert">
                    {typeof error === 'object' && 'data' in error ? (error.data as any)?.message || 'Sign-in failed' : 'Sign-in failed'}
                  </div>
                )}

                <form className="_social_login_form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8" htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control _social_login_input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8" htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control _social_login_input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="form-check _social_login_form_check">
                        {/* converted to checkbox for proper semantics */}
                        <input
                          className="form-check-input _social_login_form_check_input"
                          type="checkbox"
                          id="rememberMe"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label className="form-check-label _social_login_form_check_label" htmlFor="rememberMe">Remember me</label>
                      </div>
                    </div>

                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_left">
                        <p className="_social_login_form_left_para" onClick={() => alert('Redirect to forgot-password flow')}>Forgot password?</p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button 
                          type="submit" 
                          className="_social_login_form_btn_link _btn1"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Logging in...' : 'Login now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">Dont have an account? <Link to="/register">Create New Account</Link>
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

export default Login;
