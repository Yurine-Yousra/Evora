import { useState } from 'react';
import Navbar from '../Components/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const createPostMutation = async (postData) => { 
  const token = localStorage.getItem('token'); 
 
  const response = await fetch('http://localhost:8000/addPost', { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`, 
    }, 
    body: JSON.stringify(postData), 
  }); 
 
  if (!response.ok) { 
    throw new Error('Failed to create post'); 
  } 
 
  return response.json(); 
};



const CreateEvent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createPostMutation, { 
    onSuccess: (data) => { 
      console.log('Post created successfully:', data); 
      queryClient.invalidateQueries(['otherQueryKey']); 
      // Redirect or perform any other actions upon successful creation 
    }, 
  });
  const Navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);
  const[description , setInputText] = useState('');
  const [isDateInputVisible, setIsDateInputVisible] = useState(false);
  const [date, setDateValue] = useState('');
  const [link, setLink] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [title, setTitleValue] = useState('');
  const [location, setLocation] = useState('');
  const [place, setWilaya] = useState('');
  const [category, setSelectedCategory] = useState('');
  const [image, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleInputChange = (event) => {
    setInputText( event.target.value);
    const currentLength = description.length;

    if (currentLength <= 500) {
      setCharCount(currentLength);
    }
  };
  const handleWilayaChange = (e) => {
    setWilaya(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };
  const handleDateChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };



  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = Array.from(files);

    if (selectedImages.length + image.length > 1) {
      setErrorMsg('You can upload only 1 image');
      return;
    }

    setErrorMsg('');

    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

    const handleFocus = () => {
    setIsDateInputVisible(true);
  };
    const handleBlur1 = () => {
    setIsDateInputVisible(false);
  };

  const [isTimeInputVisible, setIsTimeInputVisible] = useState(false);
    const handleFocus1 = () => {
    setIsTimeInputVisible(true);
  };
    const handleBlur = () => {
    setIsTimeInputVisible(false);
  };

   console.log({title , place , location , date , link , image , description , category });
  const handleImageRemove = (e, index) => {
    e.preventDefault();
    const newImages = image.filter((_, i) => i !== index);
    setImages(newImages);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !timeValue) {
      setErrorMsg('Please enter both date and time');
      return;
    } else {
      if (image.length === 0) {
        setErrorMsg('Please upload at least one image');
        return;
      }
    }
    const formData = { title, place, location, date, link, description, category };
    mutation.mutate(formData);
  };
  
  return (
    <div className='bg-[#E1E1E1] h-screen w-full wrapper' >
      <Navbar />
      <main className='px-10 py-4 mx-32 my-4 bg-white rounded-lg min-h-rest'>
        <h1 className='flex justify-center text-3xl text-blue-950 font-semibold'>Edit Your Event</h1>
        <form className='flex flex-col mt-4 space-y-3' onSubmit={handleSubmit}>
          <input 
          type="text" 
          required 
          className='p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
          />
          <input
            className='p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
            type="text"
            placeholder="Date Month/Day/Year"
            onFocus={handleFocus}
            value={date}
            onChange={handleDateChange}
            style={{ display: isDateInputVisible ? 'none' : 'block'} }
          />
          <input
            className='p-2 outline-none border border-[#bdbdbd] rounded-lg focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
            type="date"
            onBlur={handleBlur}
            value={date}
            onChange={handleDateChange}
            style={{ display: isDateInputVisible ? 'block' : 'none'} }
          />
                    
          <input
            className='p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
            type="text"
            placeholder="Time HH:MM AM/PM"
            onFocus={handleFocus1}
            value={timeValue}
            onChange={handleTimeChange}
            style={{ display: isTimeInputVisible ? 'none' : 'block'} }
          />
          <input
            className='p-2 outline-none border border-[#bdbdbd] rounded-lg focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
            type="time"
            onBlur={handleBlur1}
            value={timeValue}
            onChange={handleTimeChange}
            style={{ display: isTimeInputVisible ? 'block' : 'none'} }
          />
          <input
            type="text"
            required
            value={location}
            className="p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500"
            placeholder="Location"
            onChange={handleLocationChange}
          />
          <input
            type="text"
            required
            value={place}
            className="p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500"
            placeholder="Wilaya"
            onChange={handleWilayaChange}
          />
          <div className='border w-full border-[#bdbdbd] overflow-hidden h-28 rounded-lg focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'>
            <div className='flex flex-row justify-between mx-2'>
              <p className='text-gray-600'>Description</p>
              <p className='text-gray-600'>{charCount}/500</p>
            </div>
            <textarea
              className="w-full h-[75px] px-2 outline-none wrapper text-wrap"
              maxLength={500}
              onChange={handleInputChange}
              value = {description}
              required
              style={{ resize: 'none' }}
            />
          </div>
          <select value={category} onChange={handleCategoryChange} required className="block appearance-none w-full cursor-pointer bg-white border border-[#bdbdbd] text-gray-600 py-2 px-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:text-black focus:bg-white focus:border-gray-500">
            <option value="" disabled hidden>Select a Category</option>
            <option value="category1">Business</option>
            <option value="category2">Cultural</option>
            <option value="category3">Cultural</option>
            <option value="category4">Politics</option>
            <option value="category5">Sports</option>
            <option value="category6">Educational</option>
            <option value="category7">Health & Care</option>
          </select>
          <input 
          type="url"
           required 
           className='p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
            placeholder='Event Form Link' 
            value={link}
            onChange={handleLinkChange} />
          
          <section className='flex flex-row'>
            <label className='flex flex-col items-center bg-[#0000001A] justify-center text-[#696969] h-24 p-2 text-xs border border-[#00000080] border-dashed cursor-pointer w-26 rounded-xl'>
              <b className='text-xl'>+</b> 
              <br/>
              <span>only 1 image</span>
              <input 
                type="file"
                className='w-0 h-0 opacity-0'
                onChange={handleImageChange}
                multiple
                accept='image/*' />  
            </label>
            <div className='flex flex-row ml-4 space-x-1'>
                {image.map((image, index) => (
                <div className='flex flex-col space-y-1' key={index}>
                  <img src={URL.createObjectURL(image)} alt='' className='w-20 h-20' />
                  <button onClick={(e) => handleImageRemove(e, index)} className='text-xs text-white transition duration-100 ease-in-out bg-red-400 cursor-pointer rounded-xl hover:bg-red-500'>Remove</button>
                </div>
                ))}
            </div>
            {errorMsg && <p className='ml-4 text-red-600'>{errorMsg}</p>}
          </section>
          <button type='submit' className='w-32 p-1 mt-4 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:scale-[1.01]'>Save Changes</button>
        </form>
      </main>
    </div>
  );
}

export default CreateEvent;