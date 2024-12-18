/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Register = () => {

    const { userCreate, userProfileUpdate, logInWithGoogle } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        userCreate(data.email, data.password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "User Created Successfully.",
                        icon: "success"
                    });
                    navigate('/')
                    userProfileUpdate(data.name, data.photoURL)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                Badge: "Bronze"
                            }
                            axiosSecure.post('/users', userInfo)
                                .then(res => {
                                    console.log(res.data);
                                })
                            reset();
                        })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Oh!",
                    text: `${error.message}`,
                    icon: "error"
                });
            })
    }

    const handleLogInWithGoogle = () => {
        logInWithGoogle()
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "User Created Successfully.",
                        icon: "success"
                    });
                    navigate('/')
                    const userInfo = {
                        name: result.user?.displayName,
                        email: result.user?.email,
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
        <div className='min-h-[550px] lg:min-h-[600px] max-w-7xl mx-auto w-full mx-auto flex justify-center items-center '>
            <div className=' w-5/6 lg:w-1/2 bg-primary-300 p-8 rounded-md text-black my-5'>
                <h1 className='text-2xl font-semibold   mb-8'>Please Register!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='text-white'>
                    <p>
                        <input type='text' className='w-full my-4 px-3 py-1 bg-black focus:outline-none' placeholder='Your Name' {...register('name', { required: true })} />
                    </p>
                    <p>
                        <input type='text' className='w-full my-4 px-3 py-1 bg-black focus:outline-none' placeholder='Your photoURL' {...register('photoURL', { required: false })} />
                    </p>
                    <p>
                        <input className='w-full my-4 px-3 py-1' placeholder='Your Email' {...register('email', { required: true })} />
                    </p>
                    <div className='relative'>
                        <p>
                            <input type={show ? 'text' : 'password'} className='w-full my-4 px-3 py-1' placeholder='Your Password' {...register('password', {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}/
                            })} />
                        </p>
                        {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>
                        }
                        {
                            errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 20 characters</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one capital letter, one special character, one digit and one small letter</p>
                        }
                        <p onClick={() => setShow(!show)} className=' absolute cursor-pointer -mt-10 ml-[220px] md:ml-[550px]'>
                            {show ? <BsFillEyeSlashFill></BsFillEyeSlashFill> : <BsFillEyeFill></BsFillEyeFill>}
                        </p>
                    </div>
                    <input className='text-center font-semibold   w-full mt-5 btn btn-outline py-2 text-black hover:bg-primary-100 hover:border-white hover:text-white' type="submit" />
                </form>
                <p className='mt-6   text-center'>Already Have An Account? Please <Link to="/Login"><span className=' font-semibold '>Login</span></Link> </p>
                <div onClick={handleLogInWithGoogle} className=' cursor-pointer font-semibold flex justify-center items-center gap-2 mt-3'>
                    <span className='text-2xl'><FcGoogle></FcGoogle></span>
                    <p>Sign In With Google</p>
                </div>
            </div>

        </div>
    );
};

export default Register;