import  { useState} from 'react';
import Navbar from '../Components/CustomNavbar';
import event from '../Assets/event.png';
import mail from '../Assets/mail.png';
import { useMutation } from 'react-query';

const Contact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const contactUs = useMutation(async (formData) => {
        const response = await fetch('http://localhost:8000/contact', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        return response.json();
    });

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            await contactUs.mutateAsync({ firstName, lastName, email, message });
            setFirstName('');
            setLastName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.log('Failed to send email. Please try again later.');
        }
    };
    
  return (
    <div>
        <Navbar />
        <main className='flex flex-col items-center justify-center h-full py-4 px-36 max-[1626px]:px-20 max-[1499px]:px-16 max-[1465px]:px-12 max-[1435px]:px-8 max-[1407px]:px-6 max-[1387px]:px-4 max-[1374px]:px-2 max-[1356px]:px-0 max-[1356px]:w-full'>
            <h1 className='mt-2 font-bold text-7xl max-[390px]:text-6xl'>Need Help?</h1>
            <h2 className='mt-8 text-xl font-semibold text-center'>We'd love to hear from you! Whether you have a question about our products, want to provide feedback, or just want to say hello, feel free to reach out to us using the contact information below:</h2>
            <span className='relative w-full bg-cover -ms-20' style={{ backgroundImage: `url(${event})` }} >
                <form onSubmit={sendEmail} className='flex flex-row justify-between p-36 max-[1343px]:p-24 max-[1154px]:p-16 max-lg:p-12 max-[503px]:p-16'>
                    <div className='flex flex-col justify-center gap-y-4'>
                        <div className='flex flex-row gap-x-4 max-[503px]:flex-col gap-y-4'>
                            <div>
                                <p className='text-white'>First Name</p>
                                <input className='h-10 px-2 rounded-lg outline-none' size={27} value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text" />
                            </div>
                            <div>
                                <p className='text-white'>Last Name</p>
                                <input className='h-10 px-2 rounded-lg outline-none' size={27} value={lastName} onChange={(e) => setLastName(e.target.value)} required type="text" />
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-white'>Email</p>
                            <input className='h-10 px-2 rounded-lg outline-none' size={63} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
                        </div>
                        <div>
                            <p className='text-white'>What can we help you with</p>
                            <textarea
                                className="w-full h-[200px] p-2 outline-none wrapper text-wrap rounded-lg resize-none"
                                placeholder="Type your message here..."
                                required
                                value={message} onChange={(e) => setMessage(e.target.value)}
                            />           
                        </div>
                        <div className='min-[962px]:hidden flex justify-center'>
                            <button type='submit' className='px-8 py-1 mt-8 font-semibold bg-white rounded-lg hover:bg-slate-300'>Send</button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center max-[962px]:hidden'>
                        <img src={mail} alt="" className='max-[1026px]:h-52' />
                        <button type='submit' className='px-8 py-1 mt-8 font-semibold bg-white rounded-lg hover:bg-slate-300'>Send</button>
                    </div>
                </form>
            </span>
        </main>
    </div>
  )
}

export default Contact