import { BiShow, BiHide } from 'react-icons/bi'
import loginSignupImage from '../assets/images/login-animation.gif'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../util/ImagetoBase64'
const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const [dataForm, setDataForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
    })

    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataForm((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const { firstName, email, password, confirmPassword } = dataForm
        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/users/signup`, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(dataForm)
                })
                const dataRes = await fetchData.json()
                if(dataRes.data) {
                    alert("successful")
                    navigate('/login')
                }
                else {
                    alert(dataRes.message)
                }
            }
            else {
                alert("password and confirm password not equals")
            }
        }
        else {
            alert("Please enter required fields")
        }
    }
    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    const handleConfirmShowPassword = () => {
        setConfirmShowPassword(prev => !prev)
    }
    const handleUploadProfileImage = async(e) => {
        const data = await ImagetoBase64(e.target.files[0])
        setDataForm(prev => {
            return {
                ...prev,
                image: data
            }
        })
    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
                <div className='w-20 h-20 overflow-hidden rounded-full shadow-md drop-shadow-md flex m-auto relative'>
                    <img className='w-full h-full' src={dataForm.image ? dataForm.image : loginSignupImage} alt='loginSignupImage'/>

                    <label htmlFor='profileImage'>
                        <div className='absolute left-0 bottom-0 right-0 h-1/3 bg-opacity-50 bg-slate-500 w-full text-center cursor-pointer'>
                            <p className='text-sm p-1 text-white'>Upload</p>
                        </div>
                        <input type='file' id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage}/>
                    </label>
                </div>

                <form className='w-full py-3 flex flex-col justify-center' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' name='firstName' value={dataForm.firstName} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' name='lastName' value={dataForm.lastName} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' />

                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={dataForm.email} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={dataForm.password} onChange={handleOnChange} className=' w-full bg-slate-200 border-none outline-none' />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>
                    <label htmlFor='confirmPassword'>ConfirmPassword</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' value={dataForm.confirmPassword} onChange={handleOnChange} className=' w-full bg-slate-200 border-none outline-none' />
                        <span className='flex text-xl cursor-pointer' onClick={handleConfirmShowPassword}>
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button type='submit' className='max-w-[150px] w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium py-1 rounded-full mt-4'>
                        Sign up
                    </button>
                </form>
                <p className='text-left text-sm mt-3'>Already have account ?{" "}
                    <Link to='/login' className='text-red-500 underline'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup