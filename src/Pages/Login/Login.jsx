/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form';
import {Link} from "react-router-dom"

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <div className='min-h-[600px] w-full mx-auto m-3 flex justify-center items-center border'>
            <div className='border w-1/2 bg-green-400 p-8 rounded-md'>
                <h1 className='text-2xl font-semibold text-white mb-8'>Please Login!</h1>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>
                        <input className='w-full my-4 px-3 py-1' placeholder='Your Email' {...register('firstName')} />
                    </p>
                    <p>
                        <input className='w-full my-4 px-3 py-1' placeholder='Your Password' {...register('lastName', { required: true })} />
                    </p>
                    <input className='text-center font-semibold text-white w-full mt-5 bg-red-500 py-2' type="submit" />
                </form>
                <p className='mt-6 text-white text-center'>Don't Have an Account? Please <Link to="/register"><span className='text-red-500 font-semibold '>Register</span></Link> </p>
            </div>

        </div>
    );
};

export default Login;