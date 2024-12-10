import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPinterest, FaWhatsapp, FaYoutube, FaGlobeAmericas, FaAsterisk, FaMapPin } from 'react-icons/fa';
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { SiGooglemybusiness } from 'react-icons/si';
import SocialMediaIcons from '../icons/SocialMediaIcons';
import TooltipButton from '../tooltip/ToolTipButton';
import { format, startOfToday } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mapIcon from '../../assets/mapIcon.svg';
import CustomAlert from '../alert/CustomAlert';


const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid'),

  destination: yup
    .string()
    .required('Destination is required')
    .min(3, 'Destination must be at least 3 characters long')
    .max(100, 'Destination must not exceed 100 characters'),

  numberOfPersons: yup
    .number()
    .required('Number of persons is required')
    .typeError('Number of persons must be a number')
    .positive('Number of persons must be greater than zero')
    .integer('Number of persons must be an integer'),


  fromDate: yup
    .date()
    .nullable() // Allow null values
    .transform((value) => (value === '' ? null : value)) // Transform empty string to null
    .required('From date is required')
    .typeError('From date must be a valid date'),

  toDate: yup
    .date()
    .nullable() // Allow null values
    .transform((value) => (value === '' ? null : value)) // Transform empty string to null
    .required('To date is required')
    .min(yup.ref('fromDate'), "To date can't be before From date")
    .typeError('To date must be a valid date'),

  message: yup.string().optional(),
});
const ContactForm = () => {
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedServices, setSelectedServices] = useState([]);
  const servicesOptions = [
    {
      title: "Adventure Trips",
      description: "Thrilling experiences for the daring explorer",
    },
    {
      title: "Ayurvedic Massage Packages",
      description: "Rejuvenate your body and soul with holistic healing",
    },
    {
      title: "Car & Bus Services",
      description: "Comfortable and reliable transport for every journey",
    },
    {
      title: "Honeymoon Packages",
      description: "Celebrate love with romantic getaways",
    },
    {
      title: "Weekend Getaway Trips",
      description: "Perfect escapes to recharge and unwind",
    },
    {
      title: "Group Trips",
      description: "Memorable journeys for friends, families, or organizations",
    },
    {
      title: "Church & Temple Holy Trips",
      description: "Spiritual journeys to sacred destinations",
    },
    {
      title: "College & Institution Trips",
      description: "Educational and fun-filled excursions for students",
    },
  ];

  // Function to handle service selection
  const handleServiceChange = (event) => {
    const value = event.target.value;
    let updatedServices;

    if (value) {
      if (selectedServices.includes(value)) {
        updatedServices = selectedServices.filter(service => service !== value);
      } else {
        updatedServices = [...selectedServices, value];
      }
    } else {
      updatedServices = [];
    }

    setSelectedServices(updatedServices);
    setValue('preferredServices', updatedServices);
  };

  const removeService = (service) => {
    setSelectedServices(selectedServices.filter(item => item !== service));
  };
  const handleClearAll = () => {
    setSelectedServices([]);
    setValue('preferredServices', []);
  };

  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const message = watch('message', '');
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const onSubmit = (data) => {
    setShowAlert(true);

    const formattedFromDate = format(new Date(data.fromDate), 'dd MMM yyyy');
    const formattedToDate = format(new Date(data.toDate), 'dd MMM yyyy');

    const whatsappMessage =
      `🌟 *Trip Enquiry* 🌟\n\n` +
      `👤 *Name :* ${data.name}\n` +
      `📞 *Phone :* +${phone}\n` +
      `🌍 *Destination :* ${data.destination}\n` +
      `👥 *Number of Travellers :* ${data.numberOfPersons}\n` +
      `📅 *Travel Dates :* ${formattedFromDate} to ${formattedToDate}\n` +
      `🔧 *Services :* ${data.preferredServices.join(', ') || 'No services selected'}\n` +
      `📝 *Message :* ${data.message || 'No additional message'}\n\n`;

    const url = `https://api.whatsapp.com/send?phone=918086407979&text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      setShowAlert(false);
      window.open(url, '_blank');
    }, 2000);
  };
  const today = format(startOfToday(), 'yyyy-MM-dd');
  return (
    <div className="custom-scrollbar p-4 w-full h-full backdrop-blur-xl text-xs overflow-y-auto text-black bg-white">
      {showAlert && <CustomAlert />}
      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-2 space-y-3 max-w-lg mx-auto flex flex-col justify-between h-full w-full">
        <h1 className='text-3xl font-bold space-y-2'>Plan Your Trip !</h1>
        <p className='md:text-sm text-[10px] text-black flex items-center'>Please fill out all required fields (<FaAsterisk className='text-red-500 text-[7px]' />) to ensure a smooth process.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 text-xs flex items-center font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Name
              <TooltipButton content={<p>Enter your full name as it appears on official documents.</p>} />
            </label>
            <input
              {...register('name')}
              placeholder='Enter your full name'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className='text-red-500 ps-4 text-[10px]'>{errors.name.message}</p>}
          </div>
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Phone Number
              <TooltipButton content={<p>Provide your contact number including country code.</p>} />
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone);
                    field.onChange(phone);
                  }}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                  }}
                  containerStyle={{ width: '100%', marginTop: '4px' }}
                  inputStyle={{ width: '100%', borderRadius: '9999px', fontFamily: '"Outfit", sans-serif', fontSize: "12px" }}
                />
              )}
            />
            {errors.phoneNumber && <p className='text-red-500 ps-4 text-[10px]'>{errors.phoneNumber.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Destination
              <TooltipButton content={<p>Enter your desired travel destination.</p>} />
            </label>
            <input
              {...register('destination')}
              placeholder='Enter destination'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.destination && <p className='text-red-500 ps-4 text-[10px]'>{errors.destination.message}</p>}
          </div>
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />Number of Travellers
              <TooltipButton content={<p>Enter the number of people traveling.</p>} />
            </label>
            <input
              type="number"
              min={1}
              {...register('numberOfPersons')}
              placeholder='Enter number of travellers'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.numberOfPersons && <p className='text-red-500 ps-4 text-[10px]'>{errors.numberOfPersons.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 w-full flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />From Date
              <TooltipButton content={<p>Select the start date of your trip.</p>} />
            </label>
            <Controller
              name="fromDate"
              control={control}
              render={({ field }) => (
                <ReactDatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={today}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select from date"
                  className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  wrapperClassName="w-full"
                />
              )}
            />
            {errors.fromDate && <p className='text-red-500 ps-4 text-[10px]'>{errors.fromDate.message}</p>}
          </div>

          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
              <FaAsterisk className='text-red-500 text-sm pe-2' />To Date
              <TooltipButton content={<p>Select the end date of your trip.</p>} />
            </label>
            <Controller
              name="toDate"
              control={control}
              render={({ field }) => (
                <ReactDatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={watch('fromDate') || today}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select to date"
                  className="mt-1 block  w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 "
                  wrapperClassName="w-full "
                />
              )}
            />
            {errors.toDate && <p className='text-red-500 ps-4 text-[10px]'>{errors.toDate.message}</p>}
          </div>
        </div>




        {/* other services */}

        <div>
          <label className="relative flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-bold text-gray-700 ps-4">
              Other Services
              <TooltipButton content={<p>Select the type of service you are interested in. You can choose multiple options.</p>} />
            </div>

            <div className="flex justify-between items-center gap-1">
              <span className="text-red-500 bg-stone-200 px-3 p-1 rounded-full font-bold text-[14px]">
                {selectedServices.length} / {servicesOptions.length}
              </span>
              {selectedServices.length > 0 && (
                <button
                  onClick={handleClearAll}
                  type="button"
                  className="bg-black px-3 p-1 rounded-full text-white hover:bg-slate-700 transition-all"
                >
                  Clear all
                </button>
              )}
            </div>
          </label>

          <select
            name="services"
            value={selectedServices.length > 0 ? selectedServices[selectedServices.length - 1] : ""}
            onChange={handleServiceChange}
            className="mt-1 custom-select block w-full border-stone-400 border outline-none text-gray-700 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option  value="">Select a service</option>
            {servicesOptions.map((service, index) => (
              <option
                key={index}
                value={service.title}
                className={selectedServices.includes(service.title) ? "bg-gray-400 text-gray-700" : ""}
                disabled={selectedServices.includes(service.title)}
              >
                {service.title}: {service.description}
              </option>
            ))}
          </select>

          <div className="w-full flex flex-col lg:flex-row flex-wrap gap-2 ps-2 py-1">
            {selectedServices.map((item, index) => (
              <div
                key={index}
                className="text-xs font-sans font-bold w-full lg:w-auto flex items-start  justify-content-lg-between gap-2 text-blue-700 rounded-full"
              >
                <div className="flex ">
                  <p className="">{item}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeService(item)}
                  className="mr-2 text-xs text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-4">
            Message (Optional)
            <TooltipButton content={<p>Let us know if you have any special requests or additional details regarding your booking.</p>} />
            <span className="text-blue-500 px-4 font-normal">
              {message.length}/100 letters left
            </span>
          </label>
          <textarea
            {...register('message')}
            placeholder="Feel free to let us know about any special requests or questions (optional)..."
            maxLength={100}
            className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>





        <div className='w-full flex justify-center'>
          <button
            className="overflow-hidden relative w-32  h-10 mt-3 bg-black text-white border-none rounded-md text-base font-bold cursor-pointer  group"
          >
            Lets Plan !
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-red-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
            ></span>
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
            ></span>
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-red-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
            ></span>
            <span
              className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute text-base  top-2 left-5 z-10"
            >Lets Plan !</span>
          </button>
        </div>
        <div className="w-full py-2">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <img src={mapIcon} alt="map" className='    h-10 w-10' />
            <div className="inline-flex items-center  px-3  py-1  border-2 border-black  rounded-full text-xs shadow-sm  transition-colors duration-300 cursor-default">
              Trivandrum
            </div>

            <div className="inline-flex items-center px-3 py-1 border-2 border-black rounded-full text-xs shadow-sm  transition-colors duration-300 cursor-default">
              Kanyakumari
            </div>

            <div className="inline-flex items-center px-3 py-1  border-2 border-black  rounded-full text-xs  shadow-sm  transition-colors duration-300 cursor-default">
              Kochi
            </div>

            <div className="items-center px-3 py-1 border-2 border-black  rounded-full text-xs shadow-sm  transition-colors duration-300 cursor-default">
              Wayanad
            </div>

            <div className="inline-flex items-center px-3  py-1  border-2 border-black rounded-full text-xs  shadow-sm transition-colors duration-300 cursor-default">
              UAE
            </div>
          </div>
        </div>

        <div className="flex justify-evenly items-center w-full flex-wrap text-black  ">
          <span>follow us</span>
          <SocialMediaIcons
            icon={
              <FaWhatsapp className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-green-500" />
            }
            link={"https://api.whatsapp.com/send/?phone=%2B918086407979&text=Hello%2C+I+am+interested+to+know+more+about+your+service.&type=phone_number&app_absent=0"}
          />
          <SocialMediaIcons
            icon={
              <FaGlobeAmericas
                className=" md:text-2xl text-lg hover:text-black transition-all duration-300 ease-in-out text-stone-600" />
            }
            link={"https://keraladrives.com/"}
          />
          <SocialMediaIcons
            icon={
              <SiGooglemybusiness
                className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-600" />
            }
            link={"https://g.co/kgs/Rhuop1m"}
          />
          {/* <SocialMediaIcons
            icon={
              <FaLocationDot
                className=" md:text-2xl text-lg hover:text-black transition-all duration-300 ease-in-out text-blue-600" />
            }
            link={"https://maps.app.goo.gl/YitZroxLtcdPE4y67"}
          /> */}
          <SocialMediaIcons
            icon={
              <FaFacebookF className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-500" />
            }
            link={"https://www.facebook.com/keraladrivestourstravel/"}
          />
          <SocialMediaIcons
            icon={
              <FaInstagram className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-pink-500" />
            }
            link={"https://www.instagram.com/kerala_drives/"}
          />
          <SocialMediaIcons
            icon={
              <FaYoutube className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-red-500" />
            }
            link={"https://www.youtube.com/channel/UC3tmfmBZf5Ufqo2JSEwj6BA?sub_confirmation=1"}
          />
          <SocialMediaIcons
            icon={
              <FaPinterest className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-red-600" />
            }
            link={"https://www.pinterest.com/keraladrives195/"}
          />
          <SocialMediaIcons
            icon={
              <FaLinkedin className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-600" />
            }
            link={"https://www.linkedin.com/company/kerala-drives/"}
          />



        </div>
      </form>
    </div>

  );
};

export default ContactForm;
