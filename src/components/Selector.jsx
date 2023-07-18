// ===========================================
// #00121
// ===========================================

import { BichevronDown } from 'react-icons/bi';

function Selector() {
  return (
    <div className="w-full font-medium h-80">
    <div className="bg-transparent w-full p-2 flex items-center justify-center rounded-md">
      Select
      <BichevronDown size={20} />
    </div>
  </div>
  )
}

export default Selector
