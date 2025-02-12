"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  PenLine,
  MessageCircle,
  HelpCircle,
  Heart,
  CircleIcon as CircleLetterA,
} from "lucide-react";
import TeamSection from "@/components/card-component/card/MemberComponent";
import AnimatedBackground from "@/components/card-component/card/AnimatedBackground";

export default function About() {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (

    <div className="relative min-h-screen overflow-hidden dark:bg-darkPrimary">
      <div className="relative z-10">
        <main className="overflow-hidden relative z-10">
          {/* Hero Section */}
          <section className="mt-40">
            <AnimatedBackground />
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Section */}
              <div className="space-y-8" data-aos="fade-right">
                <h1 className="text-3xl md:text-4xl font-extrabold text-secondary ml-4 md:ml-20">
                  អំពី​​​ CodeAdvisors
                </h1>
                <p className="text-base md:text-lg text-gray-700 ml-4 md:ml-20 dark:text-white">
                  CodeAdvisors ផ្តល់ជូនពិតជាមួយនឹង Developers
                  តាមរយៈការរៀបចាក់ការជំនាញ វិជ្ជាជីវៈថ្មីៗ
                  និងបង្កើតនូវការទំនាក់ទំនងល្អៗជាមួយគ្នាបន្ថែមទៀត។
                </p>
              </div>

              {/* Image Section */}
              <motion.div
                  className="relative w-full h-[250px] md:h-[300px]"
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                    className="w-full h-full"
                    animate={{ y: [0, 8, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0], transition: { duration: 0.5 } }}
                >
                  <div className="relative w-full h-full">
                    <Image
                        src="/about-us/1.png"
                        alt="Programming Education Illustration"
                        fill
                        className="object-contain rounded-lg"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-[100px] bg-white border border-gray-100 dark:bg-darkPrimary dark:border-none">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 mb-10">
              {/* Goal Feature */}
              <div className="text-center mx-4 md:mx-16 lg:mx-28 2xl:mx-32" data-aos="fade-up">
                <div className="flex justify-center">
                  <Image
                      src="/2.png"
                      alt="Code Advisors Logo"
                      width={150}
                      height={150}
                      className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 2xl:w-48 2xl:h-48"
                  />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-2xl font-semibold text-primary dark:text-secondary">
                  បេសកម្ម
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base 2xl:text-lg dark:text-white">
                  ផ្តល់វិធីសាស្រ្តក្នុងការចែករំលែក ចំណេះដឹង ការដោះស្រាយបញ្ហា
                  និងអភិវឌ្ឍន៍ចំណេះដឹង។
                </p>
              </div>


              {/* Meaning Feature */}
              <div
                className="text-center mx-4 md:mx-28 lg:mx-28 2xl:mx-28"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex justify-center">
                  <Image
                    src="/1.png"
                    alt="Code Advisors Logo"
                    width={150}
                    height={150}
                    className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 2xl:w-48 2xl:h-48"
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-2xl 2xl:text-2xl font-semibold text-primary dark:text-secondary">
                  ចក្ខុវិស័យ
                </h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-base 2xl:text-base dark:text-white">
                  ផ្តល់ឱកាសឲ្យ Developers សិក្សាស្វែងយល់ សហការណ៍
                  និងបង្កើនការច្នៃប្រឌិត។
                </p>
              </div>

              {/* Quality Feature */}
              <div
                className="text-center mx-4 md:mx-28 lg:mx-28 2xl:mx-28"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex justify-center">
                  <Image
                    src="/3.png"
                    alt="Code Advisors Logo"
                    width={150}
                    height={150}
                    className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 2xl:w-48 2xl:h-48"
                  />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-2xl 2xl:text-2xl font-semibold text-primary dark:text-secondary">
                  គុណតម្លៃ
                </h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-base 2xl:text-base dark:text-white">
                  ការសហការណ៍ ការដោះស្រាយបញ្ហា
                  ការចែករំលែកចំណេះដឹង​និងបង្កើនការអភិវឌ្ឍន៍។
                </p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="container bg-white mt-20 border border-gray-100 mx-auto dark:bg-darkPrimary dark:border-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 items-center p-4">
              <div
                className="h-[200px] md:h-[300px] lg:h-[350px] 2xl:h-[400px]"
                data-aos="fade-right"
              >
                <Image
                  src="/about-us/4.png"
                  alt="Planning Illustration"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mr-4 md:mr-56 lg:mr-56 2xl:mr-56" data-aos="fade-left">
                <h2 className="text-2xl md:text-3xl lg:text-3xl 2xl:text-3xl font-bold text-red-600">
                  តើពួកយើងជានរណា?
                </h2>
                <p className="text-sm md:text-base lg:text-base 2xl:text-base mt-2 text-gray-600 dark:text-white">
                  CodeAdvisors គឺជាវេទិកាមួយដែលត្រូវបានអភិវឌ្ឍឡើងដោយនិស្សិត
                  Spring Microservices នៅ ISTAD។ វេបសាយមួយនេះជួយ Developers
                  ក្នុងការ សិក្សាស្វែងយល់ ចែករំលែកចំណេះដឹង និងសហការណ៍គ្នា
                  តាមរយៈវេទិកាសន្ទនា ក៏ដូចជាការចែករំលែកមាតិកា។
                </p>
              </div>
            </div>
          </section>

          {/* Learning Path Section */}
          <section className="text-white mt-20 border border-gray-100 bg-white dark:bg-darkPrimary dark:border-none ">
            <div className="">
              <h2 className="text-center text-2xl md:text-3xl lg:text-3xl 2xl:text-3xl font-bold text-secondary py-7">
                ការផ្តល់ពិន្ទុទៅតាមសកម្មភាព
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 mx-4 md:mx-52 lg:mx-52 2xl:mx-52 items-center mb-10 ">
                <div className="space-y-6">
                  {[
                    {
                      icon: <PenLine className="w-6 h-6" />,
                      title: "បង្កើតមាតិកា",
                      text: "ទទួលបាន ១៥ពិន្ទុរៀងរាល់ការបង្កើតមាតិកាម្តង",
                    },
                    {
                      icon: <MessageCircle className="w-6 h-6" />,
                      title: "ផ្តល់មតិ",
                      text: "ទទួលបាន ៥ពិន្ទុរៀងរាល់ការផ្តល់មតិម្តង",
                    },
                    {
                      icon: <HelpCircle className="w-6 h-6" />,
                      title: "ចោទសួរ",
                      text: "ទទួលបាន ១០ពិន្ទុរៀងរាល់ការសួរម្តង",
                    },
                    {
                      icon: <Heart className="w-6 h-6" />,
                      title: "ចូលចិត្ដ",
                      text: "ទទួលបាន ២ពិន្ទុរៀងរាល់ការចូលចិត្តម្តង",
                    },
                    {
                      icon: <CircleLetterA className="w-6 h-6" />,
                      title: "ឆ្លើយសំនួរ",
                      text: "ទទួលបាន ២៥ពិន្ទុរៀងរាល់ការឆ្លើយសំនួរម្តង",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 2xl:w-12 2xl:h-12 rounded-full bg-primary flex items-center justify-center dark:bg-secondary ">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg lg:text-lg 2xl:text-lg font-semibold text-primary dark:text-secondary">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base lg:text-base 2xl:text-base text-black dark:text-white">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="relative h-[200px] md:h-[300px] lg:h-[350px] 2xl:h-[400px] mb-10"
                  data-aos="fade-left"
                >
                  <Image
                    src="/about-us/3.png"
                    alt="Learning Path Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <TeamSection />

          {/* About Section */}
          <div className="w-full rounded-sm bg-white dark:bg-darkPrimary">
            <section className="mx-4 md:mx-6 lg:mx-36 2xl:mx-36 mb-16 ">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 items-center gap-6 ">
                {/* Map Section */}
                <div
                    className="relative w-full h-[200px] md:h-[250px] lg:h-[350px] 2xl:h-[380px] "
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                  <div className="p-4 md:p-2">
                    <Card className="border-none dark:bg-darkPrimary dark:border-none">
                      <CardContent className="p-6 md:p-4">
                        <div className="h-[150px] md:h-[200px] lg:h-[250px] 2xl:h-[300px]">
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8516.35648407093!2d104.898482!3d11.579958536233953!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e1!3m2!1sen!2skh!4v1734921321450!5m2!1sen!2skh"
                              className="w-full h-full rounded-sm"
                              allowFullScreen={false}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6 md:space-y-4 dark:bg-darkPrimary" data-aos="fade-left" data-aos-delay="200">
                  <h2
                      className="text-2xl md:text-2xl lg:text-4xl 2xl:text-4xl font-extrabold text-secondary"
                      data-aos="fade-up"
                      data-aos-delay="300"
                  >
                    ទំនាក់ទំនង
                  </h2>
                  <p
                      className="text-sm md:text-sm lg:text-base 2xl:text-base text-gray-700 leading-relaxed dark:text-white"
                      data-aos="fade-up"
                      data-aos-delay="400"
                  >
                    CodeAdvisors ទទួលនូវរាល់មតិទាំងឡាយពីអ្នកប្រើប្រាស់
                    ជាទីស្រលាញ់​របស់ពួកយើង
                  </p>

                  <ul className="space-y-4 md:space-y-3 text-gray-700 text-sm md:text-sm lg:text-base 2xl:text-base">
                    {/* Email */}
                    <li data-aos="fade-up" data-aos-delay="500" className="flex items-center">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 2xl:h-6 2xl:w-6 mr-2 text-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold mr-2 dark:text-white">អុីម៉ែល:</span>
                      <a href="/info.istad@gmail.com" className="hover:text-primary dark:text-white">istad.tk@edu.kh</a>
                    </li>

                    {/* Phone */}
                    <li data-aos="fade-up" data-aos-delay="600" className="flex items-center">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 2xl:h-6 2xl:w-6 mr-2 text-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-semibold mr-2 dark:text-white">លេខទូរស័ព្ទ:</span>
                      <a href="tel:+855123456789" className="hover:text-primary dark:text-white">+855 123 456 789</a>
                    </li>

                    {/* Address */}
                    <li data-aos="fade-up" data-aos-delay="700" className="flex items-center">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 2xl:h-6 2xl:w-6 mr-2 text-secondary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-semibold mr-2 dark:text-white">ទីតាំង:</span>
                      <a
                          href="https://maps.app.goo.gl/HRN4hrCyrAqTdZzP6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary dark:text-white"
                      >
                        Street 562, Sangkat Boeung Kak I, Khan Toul Kork, Phnom Penh
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}