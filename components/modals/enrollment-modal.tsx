"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useEnrollmentModal } from "@/hooks/use-enrollment-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  VIN: z.string().min(1),
  Make: z.string().min(1),
  Model: z.string().min(1),
  Year: z.number(),
  vehicleId: z.string(),
  createdBy: z.string(),
});

export const EnrollmentModal = ({ data }: any) => {
  const { data: session, status } = useSession();

  const enrollmentModal = useEnrollmentModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      VIN: "",
      Make: "",
      Model: "",
      Year: 1980,
      createdBy: "",
    },
  });

  const findUser = async (userName: any) => {
    console.log("UsEWRNAME", userName);
    await axios.get("/api/user").then((res) => {
      console.log(
        "createdBy",
        res?.data.find((user: any) => user.userName === userName)?.id
      );
      form.setValue(
        "createdBy",
        res?.data.find((user: any) => user.userName === userName)?.id
      );

    });
    // .then((res) => form.setValue("createdBy" , res?.data.find((user: any) => user.userName === userName)))
  };

  let makeOptions = data.map((value: any) => value.Make);
  let yearOptions = data
    .filter(
      (value: any) =>
        value.Make === form.watch("Make") && value.Model === form.watch("Model")
    )
    .map((value: any) => value.Year);
  let modelOptions = data
    .filter((value: any) => value.Make === form.watch("Make"))
    .map((value: any) => value.Model);

  const [VINprefix, setVINprefix] = useState(
    data.map((value: any) => value.Make)
  );

  useEffect(() => {
    findUser(session?.user?.userName);
  }, []);

  // useEffect(()=>
  // {setYearOptions(data.map((value: any) => value.Year));
  //   setMakeOptions(data.map((value: any) => value.Make));
  //   setModelOptions(data
  //     .filter((value: any) => value.Make === form.watch('Make'))
  //     .map((value: any) => value.Model))},[])

  useEffect(() => {
    modelOptions = data
      .filter((value: any) => value.Make === form.watch("Make"))
      .map((value: any) => value.Model);
  }, [data, form.watch("Make")]);

  useEffect(() => {
    yearOptions = data
      .filter(
        (value: any) =>
          value.Make === form.watch("Make") &&
          value.Model === form.watch("Model")
      )
      .map((value: any) => value.Year);
  }, [data, form.watch("Model"), form.watch("Make")]);

  useEffect(() => {
    if (form.watch("Make") && form.watch("Year") && form.watch("Model")) {
      const foundVehicle = data.find(
        (value: any) =>
          value.Make === form.watch("Make") &&
          value.Model === form.watch("Model") &&
          value.Year === form.watch("Year")
      );
      if (foundVehicle) {
        form.setValue("VIN", foundVehicle.VIN);
        form.setValue("vehicleId", foundVehicle.id);
      }
    }
  }, [data, form.watch("Year")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      console.log(values);
      
      const response = await axios.post("/api/enrollments", {
        createdBy: values.createdBy,
        vehicleId: values.vehicleId,
      });



      window.location.assign(`/vehicles`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Enroll Your Vehicle"}
      description={"Add a new vehicle that can be enrolled by customer"}
      isOpen={enrollmentModal.isOpen}
      onClose={enrollmentModal.onClose}
    >
      <div className="p-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="Make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {makeOptions.map((option: string) => {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modelOptions.map((option: string) => {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={(value: string) =>
                      form.setValue("Year", parseInt(value))
                    }
                    defaultValue={form.getValues("Year").toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearOptions.map((option: number) => {
                        return (
                          <SelectItem key={option} value={option.toString()}>
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="VIN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter VIN of the vehicle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 flex items-center justify-end space-x-2">
              <Button
                variant={"outline"}
                onClick={enrollmentModal.onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
