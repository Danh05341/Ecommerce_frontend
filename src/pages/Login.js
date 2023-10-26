import { BiShow, BiHide } from 'react-icons/bi'
import loginSignupImage from '../assets/images/login-animation.gif'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice.js'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
        const { email, password } = dataForm
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/users/login`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },  
                body: JSON.stringify(dataForm)
            })
            const dataRes = await fetchData.json()
            if(dataRes.data) {
                alert("successful")
                dispatch(loginRedux(dataRes))
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
            else{
                //Có lưu ý gì khi sử dụng, Xem lại f8 thử
                setTimeout(() => {
                    alert(dataRes.message)
                }, 1000)
            }
        }
        else {
            alert("Please enter required fields")
        }
    }
    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
                <div className='w-20 overflow-hidden rounded-full shadow-md drop-shadow-md flex m-auto'>
                    <img className='w-full' src={loginSignupImage} alt='loginSignupImage'></img>
                </div>

                <form className='w-full py-3 flex flex-col justify-center' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={dataForm.email} onChange={handleOnChange} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={dataForm.password} onChange={handleOnChange} className=' w-full bg-slate-200 border-none outline-none' />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button type='submit' className='max-w-[150px] w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium py-1 rounded-full mt-4'>
                        Login
                    </button>
                </form>
                <p className='text-left text-sm mt-3'>
                    Don't have account ?{" "}
                    <Link to='/signup' className='text-red-500 underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login