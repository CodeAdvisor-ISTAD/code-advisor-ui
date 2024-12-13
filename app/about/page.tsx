"use client";
import Image from "next/image";
import { Target, Lightbulb, Diamond } from "lucide-react";
import {
  PenLine,
  MessageCircle,
  HelpCircle,
  Heart,
  CircleIcon as CircleLetterA,
} from "lucide-react";
import TeamSection from "@/components/card-component/card/MemberComponent";
import { motion } from "framer-motion";

export default function about() {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-extrabold text-secondary">
                អំពី​​​ CodeAdvisors
              </h1>
            </div>
            <p className="text-base md:text-lg text-gray-700">
              CodeAdvisors ផ្តល់ជូនពិតជាមួយនឹង Developers
              តាមរយៈការរៀបចាក់ការជំនាញ វិជ្ជាជីវៈថ្មីៗ
              និងបង្កើតនូវការទំនាក់ទំនងល្អៗជាមួយគ្នាបន្ថែមទៀត។
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative h-[300px] md:h-[400px] lg:h-[450px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/about-us/1.png"
              alt="Programming Education Illustration"
              fill
              className="object-contain rounded-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <div className=" bg-gray-100">
        <section className=" mx-16 py-16">
          <div className="container mx-auto px-10 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Goal Feature */}
              <div className="text-center space-y-4 ">
                <div className="flex justify-center ">
                  <Image
                    src="/about-us/vision.png" // Replace with your logo path
                    alt="Code Advisors Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="text-[24px] font-semibold  text-primary">
                  បេសកកម្ម
                </h3>
                <p className="text-gray-600 flex justify-center text-[18px]">
                  ផ្តល់វិធីសាស្រ្តក្នុងការចែករំលែក ចំណេះដឹង ការដោះស្រាយបញ្ហា
                  និងអភិវឌ្ឍន៍ចំណេះដឹង។{" "}
                </p>
              </div>

              {/* Meaning Feature */}
              <div className="text-center space-y-4 ">
                <div className="flex justify-center ">
                  <Image
                    src="/about-us/vision.png" // Replace with your logo path
                    alt="Code Advisors Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="text-[24px] font-semibold  text-primary">
                  ចក្ខុវិស័យ
                </h3>
                <p className="text-gray-600 flex justify-center text-[18px]">
                  ផ្តល់ឱកាសឲ្យ Developers សិក្សាស្វែងយល់ សហការណ៍
                  និងបង្កើនការច្នៃប្រឌិត។
                </p>
              </div>

              {/* Quality Feature */}
              <div className="text-center space-y-4 ">
                <div className="flex justify-center ">
                  <Image
                    src="/about-us/vision.png" // Replace with your logo path
                    alt="Code Advisors Logo"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="text-[24px] font-semibold  text-primary">
                  គុណតម្លៃ
                </h3>
                <p className="text-gray-600 flex justify-center text-[18px]">
                  ការសហការណ៍ ការដោះស្រាយបញ្ហា
                  ការចែករំលែកចំណេះដឹង​និងបង្កើនការអភិវឌ្ឍន៍។
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] md:h-[350px] lg:h-[400px]">
            <Image
              src="/about-us/4.png"
              alt="Planning Illustration"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600">តើពួកយើងជានរណា?</h2>
            <p className="text-lg text-gray-600">
              CodeAdvisors គឺជាវេទិកាមួយដែលត្រូវបានអភិវឌ្ឍឡើងដោយនិស្សិត Spring
              Microservices នៅ ISTAD។ វេបសាយមួយនេះជួយ Developers ក្នុងការ
              សិក្សាស្វែងយល់ ចែករំលែកចំណេះដឹង និងសហការណ៍គ្នា តាមរយៈវេទិកាសន្ទនា
              ក៏ដូចជាការចែករំលែកមាតិកា។
            </p>
          </div>
        </div>
      </section>
      {/* Learning Path Section */}
      <section className=" text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-secondary mb-12">
            ការផ្តល់ពិន្ទុទៅតាមកម្រិត
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mx-40 items-center">
            <div className="space-y-6">
              {[
                {
                  icon: <PenLine className="w-6 h-6" />,
                  title: "យកចិត្តទុក",
                  text: "ទទួលបាន ១៥ពិន្ទុសម្រាប់ការស្រាវជ្រាវស៊ីជម្រៅ",
                },
                {
                  icon: <MessageCircle className="w-6 h-6" />,
                  title: "ផ្តល់មតិ",
                  text: "ទទួលបាន ២០ពិន្ទុសម្រាប់ការស្រាវជ្រាវល្អ",
                },
                {
                  icon: <HelpCircle className="w-6 h-6" />,
                  title: "ចោទសួរ",
                  text: "ទទួលបាន ១០ពិន្ទុសម្រាប់ការស្រាវជ្រាវ",
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "ផ្តល់គុណ",
                  text: "ទទួលបាន ២០ពិន្ទុសម្រាប់ការស្រាវជ្រាវចប់",
                },
                {
                  icon: <CircleLetterA className="w-6 h-6" />,
                  title: "ផ្តើមសំខាន់",
                  text: "ទទួលបាន ២៥ពិន្ទុសម្រាប់ការស្រាវជ្រាវស៊ីជម្រៅ",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary  flex items-center justify-center border border-secondary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-black">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-[300px] md:h-[350px] lg:h-[400px]">
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
      <section className="min-h-screen">
        {/* Other sections of your about page */}

        {/* Team Section */}
        <TeamSection />

        {/* Other sections of your about page */}
      </section>
      <section className="px-6 py-8 bg-gray-50 rounded-lg ">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px] md:h-[350px] lg:h-[400px]">
            <Image
              src="/about-us/6.png"
              alt="Planning Illustration"
              fill
              className="object-cover "
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-primary">ទំនាក់ទំនង</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              CodeAdvisors ទទួលនូវរាល់មតិទាំងឡាយពីអ្នកប្រើប្រាស់
              ជាទីស្រលាញ់​របស់ពួកយើង
            </p>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li>
                <span className="font-semibold">អុីម៉ែល:</span> istad.tk@edu.kh
              </li>
              <li>
                <span className="font-semibold">លេខទូរស័ព្ទ:</span> +855 123 456
                789
              </li>
              <li>
                <span className="font-semibold">ទីតាំង:</span> Near 23 Street
                564, Phnom Penh
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
