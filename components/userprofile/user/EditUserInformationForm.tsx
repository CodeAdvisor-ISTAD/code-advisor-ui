import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/userprofile/form";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/userprofile/textarea";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPicker } from "./colorPickerComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOwnUserProfile,
  updateUserProfile,
} from "@/hooks/api-hook/user/user-service";

interface EditUserInformationFormProps {
  onColorChange?: (color: string) => void;
  bgColor?: string;
}

export default function EditUserInformationForm(
  props: EditUserInformationFormProps
) {
  const queryClient = useQueryClient();

  const { data: userInformation } = useQuery({
    queryKey: ["profile"],
    queryFn: getOwnUserProfile,
  });

  const router = useRouter();
  const [date, setDate] = React.useState<Date>();

  const { mutate: updateUser, isSuccess } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast.success("ព័ត៌មានត្រូវបានរក្សាទុកដោយជោគជ័យ");
      router.push(`/user-profile/${userInformation?.username}`);
    },
    onError: () => {
      toast.error("បរាជ័យក្នុងការរក្សាទុកព័ត៌មាន សូមព្យាយាមម្ដងទៀត");
    },
  });

  type FieldName =
    | "fullName"
    | "phoneNumber"
    | "gender"
    | "dob"
    | "pob"
    | "jobPosition"
    | "school"
    | "workPlace"
    | "bio"
    | "isDeleted"
    | "coverColor";

  const form = useForm({
    defaultValues: {
      fullName: "",
      gender: "",
      phoneNumber: "",
      bio: "",
      workPlace: "",
      pob: "",
      school: "",
      jobPosition: "",
      dob: "",
      profileImage: "",
      isDeleted: false,
      coverColor: "",
    },
  });

  useEffect(() => {
    if (userInformation) {
      form.reset({
        fullName: userInformation.fullName || "",
        gender: userInformation.gender || "",
        phoneNumber: userInformation.phoneNumber || "",
        bio: userInformation.bio || "",
        workPlace: userInformation.workPlace || "",
        pob: userInformation.pob || "",
        school: userInformation.school || "",
        jobPosition: userInformation.jobPosition || "",
        dob: userInformation.dob || "",
        profileImage: userInformation.profileImage || "",
        isDeleted: userInformation.isDeleted || false,
        coverColor: userInformation.coverColor || "",
      });
      if (userInformation.dob) {
        setDate(new Date(userInformation.dob));
      }
    }
  }, [userInformation, form]);

  async function onSubmit(data: any) {
    console.log("data: ", data);
    updateUser(data);
  }

  const handleRedirect = () => {
    router.push(`/user-profile/${userInformation?.username}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:-space-y-6 space-y-1 mx-2 "
      >
        <ToastContainer />
        <div className="mb-4">
          <div className="w-full md:mt-9 lg:mt-9 grid lg:grid-cols-2 grid-cols-1 justify-center gap-[15px] xl:mt-9">
            <div className="flex flex-col bg-white mt-5 xl:mt-0 lg:mt-0 md:mt-0 dark:bg-darkSecondary w-full h-full items-center lg:py-[25px] lg:px-[25px] py-[15px] px-[15px] rounded-lg border">
              <div className=" lg:h-[55px] h-[35px] w-full relative">
                <CardTitle className="left-0 top-0 absolute lg:text-2xl text-lg ">
                  កែប្រែព័ត៌មានអំពីអ្នក
                </CardTitle>
                <div className="lg:w-[28px] w-[20px] h-[2.5px] left-[1px] lg:top-[27px] top-[22px] absolute bg-[#f31260] dark:bg-[#FB0A5D]"></div>
              </div>
              {(
                [
                  { name: "fullName", label: "គោត្តនាម នាម" },
                  { name: "phoneNumber", label: "លេខទូរស័ព្ទ" },
                  { name: "gender", label: "ភេទ" },
                  { name: "dob", label: "ថ្ងៃ ខែ​ ឆ្នាំកំណើត" },
                  { name: "pob", label: "ទីកន្លែងកំណើត" },
                  { name: "jobPosition", label: "តួនាទី" },
                  { name: "school", label: "សាលារៀន" },
                ] as { name: FieldName; label: string }[]
              ).map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem className="lg:pb-[20px] pb-[25px] w-full">
                      <div className="flex gap-1">
                        <FormLabel className="font-khFont lg:text-base text-xs font-bold">
                          {label}
                        </FormLabel>
                        {name === ("fullName" as FieldName) && (
                          <p className="text-red-600 lg:text-base text-xs">*</p>
                        )}
                      </div>
                      <FormControl>
                        {name === "dob" ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 justify-start text-left font-normal bg-white dark:bg-darkPrimary ring-black focus:ring-1",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-gray-800" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span className="text-gray-700 d">
                                    ជ្រើសរើស​ ថ្ងៃ ខែ​ ឆ្នាំកំណើត
                                  </span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                className="w-auto"
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate);
                                  form.setValue(
                                    "dob",
                                    selectedDate
                                      ? format(selectedDate, "yyyy-MM-dd")
                                      : ""
                                  );
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <Input {...field} value={String(field.value)} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col bg-white dark:bg-darkSecondary w-full items-center lg:py-[25px] lg:px-[25px] py-[15px] px-[15px] rounded-lg border">
                {(
                  [{ name: "workPlace", label: "ទីកន្លែងធ្វើការ" }] as {
                    name: FieldName;
                    label: string;
                  }[]
                ).map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className="lg:pb-[20px] pb-[15px] w-full">
                        <div className="flex gap-1">
                          <FormLabel className="font-khFont lg:text-base text-xs font-bold">
                            {label}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input {...field} value={String(field.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col bg-white dark:bg-darkSecondary w-full justify-center items-center lg:py-[25px] lg:px-[25px] py-[15px] px-[15px] rounded-lg border">
                    <div className="w-full lg:h-[55px] h-[35px] relative">
                      <CardTitle className="left-0 top-0 absolute  lg:text-2xl text-lg">
                        កែប្រែការពិពណ៌នាអំពីអ្នក
                      </CardTitle>
                      <div className="lg:w-[28px] w-[20px] h-[2.5px] left-[1px] lg:top-[27px] top-[22px] absolute bg-[#f31260] dark:bg-[#FB0A5D]"></div>
                    </div>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverColor"
                render={({ field }) => (
                  <FormItem className="flex flex-col bg-white dark:bg-darkSecondary w-full justify-center items-center lg:py-[25px] lg:px-[25px] py-[15px] px-[15px] rounded-lg border">
                    <div className="w-full lg:h-[55px] h-[35px] relative">
                      <CardTitle className="left-0 top-0 absolute lg:text-2xl text-lg">
                        កែប្រែផ្ទៃខាងក្រោយ
                      </CardTitle>
                      <div className="lg:w-[28px] md:w-[20px] w-[15px] h-[2.5px] left-[1px] lg:top-[27px] top-[22px] absolute bg-[#f31260] dark:bg-[#FB0A5D]"></div>
                    </div>
                    <ColorPicker
                      onColorChange={(color) => {
                        form.setValue("coverColor", color);
                        if (props.onColorChange) {
                          props.onColorChange(color);
                        }
                      }}
                      initialColor={form.getValues("coverColor")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleRedirect}
                  className="bg-primary dark:bg-secondary text-white px-4 py-2 rounded"
                >
                  ចាកចេញ
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white dark:bg-secondary px-4 py-2 rounded"
                >
                  រក្សាទុក
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
