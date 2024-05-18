import { useState } from 'react';
import Navbar from '../Components/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

const createPostMutation = async ({ title, place, location, date, link, image, price, description, category }) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('title', title);
  formData.append('place', place);
  formData.append('location', location);
  formData.append('date', date);
  formData.append('link', link);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('image', image);

  const response = await fetch('http://localhost:8000/addPost', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};

const CreateEvent = () => {
  const wilayaOptions = [
    { value: "", label: "Select a Wilaya" },
    { value: "ADRAR", label: "01-Adrar" },
    { value: "CHLEF", label: "02-Chlef" },
    { value: "LAGHOUAT", label: "03-Laghouat" },
    { value: "OUM EL BOUAGHI", label: "04-Oum El Bouaghi" },
    { value: "BATNA", label: "05-Batna" },
    { value: "BEJAIA", label: "06-Bejaia" },
    { value: "BISKRA", label: "07-Biskra" },
    { value: "BECHAR", label: "08-Bechar" },
    { value: "BLIDA", label: "09-Blida" },
    { value: "BOUIRA", label: "10-Bouira" },
    { value: "Tamanrasset", label: "11-Tamanrasset" },
    { value: "TEBESSA", label: "12-Tebessa" },
    { value: "TLEMCEN", label: "13-Tlemcen" },
    { value: "TIARET", label: "14-Tiaret" },
    { value: "TIZI OUZOU", label: "15-Tizi Ouzou" },
    { value: "ALGER", label: "16-Alger" },
    { value: "DJELFA", label: "17-Djelfa" },
    { value: "JIJEL", label: "18-Jijel" },
    { value: "SETIF", label: "19-Setif" },
    { value: "SAIDA", label: "20-Saida" },
    { value: "SKIKDA", label: "21-Skikda" },
    { value: "SIDI BEL ABBES", label: "22-Sidi Bel Abbes" },
    { value: "ANNABA", label: "23-Annaba" },
    { value: "GUELMA", label: "24-Guelma" },
    { value: "CONSTANTINE", label: "25-Constantine" },
    { value: "MEDea", label: "26-Medea" },
    { value: "MOSTAGANEM", label: "27-Mostaganem" },
    { value: "M'SILA", label: "28-M'Sila" },
    { value: "MASCARA", label: "29-Mascara" },
    { value: "OUARGLA", label: "30-Ouargla" },
    { value: "ORAN", label: "31-Oran" },
    { value: "EL BAYADH", label: "32-El Bayadh" },
    { value: "ILLIZI", label: "33-Illizi" },
    { value: "BORDJ BOU ARRERIDJ", label: "34-Bordj Bou Arreridj" },
    { value: "BOUMERDES", label: "35-Boumerdes" },
    { value: "EL TAREF", label: "36-El Taref" },
    { value: "TINDOUF", label: "37-Tindouf" },
    { value: "TISSEMSILT", label: "38-Tissemsilt" },
    { value: "EL OUED", label: "39-El Oued" },
    { value: "KHENCHELA", label: "40-Khenchela" },
    { value: "SOUK AHRAS", label: "41-Souk Ahras" },
    { value: "TIPAZA", label: "42-Tipaza" },
    { value: "MILA", label: "43-Mila" },
    { value: "AIN DEFLA", label: "44-Ain Defla" },
    { value: "NAAMA", label: "45-Naama" },
    { value: "AIN TEMOUCHENT", label: "46-Ain Temouchent" },
    { value: "GHARDAIA", label: "47-Ghardaia" },
    { value: "RELIZANE", label: "48-Relizane" },
    { value: "TIMIMOUN", label: "49-Timimoun" },
    { value: "BORDJ BADJI MOKHTAR", label: "50-Bordj Badji Mokhtar" },
    { value: "OULED DJELLAL", label: "51-Ouled Djellal" },
    { value: "BENI ABBES", label: "52-Beni Abbes" },
    { value: "IN SALAH", label: "53-In Salah" },
    { value: "IN GUEZZAM", label: "54-In Guezzam" },
    { value: "TOUGGOURT", label: "55-Touggourt" },
    { value: "DJANET", label: "56-Djanet" },
    { value: "EL MEGHAIR", label: "57-El Meghair" },
    { value: "EL MENIAA", label: "58-El Meniaa" },
  ];
  

  const [success , isSuccess] = useState(false);
  const mutation = useMutation(createPostMutation, { 
    onSuccess: (data) => { 
      console.log('Post created successfully:', data); 
    }, 
  });
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
  const [price , setPrice] = useState('');
  const [image, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [passed, setPassed] = useState(false);
  const handleInputChange = (event) => {
    setInputText( event.target.value);
    const currentLength = description.length;

    if (currentLength <= 500) {
      setCharCount(currentLength);
    }
  };
  const handlePriceChange = (e) =>{
    setPrice(e.target.value);
  }
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

   console.log({ title, place, location, date, link, image : image[0], description, category });
  const handleImageRemove = (e, index) => {
    e.preventDefault();
    const newImages = image.filter((_, i) => i !== index);
    setImages(newImages);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var mydate = new Date(date);
    var currentDate = new Date()  
    if (mydate <= currentDate ){
      setPassed(true);
      return;
    }
    
    mutation.mutate({ title, place, location, date, link, image : image[0] , price ,description, category });
    isSuccess(true);
  };
  
  return (
    <>
    <div className='bg-[#E1E1E1] pb-8 w-full wrapper' >
      <Navbar />
      <main className='px-10 py-4 mx-32 my-20 bg-white rounded-lg max-md:mx-0 max-lg:mx-6 min-h-rest'>
        <h1 className='flex justify-center text-3xl font-semibold text-blue-950'>Create New Event</h1>
        <form className='flex flex-col mt-4 space-y-3' onSubmit={handleSubmit}>
          <input 
          type="text" 
          required 
          className='p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
          />
          {passed && <p className='text-sm text-red-600 font-semiBold'>The date is in the past.</p>}
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
          <select
              value={place}
              onChange={handleWilayaChange}
              required
              className="block appearance-none w-full cursor-pointer bg-white border border-[#bdbdbd] text-gray-600 py-2 px-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:text-black focus:bg-white focus:border-gray-500"
          >
              {wilayaOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                      {option.label}
                  </option>
              ))}
          </select>
          <input
            type="text"
            required
            value={price}
            className="p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500"
            placeholder="Price"
            onChange={handlePriceChange}
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
            <option value="Business">Business</option>
            <option value="Cultural">Cultural</option>
            <option value="Art">Art</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Educational">Educational</option>
            <option value="Health & Care">Health & Care</option>
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
          <div className='flex justify-end'>
            <button type='submit' className='w-32 p-1 mt-4 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:scale-[1.01]'>Save Changes</button>
          </div>
        </form>
      </main>
    </div>
    {success &&  <div className='fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-md'>
            <div className=" bg-gray-200 flex flex-col justify-center shadow-xl rounded-lg w-[500px] h-[200px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
             <div className="flex flex-col items-center justify-center gap-4 pt-8 mb-8">
             <h1 className="text-2xl font-bold text-center"> Your event has been sent to the admin for approval or refusal. </h1>
                <Link to={'/'} className='p-2 text-xl font-semibold text-white bg-blue-600 rounded-lg '>Go to Home</Link>
             </div>
            </div>
        </div>}
    </>
  );
}

export default CreateEvent;