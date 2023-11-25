/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Register = () => {

    const { userCreate,userProfileUpdate, logInWithGoogle } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        userCreate(data.email, data.password)
            .then(result => {
                console.log(result.user);
                if (result.user) {
                    Swal.fire({
                        title: "Success!",
                        text: "User Created Successfully.",
                        icon: "success"
                    });
                    userProfileUpdate(data.name, data.photoURL)
                    .then( () => {
                        console.log('profile updated');
                        const userInfo = {
                            name:data.name,
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
                console.log(error.message);
            })
    }

    const handleLogInWithGoogle = () => {
        logInWithGoogle()
        .then(result =>{
            console.log(result.user);
            if(result.user){
                Swal.fire({
                    title: "Success!",
                    text: "User Created Successfully.",
                    icon: "success"
                });
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
        <div className='min-h-[550px] lg:min-h-[600px] w-full mx-auto flex justify-center items-center bg-red-100'>
            <div className='border w-5/6 lg:w-1/2 bg-green-400 p-8 rounded-md'>
                <h1 className='text-2xl font-semibold text-white mb-8'>Please Register!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                        <input type='text' className='w-full my-4 px-3 py-1' placeholder='Your Name' {...register('name', { required: true })} />
                    </p>
                    <p>
                        <input type='text' className='w-full my-4 px-3 py-1' placeholder='Your photoURL' {...register('photoURL', { required: false })} />
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
                            { show ? <BsFillEyeSlashFill></BsFillEyeSlashFill> :<BsFillEyeFill></BsFillEyeFill>}
                        </p>
                    </div>
                    <input className='text-center font-semibold text-white w-full mt-5 bg-red-500 py-2' type="submit" />
                </form>
                <p className='mt-6 text-white text-center'>Already Have An Account? Please <Link to="/login"><span className='text-red-500 font-semibold '>Login</span></Link> </p>
                <div onClick={handleLogInWithGoogle} className='text-red-500 cursor-pointer font-semibold flex justify-center items-center gap-2 mt-3'>
                    <span><FcGoogle></FcGoogle></span>
                    <p>Sign In With Google</p>
                </div>
            </div>

        </div>
    );
};

export default Register;