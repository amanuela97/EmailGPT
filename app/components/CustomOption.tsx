import Image from 'next/image';
import { CustomOptionsProps, Name, Email } from '../utils/types';
import { imgUrl } from '../utils/data';

const getImage = (obj: Email | Name): string => {
  if ('image' in obj) {
    return obj.image;
  }

  return imgUrl;
};

const CustomOption = ({
  innerProps,
  label,
  data,
  isEmail,
}: CustomOptionsProps) => {
  return (
    <div {...innerProps} className="flex p-1 cursor-pointer hover:bg-[#e1e1e1]">
      {isEmail && (
        <Image
          src={getImage(data)}
          alt={label}
          width={24}
          height={24}
          className=" mr-2 ml-1 rounded"
        />
      )}
      {label}
    </div>
  );
};

export default CustomOption;
