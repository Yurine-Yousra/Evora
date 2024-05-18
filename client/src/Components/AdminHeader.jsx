import logo from "../Assets/Logo.png";

export default function AdminHeader() {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-between w-full pt-4 pb-4 bg-white shadow-sm pe-8 ps-8 max-[480px]:ps-4 max-[480px]:pe-4 max-[450px]:ps-2 max-[450px]:pe-2">
        <img src={logo} alt="Logo" className='h-10 w-18' />
    </div>
  )
}
