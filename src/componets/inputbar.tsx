import { useState } from 'react';
function InputBar() {
    const [value, setValue] = useState(50);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(Number(e.target.value));
    }
  return (
  <div className="flex flex-col">
        <div className="flex text-center space-x-9">
           <p className='text-lg'>courses</p>
            <p className='text-lg'>{value}</p>
        </div>
        <input type="range" min={0} max={100} onChange={handleChange} className="apperance-none w-100 border border-xl rounded-2xl border-white hover:bg-blue-500 accent-gray-500 cursor-pointer bg-gray-700" name="" id="" />
    </div>
  );
}
export default InputBar;