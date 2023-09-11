"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  VIN: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading , setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      VIN: "",
      make: "",
      model: "",
      year: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

   try {
      setLoading(true);
      
      const response = await axios.post('/api/stores', values);

      window.location.assign(`/${response.data.id}`)

   }catch (error){
      toast.error("Something went wrong");
   }finally{
      setLoading(false);
   }
  };

  return (
    <Modal
      title={"Add New Vehicle"}
      description={"Add a new vehicle that can be enrolled by customer"}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="p-4 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="VIN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter VIN of the vehicle" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter Manufacturer" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter Model of the vehicle" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter year of manufacture" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="pt-6 flex items-center justify-end space-x-2">
              <Button variant={"outline"} onClick={storeModal.onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
