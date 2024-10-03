import {  useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/CustomNavbar";
import { useState, useEffect } from "react";
import notFound from '../Assets/not-found.png';
import { useQuery, useQueryClient } from 'react-query';
import Footer from "../Components/Footer";
async function fetchUserData(id) {
  if (id) {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const fetchPosts = async () => {
  try {
    const response = await fetch(`http://localhost:8000/category/${localStorage.getItem('category')}`, {
      method: 'GET', // Assuming you are performing a GET request
      headers: {
        'Content-Type': 'application/json' 
      } 
    });
    const eventData = await response.json();
    console.log("Fetched data:", eventData);

    return { event: eventData }; // Wrap the data in an object with the 'event' property
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}



export default function EventCategory() {
  const queryClient = useQueryClient();
  const  category  = localStorage.getItem('category');
  console.log(category);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [data, setCardsData] = useState([]);
  const id = localStorage.getItem('userId');
  
  const { data: events, isLoading, isError } = useQuery(['posts'], () => fetchPosts());
  const { data: userInfo, isLoading: userLoading, isError: userError } = useQuery(['userData', id], () => fetchUserData(id));
  
  useEffect(() => {
    if (events) {
      setCardsData(events.event);
    }
  }, [events]);

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/likeEvent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to like the event');
      }
      queryClient.invalidateQueries('posts');
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };

  const handleDislike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/dislike/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to dislike the event');
      }
      queryClient.invalidateQueries('posts');
    } catch (error) {
      console.error('Error disliking event:', error);
    }
  };

  const isLiked = (id) => {
    return userInfo?.likedEvents?.some(event => event._id === id);
  };

  return (
    <>
      <Navbar />
      <h1 id="section" className="pt-8 pb-8 text-3xl font-bold text-center text-indigo-950">{category} Events:</h1>
      <div className="relative">
        {(data.length !== 0) ? (
          <div className="grid grid-cols-3 max-[1070px]:grid-cols-2 max-[711px]:grid-cols-1 justify-items-center mt-16 mb-16">
            {data?.map((card) => (
              <div className="cards" key={card._id}>
                <img className="h-[200px] w-full" src={`http://localhost:8000/assets/${card.image}`} alt="" />
                <div className="absolute top-0 left-0 bg-white pt-0.5 pb-0.5 pe-2 ps-2">
                  <p className="text-base font-medium">{card.price}</p>
                </div>
                <div
                  onClick={() => { if (!token) { setClick(true); } else { navigate(`/eventpage/${card._id}`); } }}
                  className="flex items-center justify-between pt-4 pb-4 cursor-pointer ps-1 pe-2"
                >
                  <div className="font-medium text-center basis-1/6 text-md">
                    <div>{new Date(card.date).getDate()}</div>
                    <div>{new Date(card.date).toLocaleString('default', { month: 'short' })}</div>
                  </div>
                  <div className="basis-3/6 ps-1">
                    <h3 className="text-xl font-medium">{card.title}</h3>
                    <h4>{card.organizer?.username}</h4>
                  </div>
                  <div className="basis-2/6">
                    <span className="font-medium">{card.organizer?.followers.length}</span> Followers
                  </div>
                </div>
                <div
                  onClick={() => {
                    if (!token) {
                      setClick(true);
                    }
                  }}
                  className="absolute z-40 top-2 right-2 bg-white hover:scale-[1.1] transition duration-500 p-1 rounded-3xl"
                >
                  {!isLiked(card._id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 14"
                      fill="none"
                      onClick={() => { handleLike(card._id); }}
                    >
                      <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#C2C2C2" />
                    </svg>
                  )}
                  {isLiked(card._id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 14"
                      fill="none"
                      onClick={() => { handleDislike(card._id); }}
                    >
                      <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#ff0000" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-fit">
            <img className="w-60 h-60" src={notFound} />
            <h1 className="pt-10 pb-10 text-5xl font-bold text-gray-800">Oooops,</h1>
            <p className="text-lg text-gray-600">There is no result for your search.</p>
            <p className="pb-10 space-x-2 text-lg text-gray-600">Come on, try again!</p>
          </div>
        )}

        <div className={`${click ? 'fixed inset-0 z-50 flex backdrop-blur-md justify-center items-center w-screen h-screen' : 'hidden'}`}>
          <div className="bg-gray-200 shadow-xl rounded-lg w-[500px] h-[230px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
            <h1 className="flex justify-end pr-2 text-xl cursor-pointer" onClick={() => { setClick(false); }}>×</h1>
            <div className="flex flex-col items-center justify-center m-4">
              <h1 className="pt-4 pb-4 text-2xl font-bold text-center">You need an account.</h1>
              <Link className="font-semibold bg-blue-500 pb-1 shadow-md rounded-md mb-2 text-center text-white text-lg w-32 hover:scale-[1.05]" to="/Login">Login</Link>
              <Link className="font-semibold bg-gold2 pb-1 shadow-md rounded-md text-center text-white text-lg w-32 hover:scale-[1.05]" to="/SignUp">Signup</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
