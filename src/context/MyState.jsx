import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import { fireDB } from '../firebase/FirebaseConfig'
import MyContext from './MyContext'
import toast from 'react-hot-toast'

const MyState = ({children}) => {
    const name = "king shabeeeb"
    const[loading,setLoading]=useState(false)

    const [getAllProduct,setGetAllProduct]=useState([])

    const getAllproductFunction=async()=>{
      setLoading(true)
      try {
        const q=query(
          collection(fireDB,'products'),
          orderBy('time')
        );
        const data=onSnapshot(q,(QuerySnapshot)=>{
          let productArray=[];
          QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data(),id:doc.id});
          });
          setGetAllProduct(productArray);
          setLoading(false)
        });
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }

    const [getAllOrder,setGetAllOrder]=useState([]);

    const getAllOrderFunction=()=>{
      setLoading(true)
      try {

        const q=query(
          collection(fireDB,'order'),
          orderBy('time')
        )

        const data=onSnapshot(q,(QuerySnapshot)=>{
          let orderArray=[];
          QuerySnapshot.forEach((doc)=>{
            orderArray.push({...doc.data(),id:doc.id});
          });
          setGetAllOrder(orderArray);
          setLoading(false)
        });
        return ()=>data;
        
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    //delete order fn

    const orderDelete=async(id)=>{
      setLoading(true)
      try {
        await deleteDoc(doc(fireDB,'order',id))
        toast.success('order deleted successfully')
        getAllOrderFunction()
        setLoading(flse)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    //get all user fn

    const [getAllUser,setGetAllUser]=useState([]);

    const getAllUserFunction = async () => {
      setLoading(true);
      try {
          const q = query(
              collection(fireDB, "user"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let userArray = [];
              QuerySnapshot.forEach((doc) => {
                  userArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllUser(userArray);
              setLoading(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  }

    useEffect(()=>{
      getAllproductFunction();
      getAllOrderFunction();
      getAllUserFunction();
    },[])
  return (
    <MyContext.Provider value={{
          loading,
          setLoading,
          getAllProduct,
          getAllproductFunction,
          getAllOrder,
          orderDelete,
          getAllUser,

    }}>
        {children}
    </MyContext.Provider>
      )
}

export default MyState