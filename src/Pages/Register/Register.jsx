/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Register = () => {

    const { userCreate } = useContext(AuthContext);
    const [show, setShow] = useState(false)

    const {
        register,
        handleSubmit,
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
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    return (
        <div className='min-h-[600px] w-full mx-auto m-3 flex justify-center items-center border'>
            <div className='border w-1/2 bg-green-400 p-8 rounded-md'>
                <h1 className='text-2xl font-semibold text-white mb-8'>Please Register!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                        <input className='w-full my-4 px-3 py-1' placeholder='Your Name' {...register('name', { required: true })} />
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
                        <p onClick={() => setShow(!show)} className='border absolute cursor-pointer -mt-10 ml-[414px]'>
                            { show ? <BsFillEyeSlashFill></BsFillEyeSlashFill> :<BsFillEyeFill></BsFillEyeFill>}
                        </p>
                    </div>
                    <input className='text-center font-semibold text-white w-full mt-5 bg-red-500 py-2' type="submit" />
                </form>
                <p className='mt-6 text-white text-center'>Already Have An Account? Please <Link to="/login"><span className='text-red-500 font-semibold '>Login</span></Link> </p>
            </div>

        </div>
    );
};

export default Register;