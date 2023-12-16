/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false)
    const { logIn, logInWithGoogle } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const location = useLocation();
    const navigate = useNavigate()

    let from = location.state?.from?.pathname || "/";
    console.log('location in the login page', from);

    const onSubmit = (data) => {
        logIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                if (result.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "User Logged In Successfully.",
                        icon: "success"
                    });
                    navigate(from, { replace: true })
                }
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    title: "Oh!",
                    text: `${error.message}`,
                    icon: "error"
                });
            })
    }

    const handleLogInWithGoogle = () => {
        logInWithGoogle()
        .then(result =>{
            console.log(result.user);
            if(result.user){
                Swal.fire({
                    title: "Success!",
                    text: "User Logged In Successfully.",
                    icon: "success"
                });
                navigate('/')
                console.log(result.user?.displayName, result.user?.email);
                const userInfo = {
                    name:result.user?.displayName,
                    email:  result.user?.email,
                    Badge: "Bronze"
                }
                axiosSecure.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                })
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    return (
        <div className='min-h-[450px] md:min-h-[500px] max-w-7xl mx-auto lg:min-h-[600px] w-full mx-auto flex justify-center items-center'>
            <div className=' w-5/6  lg:w-1/2 bg-[#6C0A0F] p-8 rounded-md'>
                <h1 className='text-2xl font-semibold text-white mb-8'>Please Login!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                        <input className='w-full my-3 px-3 py-1' placeholder='Your Email' {...register('email', { required: true })} />
                    </p>
                    <div className='relative'>
                        <p>
                            <input type={ show ? 'text': 'password'} className='w-full my-3 px-3 py-1' placeholder='Your Password' {...register('password', { required: true })} />
                        </p>
                        <p onClick={() => setShow(!show)} className=' absolute cursor-pointer -mt-[37px] ml-[220px] md:ml-[550px]'>
                            {show ? <BsFillEyeSlashFill></BsFillEyeSlashFill> : <BsFillEyeFill></BsFillEyeFill>}
                        </p>
                    </div>
                    <input className='text-center font-semibold text-white w-full mt-5 btn btn-outline py-2 hover:bg-[#00F531] hover:border-white' type="submit" />
                </form>
                <p className='mt-6 text-white text-center'>Don't Have An Account? Please <Link to="/Register"><span className='text-[#00F531] font-semibold '>Register</span></Link> </p>
                <div onClick={handleLogInWithGoogle} className='text-[#00F531] cursor-pointer font-semibold flex justify-center items-center gap-2 mt-3'>
                    <span className='text-2xl'><FcGoogle></FcGoogle></span>
                    <p>Sign In With Google</p>
                </div>
            </div>

        </div>
    );
};

export default Login;