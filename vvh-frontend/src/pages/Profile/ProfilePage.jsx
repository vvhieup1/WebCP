import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'



const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const {id, access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
    )
    const dispatch = useDispatch()
    const {data, isLoading, isSuccess, isError} = mutation

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])
    
    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if(isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePhone = (value) => {
        setPhone(value)
    }

    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () => {
        mutation.mutate({id: user?.id, name, email, phone, address, avatar, access_token: user?.access_token})
    }
  return (
    <div style={{width: '1270px', margin: '0 auto', height: '600px'}}>
      <WrapperHeader>THÔNG TIN NGƯỜI DÙNG</WrapperHeader>
      <Loading isLoading={isLoading}>
        <WrapperContentProfile>
            <WrapperInput>
                <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                <InputForm style={{width: '300px'}} id='name' value={name} onChange={handleOnchangeName}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                        background: 'rgb(146, 85, 253)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        padding: '2px 6px 6px',
                        marginLeft: '35px'
                    }}
                    textButton={'Cập nhật'}
                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>
                </ButtonComponent>
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                <InputForm style={{width: '300px'}} id='email' value={email} onChange={handleOnchangeEmail}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                        background: 'rgb(146, 85, 253)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        padding: '2px 6px 6px',
                        marginLeft: '35px'
                    }}
                    textButton={'Cập nhật'}
                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>
                </ButtonComponent>
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                <InputForm style={{width: '300px'}} id='phone' value={phone} onChange={handleOnchangePhone}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                        background: 'rgb(146, 85, 253)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        padding: '2px 6px 6px',
                        marginLeft: '35px'
                    }}
                    textButton={'Cập nhật'}
                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>
                </ButtonComponent>
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                <InputForm style={{width: '300px'}} id='address' value={address} onChange={handleOnchangeAddress}/>
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                        background: 'rgb(146, 85, 253)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        padding: '2px 6px 6px',
                        marginLeft: '35px'
                    }}
                    textButton={'Cập nhật'}
                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>
                </ButtonComponent>
            </WrapperInput>

            <WrapperInput>
                <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                    <Button icon={<UploadOutlined />} style={{marginLeft: '20px'}}>Chọn ảnh</Button>
                </WrapperUploadFile>
                {avatar && (
                    <img src={avatar} style={{
                        height: '60px',
                        width: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginLeft: '10px'
                    }} alt="avatar"/>
                )}
                <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                        background: 'rgb(146, 85, 253)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        padding: '2px 6px 6px',
                        marginLeft: '45px'
                    }}
                    textButton={'Cập nhật'}
                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>
                </ButtonComponent>
            </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  )
}

export default ProfilePage
