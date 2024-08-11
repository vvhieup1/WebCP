import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperProducts, WrapperButtonMore, WrapperTypeProduct, CustomContainer, CustomRowType, CustomColType, CustomRowSlider, CustomRowProduct, CustomColProduct } from "./style";
import "./style.css";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import Slider1 from '../../assets/images/Slider1.jpg'
import Slider2 from '../../assets/images/Slider2.jpg'
import Slider3 from '../../assets/images/Slider3.jpg'
import Slider4 from '../../assets/images/Slider4.jpg'
import Slider5 from '../../assets/images/Slider5.jpg'
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService"
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import ContactAndAboutUs from "../../components/ContactAndAboutUs/ContactAndAboutUs";


const HomePage = () => {
    const seacrhProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(seacrhProduct, 1000)
    const [loading] = useState(false)
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK') {
            setTypeProducts(res?.data)
        }     
    }

    const {isLoading, data: products, isPreviousData} = useQuery(['products', limit, searchDebounce], fetchProductAll, {retry: 3, retryDelay: 1000, keepPreviousData: true})

    useEffect(() => {
        fetchAllTypeProduct()
        
    }, [])



    return (
        <Loading isLoading={isLoading || loading}>

<div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item}/>
            )
          })}
        </WrapperTypeProduct>
      </div>

            <CustomContainer >
                <CustomRowSlider style={{marginTop: '10px'}}>
                    <SliderComponent arrImages={[Slider1, Slider2, Slider3, Slider4, Slider5]} />
                </CustomRowSlider>
            </CustomContainer>

            <CustomContainer style={{marginTop: '50px', alignContent:'center'}}>
                <CustomRowProduct >   
                    {products?.data?.map((product) => {
                        return (
                        <CardComponent
                            key={product._id}
                            id={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            discount={product.discount}
                            selled={product.selled}
                        />
                        )

                    })}
                </CustomRowProduct>
            </CustomContainer>

            <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop: '10px', marginBottom: '50px'}}>
                
                <WrapperButtonMore 
                    textButton={isPreviousData ? 'Load more': "Xem Thêm"} 
                    type="outline" 
                    styleButton={{
                        border: `1px solid rgb(11,116,229)`,
                        color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`, 
                        width: '240px', 
                        height: '38px',
                        borderRadius: '4px'
                }}
                
                    disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                    styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                    onClick={() => setLimit((prev) => prev + 6)}
                />
            </div>
                        
            <ContactAndAboutUs />             
                        
        </Loading>   
    )
}

export default HomePage