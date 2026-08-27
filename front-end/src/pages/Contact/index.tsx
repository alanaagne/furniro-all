import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuthStore } from "@store/useAuthStore";

import { Banner } from "@components/PageBanner";
import { FeaturesSection } from "@components/FeaturesSection";

import pointIcon from "@assets/point.svg";
import phoneIcon from "@assets/phone.svg";
import clockIcon from "@assets/clock.svg";

const contactSchema = z.object({
  name: z.string().min(1, "Your name is required."),
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
  subject: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { user } = useAuthStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Submitted:", data);
    setToastMessage("Message sent successfully!");
    reset();

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <main className="w-full bg-white font-poppins">
      <Banner title="Contact" />

      {toastMessage && (
        <div className="fixed top-6 right-6 z-[1000] bg-[#B88E2F] text-white px-6 py-3.5 rounded-[5px] shadow-lg flex items-center gap-3 transition-all">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" />
          </svg>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <section className="py-[98px] px-6">
        <div className="flex flex-col items-center text-center max-w-[644px] mx-auto mb-[82px]">
          <h2 className="text-[36px] font-semibold text-[#000000] leading-tight mb-[7px]">
            Get In Touch With Us
          </h2>
          <p className="text-[16px] font-normal text-[#9F9F9F] leading-normal">
            For More Information About Our Product & Services. Please Feel Free To Drop Us
            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        <div className="max-w-[1058px] mx-auto grid grid-cols-1 lg:grid-cols-[393px_1fr] gap-[30px] lg:gap-[53px]">
          
          <div className="flex flex-col gap-[42px] pt-[14px]">
            <div className="flex items-start gap-7">
              <img src={pointIcon} alt="Address" className="w-[22px] h-[28px] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[24px] font-medium text-[#000000]">Address</h3>
                <p className="text-[16px] font-normal text-[#000000] mt-1 leading-[24px] max-w-[212px]">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-7">
              <img src={phoneIcon} alt="Phone" className="w-[30px] h-[30px] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[24px] font-medium text-[#000000]">Phone</h3>
                <p className="text-[16px] font-normal text-[#000000] mt-1 leading-[24px] max-w-[212px]">
                  Mobile: +(84) 546-6789<br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <div className="flex items-start gap-7">
              <img src={clockIcon} alt="Working Time" className="w-[23px] h-[23px] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[24px] font-medium text-[#000000]">Working Time</h3>
                <p className="text-[16px] font-normal text-[#000000] mt-1 leading-[24px] max-w-[212px]">
                  Monday-Friday: 9:00 - 22:00<br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9 max-w-[531px] w-full">
            
            <div className="flex flex-col gap-[22px]">
              <label className="text-[16px] font-medium text-[#000000]">
                Your name
              </label>
              <input
                type="text"
                placeholder="Abc"
                {...register("name")}
                className={`w-full h-[75px] border ${
                  errors.name ? "border-red-500" : "border-[#9F9F9F]"
                } rounded-[10px] px-[30px] text-[16px] text-[#000000] placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 font-normal -mt-3">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-[22px]">
              <label className="text-[16px] font-medium text-[#000000]">
                Email address
              </label>
              <input
                type="text"
                placeholder="Abc@def.com"
                {...register("email")}
                className={`w-full h-[75px] border ${
                  errors.email ? "border-red-500" : "border-[#9F9F9F]"
                } rounded-[10px] px-[30px] text-[16px] text-[#000000] placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-normal -mt-3">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-[22px]">
              <label className="text-[16px] font-medium text-[#000000]">
                Subject
              </label>
              <input
                type="text"
                placeholder="This is an optional"
                {...register("subject")}
                className="w-full h-[75px] border border-[#9F9F9F] rounded-[10px] px-[30px] text-[16px] text-[#000000] placeholder-[#9F9F9F] focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-[22px]">
              <label className="text-[16px] font-medium text-[#000000]">
                Message
              </label>
              <textarea
                placeholder="Hi! i’d like to ask about..."
                {...register("message")}
                className="w-full h-[120px] border border-[#9F9F9F] rounded-[10px] p-[30px] text-[16px] text-[#000000] placeholder-[#9F9F9F] resize-none focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-[237px] h-[55px] bg-[#B88E2F] hover:bg-[#a17b27] transition-colors text-white rounded-[5px] text-[16px] font-normal mt-[13px]"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <FeaturesSection />
    </main>
  );
}