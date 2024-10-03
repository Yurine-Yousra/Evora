import { useState } from 'react';
import Navbar from '../Components/CustomNavbar';
import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';

const EditPostMutation = async ({ id , title, place, location, date, link, image, price, description, category }) => {
       const response = await fetch(`http://localhost:8000/UpdateEvent/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, place, location, date, link, image, price, description, category}),
    });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};

const EditEvent = () => {
  const mutation = useMutation(EditPostMutation, { 
    onSuccess: (data) => { 
      console.log('Post created successfully:', data); 
    }, 
  });
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
    { value: "TEBESSA", label: "11-Tebessa" },
    { value: "TLEMCEN", label: "12-Tlemcen" },
    { value: "TIARET", label: "13-Tiaret" },
    { value: "TIZI OUZOU", label: "14-Tizi Ouzou" },
    { value: "ALGER", label: "15-Alger" },
    { value: "DJELFA", label: "16-Djelfa" },
    { value: "JIJEL", label: "17-Jijel" },
    { value: "SETIF", label: "18-Setif" },
    { value: "SAIDA", label: "19-Saida" },
    { value: "SKIKDA", label: "20-Skikda" },
    { value: "SIDI BEL ABBES", label: "21-Sidi Bel Abbes" },
    { value: "ANNABA", label: "22-Annaba" },
    { value: "GUELMA", label: "23-Guelma" },
    { value: "CONSTANTINE", label: "24-Constantine" },
    { value: "MEDea", label: "25-Medea" },
    { value: "MOSTAGANEM", label: "26-Mostaganem" },
    { value: "M'SILA", label: "27-M'Sila" },
    { value: "MASCARA", label: "28-Mascara" },
    { value: "OUARGLA", label: "29-Ouargla" },
    { value: "ORAN", label: "30-Oran" },
    { value: "EL BAYADH", label: "31-El Bayadh" },
    { value: "ILLIZI", label: "32-Illizi" },
    { value: "BORDJ BOU ARRERIDJ", label: "33-Bordj Bou Arreridj" },
    { value: "BOUMERDES", label: "34-Boumerdes" },
    { value: "EL TAREF", label: "35-El Taref" },
    { value: "TINDOUF", label: "36-Tindouf" },
    { value: "TISSEMSILT", label: "37-Tissemsilt" },
    { value: "EL OUED", label: "38-El Oued" },
    { value: "KHENCHELA", label: "39-Khenchela" },
    { value: "SOUK AHRAS", label: "40-Souk Ahras" },
    { value: "TIPAZA", label: "41-Tipaza" },
    { value: "MILA", label: "42-Mila" },
    { value: "AIN DEFLA", label: "43-Ain Defla" },
    { value: "NAAMA", label: "44-Naama" },
    { value: "AIN TEMOUCHENT", label: "45-Ain Temouchent" },
    { value: "GHARDAIA", label: "46-Ghardaia" },
    { value: "RELIZANE", label: "47-Relizane" },
    { value: "OUARGLA", label: "48-Ouargla" },
    { value: "EL MEGHAIR", label: "49-El Meghair" },
    { value: "OULED DJELLAL", label: "50-Ouled Djellal" },
    { value: "BIRIN", label: "51-Birin" },
    { value: "HASSI MESSAOUD", label: "52-Hassi Messaoud" },
    { value: "OUED RHIOU", label: "53-Oued Rhiou" },
    { value: "M'CHOUNECHE", label: "54-M'Chouneche" },
    { value: "MAGHRAOUA", label: "55-Maghraoua" },
    { value: "OUED FODDA", label: "56-Oued Fodda" },
    { value: "TIARET", label: "57-Tiaret" },
    { value: "MECHERIA", label: "58-Mecheria" }
  ];
  

  const [success , isSuccess] = useState(false);
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
  const {id} = useParams();
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
    mutation.mutate({ id , title, place, location, date, link, image : Image[0], price, description, category });
    isSuccess(true);
  };
  
  return (
    <>
    <div className='bg-[#E1E1E1] pb-8 w-full wrapper' >
      <Navbar />
      <main className='px-10 py-4 mx-32 my-20 max-md:mx-0 max-lg:mx-6 bg-white rounded-lg min-h-rest'>
        <h1 className='flex justify-center text-3xl text-blue-950 font-semibold'>Edit Your Event</h1>
        <form className='flex flex-col mt-4 space-y-3' onSubmit={handleSubmit}>
          <input 
          type="text" 
           
          className='p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
          />
          {passed && <p className='text-red-600 font-semiBold text-sm'>The date is in the past.</p>}
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
            
            value={location}
            className="p-2 outline-none border border-[#bdbdbd] rounded-lg placeholder:text-gray-600 focus:outline-none focus:text-black focus:bg-white focus:border-gray-500"
            placeholder="Location"
            onChange={handleLocationChange}
          />
          <select
              value={place}
              onChange={handleWilayaChange}
              
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
              
              style={{ resize: 'none' }}
            />
          </div>
          <select value={category} onChange={handleCategoryChange}  className="block appearance-none w-full cursor-pointer bg-white border border-[#bdbdbd] text-gray-600 py-2 px-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:text-black focus:bg-white focus:border-gray-500">
            <option value="" disabled hidden>Select a Category</option>
            <option value="Business">Business</option>
            <option value="Politics">Politics</option>
            <option value="Sports">Sports</option>
            <option value="Educational">Educational</option>
            <option value="Health & Care">Health & Care</option>
          </select>
          <input 
          type="url" 
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
    {success &&  <div className='fixed inset-0 z-50 flex backdrop-blur-md justify-center items-center w-screen h-screen'>
            <div className=" bg-gray-200 flex flex-col justify-center shadow-xl rounded-lg w-[500px] h-[200px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
             <div className="flex flex-col items-center gap-4 pt-8 justify-center mb-8">
             <h1 className="text-2xl font-bold text-center"> Your event has been sent to the admin for approval or refusal. </h1>
                <Link to={'/'} className='bg-blue-600 text-white font-semibold text-xl p-2 rounded-lg '>Go to Home</Link>
             </div>
            </div>
        </div>}
    </>
  );
}

export default EditEvent;