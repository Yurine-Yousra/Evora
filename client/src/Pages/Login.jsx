import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient , useMutation  } from 'react-query';

export default function Login() {
  const [animationClass, setAnimationClass] = useState('translate-y-[1000px]');
  const [verify , setVerify] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirm , setConfirm] =useState('');
  const [password , setPassword] = useState('');
  const [reset , isreset] = useState(false);
  const [match , setmatch] = useState(false);
  const [Otp , setOtp] =useState('');
  const [ootp , isotp] =useState(false);
  const [Ver , setVer] =useState(false);
  const [error , seterror] =useState(false);
  const [email , setEmail] = useState('');
  const [passwordchecked, isPasswordchecked] = useState(true); 
  useEffect(() => {
      // Update the animation class after a delay
      const timeout = setTimeout(() => {
        setAnimationClass('');
      }, 250);
  
      return () => clearTimeout(timeout);
    }, []);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const {email , password} = formData ;
        try {
          const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email , password}),
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data){
            //const { userId, username } = data.user;
            const userId = data.user.userId;
            const username = data.user.username;
            localStorage.setItem('userId', userId);
            localStorage.setItem('username' , username);
            localStorage.setItem('token', data.token);
      // Use the user data as needed
           console.log(`User ID: ${userId}, Username: ${username}`);
            queryClient.invalidateQueries('User');
            queryClient.invalidateQueries(['otherQueryKey']);
            if(localStorage.getItem('username') == "admin") navigate('/Admin') ; else navigate('/') ;
          } 
          } else {
            console.error('Login failed');
            // You might want to display an error message to the user
          }
        } catch (error) {
          setVerify(true);
        }
      };
      const generateOtp = useMutation((email) => fetch('http://localhost:8000/generateOTP', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({ email: email })
    }));
    
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await generateOtp.mutate(email);
            isreset(false);
             isotp(true);
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ OTPcode: Otp }),
            });
            if (!response.ok) {
                throw new Error('Invalid OTP');
            }
            setVer(true);
            isotp(false);
        } catch (error) {
            seterror(true)
        }
    };
    
    
    const handlePSWSubmit = async (e) => {
        e.preventDefault();
        const isPowerful = isPowerfulPassword(password);
        if (confirm != password) {setmatch(true)} else setmatch(false) 
        isPasswordchecked(isPowerful);
          if (!match && isPowerful){
            try {
                const response = await fetch('http://localhost:8000/resetPassword', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: password }),
                });
                if (!response.ok) {
                    throw new Error('Failed to reset password');
                }
                setConfirm('');
                setPassword('');
                window.location.reload();
                // Add any additional logic here after successfully resetting the password
            } catch (error) {
                console.error(error);
                // Handle error here, e.g., display an error message to the user
            }
        }
    };
    function isPowerfulPassword(password) {
        // Define criteria for a powerful password
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        return (
            (password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChars)
        );
    }
  return (
    <>
    <div className="relative overflow-hidden w-screen h-screen flex justify-center items-center bg-[url('./Assets/imageLogin.png')]" >
        <div className={`transition duration-700 absolute top-32 h-fit w-fit max-[400px]:w-full bg-white min-[400px]:rounded-lg ${animationClass}`}>
          <h1 className='text-3xl font-bold text-center m-16'>Login</h1>
          <div className='flex flex-col gap-2 items-center justify-center m-16 '>
          {verify && <div className='text-sm font-semibold text-red-500'>Email or Password is incorrect</div>}
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <input
                className='p-2 outline-none'
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                className='p-2 outline-none'
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button className='h-8 bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.05] text-md rounded-full text-white mb-4' type="submit" >Continue</button>
    </form>
    <span className='text-sm  text-gray-500'>Do not you forget you password  ? <span className='hover:underline cursor-pointer text-black' onClick={() => isreset(true)}> forget password</span></span>
           <span className='text-sm  text-gray-500'>Do not you have an account ? <span className='hover:underline cursor-pointer text-black' onClick={()=>{navigate('/SignUp')}}> Sign Up</span></span> 
            </div>
        </div>
       </div>
       {reset &&
              <div className='fixed inset-0 z-50 flex backdrop-blur-md justify-center items-center w-screen h-screen' >
              <div className=" bg-gray-200 shadow-xl rounded-lg w-[500px] h-[230px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
              <h1 className="flex justify-end pr-2 text-3xl cursor-pointer" onClick={()=>{isreset(false) ; window.location.reload();}}>×</h1>
              <form className='flex flex-col justify-center items-center gap-8' onSubmit={handleReset} >
                <p className='text-xl font-semibold'>To reset you password, you must enter you email :</p>
            <input
                className='outline-none cursor-text rounded-lg w-64 p-2'
                type="email"
                placeholder="Enter Your Email"
                name="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            <button className='h-8 px-4 font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.05] text-md rounded-full text-white mb-4' type="submit" >Continue</button>
    </form>
              </div>
          </div>
      }
        {ootp &&
              <div className='fixed inset-0 z-50 flex backdrop-blur-md justify-center items-center w-screen h-screen' >
              <div className=" bg-gray-200 shadow-xl rounded-lg w-[500px] h-[230px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
              <h1 className="flex justify-end pr-2 text-3xl cursor-pointer" onClick={()=>{isotp(false) ; window.location.reload();}}>×</h1>
              <form className='flex flex-col justify-center items-center ' onSubmit={handleOtpSubmit}>
                <p className='text-xl font-medium px-4 mb-4 '>We have sent to your Email <span className='text-xl font-bold'>{email}</span> a verification code, write it here :</p>
                { error && <p className='text-red-500 text-sm font-semibold'>Code Incorrect</p>}
            <input
                className='outline-none  cursor-text rounded-lg w-64 p-2'
                type="text"
                placeholder="Code Otp"
                name="CodeOtp"
                onChange={(e) => setOtp(e.target.value)}
                value={Otp}
                required
            />
            <button className='h-8 mt-4 px-4 font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.05] text-md rounded-full text-white mb-4' type="submit" >Continue</button>
    </form>
              </div>
          </div>
      }
        {Ver &&
              <div className='fixed inset-0 z-50 flex backdrop-blur-md justify-center items-center w-screen h-screen' >
              <div className=" bg-gray-200 shadow-xl rounded-lg w-[500px] h-[300px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
              <h1 className="flex justify-end pr-2 text-2xl cursor-pointer" onClick={()=>{setVer(false) ; window.location.reload();}}>×</h1>
              <form className='flex flex-col justify-center items-center ' onSubmit={handlePSWSubmit}>
                <p className='text-xl font-medium px-4 mb-4 '> Enter your new password </p>
                {match &&<div className='text-sm font-semibold text-red-500'>Password does not match </div>}
                {!passwordchecked && <div className='text-sm font-semibold text-red-500'>
              Please ensure that the password contains a mix of <br />uppercase 
              and lowercase letters,numbers and special letters.</div>}
            <input
                className='outline-none cursor-text p-2 w-64 rounded-lg'
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <input
                className='p-2 outline-none mt-4 w-64 rounded-lg'
                type="password"
                placeholder="Confirm Password"
                name="Confirm-password"
                onChange={(e) => setConfirm(e.target.value)}
                value={confirm}
                required
            />
            <button className='h-8 mt-4 px-4 font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.05] text-md rounded-full text-white mb-4' type="submit" >Continue</button>
    </form>
              </div>
          </div>
      }
       </>
  )
}
