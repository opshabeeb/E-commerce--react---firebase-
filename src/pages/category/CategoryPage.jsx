import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout';
import MyContext from '../../context/MyContext';
import { Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart,deleteFromCart } from '../../redux/cartSlice';

const CategoryPage = () => {
    const {categoryName}=useParams();
    
    const context=useContext(MyContext)
    const {loading,getAllProduct}=context

    const filterProduct=getAllProduct.filter((obj)=>obj.category.includes(categoryName))
    console.log('the filterd product are',filterProduct)

    const cartItems=useSelector((state)=>state.cart)
    const dispatch=useDispatch();

    const addCart=(item)=>{
        dispatch(addToCart(item))
        toast.success('item success fully added')
    }
    const deletecart=(item)=>{
        dispatch(deleteFromCart(item))
        toast.success('item success fully deleted from cart')
    }

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cartItems))
  }, [cartItems])
  
  return (
    <Layout>
        <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    {filterProduct.length >0 ?
                    <>
                    <div className="flex justify-center">
                        {loading && <Loader/>}
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {filterProduct.map((item, index) => {
                            const { id, title, price,productImageUrl } = item
                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img  onClick={()=>navigate(`/product-info/${id}`)} 
                                                className="lg:h-80  h-96 w-full"
                                                src={productImageUrl}
                                                alt="blog"
                                            />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                E-bharat
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                               {cartItems.some((p)=>p.id===item.id)?
                                                <button onClick={()=>deletecart(item)}
                                                 className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                Delete From Cart
                                            </button>  :
                                             <button  onClick={()=>addCart(item)}
                                             className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                             Add To Cart
                                         </button>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    </>
                         :
                         <div>
                                        <div className="flex justify-center">
                                            <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        </div>
                                        <h1 className=" text-black text-4xl font-bold text-center">No {categoryName} product found</h1>
                                    </div>
                                    }
                </div>
            </section>
    </Layout>
  )
}

export default CategoryPage