import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';



const AdminPage = () => {
  const items = [
    getItem('Người Dùng', 'user', <UserOutlined />),
    getItem('Sản Phẩm', 'product', <AppstoreOutlined />),
  ];
  
  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) => {
    switch(key) {
      case 'user':
        return (
          <AdminUser/>
        )
      case 'product':
        return (
          <AdminProduct/>
        )
      default:
        return <></>
    }
  }

  const handleOnClick = ({key}) => {
    setKeySelected(key)
  }

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart/>
        <div style={{display: 'flex'}}>
          <Menu
          mode="inline"
          style={{
            width: 256,
            background: '#F0F8FF',
            boxshadow: '1px 1px 2px rgb(146, 85, 253)',
            height: '1000px'
          }}
          items={items}
          onClick={handleOnClick}
          />
          <div style={{flex: 1, padding: '15px'}}>
            {renderPage(keySelected)}
          </div>
        </div>
    </>
  )
}

export default AdminPage
