import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogo  from '../../assets/images/login.png'
import imageGoogle  from '../../assets/images/google.png'
import { Button, Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message'


const SignUpPage = () =>{
  const navigate = useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  )

  const {data, isLoading, isSuccess} = mutation
  useEffect(() => {
    if (isSuccess && data?.status == 'OK') {
      message.success('Đăng ký thành công')
      handleNavigateSignIn()
    } else if (data?.status == 'ERR') {
      message.error()
    }
  }, [isSuccess])
  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }
  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
  }

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
        <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
            <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>Đăng nhập vào tạo tài khoản </p>
            <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" 
              value={email} onChange={handleOnchangeEmail} />
            <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword} />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
            <ButtonComponent
                disabled={!email.length || !password.length || !confirmPassword.length}
                onClick={handleSignUp}
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '4px',
                  margin: '26px 0 10px'
                }}
                textButton={'Đăng ký'}
                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
            </ButtonComponent>
            <p style={{textAlign: 'center', fontSize: '15px'}}>or</p>
            <Button style={{width: '100%', height: '40px', fontWeight: '500', outline: 'none'}} onClick={googleAuth}>
              <Image src= {imageGoogle} alt="google-icon" height="20px" width="20px" />
                <span style={{margin: '0 5px'}}>Sign up with Google</span>
            </Button>
          </Loading>
                <p>Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
            </WrapperContainerLeft>
            <WrapperContainerRight>
            <Image src= {imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
            <h4>Mua sắm tại webphone</h4>
            </WrapperContainerRight>
        </div>
        </div>
    )
}

export default SignUpPage