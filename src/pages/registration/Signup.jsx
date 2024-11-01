/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context=useContext(MyContext);
    const{loading,setLoading}=context;

    const navigate=useNavigate()
     
    // user signup state
    const [userSignup,setUserSignup]=useState({
        name:'',
        email:'',
        password:'',
        role:'user'
    })
    // user signup fn

    const userSignupFunction=async()=>{
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }
        setLoading(true);
        try {
            const users=await createUserWithEmailAndPassword(auth,userSignup.email,userSignup.password)

            // create user obj
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }
            const userReference=collection(fireDB,'user')
            
            // add user detail
            addDoc(userReference,user)

            toast.success('signup successful')
            setLoading(false)
            navigate('/login')

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }
    return (
        <div className='flex justify-center items-center h-screen'>

            {loading && <Loader/>}
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                    value={userSignup.name}
                    onChange={(e)=>{
                        setUserSignup({...userSignup,
                            name:e.target.value})
                    }}
                        type="text"
                        placeholder='Full Name'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        value={userSignup.email}
                        onChange={(e)=>{
                            setUserSignup({...userSignup,
                                email:e.target.value})
                        }}
                        type="email"
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        value={userSignup.password}
                        onChange={(e)=>{
                            setUserSignup({...userSignup,
                                password:e.target.value})
                        }}
                        type="password"
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                    onClick={userSignupFunction}
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;