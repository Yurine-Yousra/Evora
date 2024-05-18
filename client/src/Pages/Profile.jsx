import { useState } from 'react';
import { useQuery ,useMutation, isError  } from 'react-query';
import Navbar from '../Components/CustomNavbar';
import LikedEvents from '../Components/LikedEvents';
import Events from '../Components/UserEvents';
import Userlists from '../Components/FollowersAndFollowing';
import Loading from '../Components/Loading';
import Notfound from './notfound';
import Preference from '../Components/preference';

export default function Profile() {
    const id  = localStorage.getItem('userId');
    const { data: userInfo, isLoading: userLoading, isError: userError } = useQuery(['userData', id], fetchUserData);
    const [showLiked, setShowLiked] = useState(false);
    const [showEvents, setShowEvents] = useState(true);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [confirm , setConfirm] =useState('');
    const [password , setPassword] = useState('');
    const [reset , isreset] = useState(false);
    const [match , setmatch] = useState(false);
    const [pre , setPre] =useState(false);
    const [Otp , setOtp] =useState('');
    const [ootp , isotp] =useState(false);
    const [Ver , setVer] =useState(false);
    const [error , seterror] =useState(false);
    const [email , setEmail] = useState('');
    const [passwordchecked, isPasswordchecked] = useState(true); 

    function fetchUserData() {
        return fetch(`http://localhost:8000/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }

    const handleLikedClick = (e) => {
        e.preventDefault();
        setShowLiked(true);
        setShowEvents(false);
        setShowFollowers(false);
        setShowFollowing(false);
    };

    const handleEventsClick = (e) => {
        e.preventDefault();
        setShowEvents(true);
        setShowLiked(false);
        setShowFollowers(false);
        setShowFollowing(false);
    };

    const handleFollowersClick = (e) => {
        e.preventDefault();
        setShowFollowers(true);
        setShowEvents(false);
        setShowLiked(false);
        setShowFollowing(false);
    };

    const handleFollowingClick = (e) => {
        e.preventDefault();
        setShowFollowing(true);
        setShowEvents(false);
        setShowLiked(false);
        setShowFollowers(false);
    };

    
    const generateOtp = useMutation((email) => fetch('http://localhost:8000/generateOTP', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    
    const handlePreference = () => {
        setPre(true);
    };
    
    const handleSubmit = async (e) => {
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
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    if (userLoading) return <div className="relative h-screen w-screen"><Loading/></div>
    if (userError) return <Notfound/>
    return (
        <>
        <div className='wrapper overflow-x-hidden bg-[#E1E1E1]'>
            <div className='h-screen'>
                <Navbar />
                <span className='flex max-[1105px]:flex-col max-[1105px]:items-center w-full justify-center h-rest gap-x-6'>
                    <div className='mt-8'>
                        <div className='h-86 w-[440px] max-sm:w-[300px] rounded-lg p-4 px-6 border border-[#bdbdbd] bg-white'>
                            <div className='flex flex-col items-center justify-center mb-6'>
                                <img src={`http://localhost:8000/assets/${userInfo.image}`} alt="" className='h-[130px] w-[140px] rounded-full' />
                                <h2 className='mb-5 text-[#414141]'>{userInfo?.username}</h2>
                            </div>
                            <hr className='border border-[#00000080]' />
                            <div className='flex justify-between mt-1 text-[#414141]'>
                                <p>Email</p>
                                <p>{userInfo?.email}</p>
                            </div>
                            <div className='flex justify-between text-[#414141]'>
                                <p>Phone Number</p>
                                <p>{userInfo?.phoneNumber}</p>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                            <div className='bg-blue-600 text-white px-4 py-1 w-[170px] rounded-xl text-center cursor-pointer ' onClick={handlePreference}>Set Preferences</div>
                            <div className='bg-[#D20D00] text-white px-4 py-1 w-[170px] rounded-xl text-center cursor-pointer ' onClick={() => isreset(true)}> Reset Password</div>
                            </div>
                            </div>
                        { userInfo?.description &&  (<div className='overflow-auto wrapper h-[170px] w-[440px] max-sm:w-[300px] bg-white border border-[#bdbdbd] rounded-lg px-4 py-2 mt-4'>
                            <h2 className='mb-1 font-semibold'>Description</h2>
                            <p className='w-full overflow-y-auto break-words outline-none' placeholder='Your Description...'>{userInfo?.description}</p>
                        </div>)}
                    </div>
                    <section className='w-1/2 mt-8 max-[1105px]:w-4/5 max-md:w-full'>
                        <div className='h-[60px] rounded-lg p-2 flex items-center justify-evenly border border-[#bdbdbd] bg-white'>
                            <p href="" className={`${showLiked ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleLikedClick}>Liked</p>
                            <p href="" className={` ${showEvents ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleEventsClick}>Events</p>
                            <p href="" className={` ${showFollowers ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleFollowersClick}>Followers</p>
                            <p href="" className={` ${showFollowing ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleFollowingClick}>Following</p>
                        </div>
                        {showLiked && <LikedEvents data={userInfo} />}
                        {showEvents && <Events isUser={true} data = {userInfo} />}
                        {showFollowers && <Userlists userInfo = {userInfo} userList={userInfo?.followers} />}
                        {showFollowing && <Userlists userInfo = {userInfo} userList={userInfo?.follows} />}
                    </section>
                </span>
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
              <form className='flex flex-col justify-center items-center ' onSubmit={handleSubmit}>
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
      {pre && <Preference/>}
        </>
    );
}
