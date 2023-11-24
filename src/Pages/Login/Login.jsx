/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false)
    const { logIn } = useContext(AuthContext);

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
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='min-h-[450px] md:min-h-[500px] lg:min-h-[600px] bg-red-100 w-full mx-auto flex justify-center items-center'>
            <div className='border w-5/6  lg:w-1/2 bg-green-400 p-8 rounded-md'>
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
                    <input className='text-center font-semibold text-white w-full mt-5 bg-red-500 py-2' type="submit" />
                </form>
                <p className='mt-6 text-white text-center'>Don't Have An Account? Please <Link to="/register"><span className='text-red-500 font-semibold '>Register</span></Link> </p>
            </div>

        </div>
    );
};

export default Login;