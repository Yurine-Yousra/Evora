import image from '../Assets/imageLogin.png'
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient  } from 'react-query';

export default function Login() {
  const [animationClass, setAnimationClass] = useState('translate-y-[1000px]');
  const [verify , setVerify] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    
  return (
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
           <h2 className='text-md  text-gray-500'>Do not you have an account?</h2> 
            <h2 className='hover:underline cursor-pointer' onClick={()=>{navigate('/SignUp')}}>Sign Up</h2>
            </div>
        </div>
       
        
    </div>
  )
}
