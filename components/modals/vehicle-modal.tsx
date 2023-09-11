"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useVehicleModal } from "@/hooks/use-vehicle-modal";
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
  VIN: z
    .string()
    .min(1)
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/),
  Make: z.string().min(1),
  Model: z.string().min(1),
  Year: z.number(),
});

export const VehicleModal = () => {
  const vehicleModal = useVehicleModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      VIN: "",
      Make: "",
      Model: "",
      Year: 1980,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/vehicles", values);

      window.location.assign(`/vehicles`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Add New Vehicle"}
      description={"Add a new vehicle that can be enrolled by customer"}
      isOpen={vehicleModal.isOpen}
      onClose={vehicleModal.onClose}
    >
      <div className="p-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
            <FormField
              control={form.control}
              name="Make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Manufacturer"
                      {...field}
                    />
                  </FormControl>
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
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Model of the vehicle"
                      {...field}
                    />
                  </FormControl>
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
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter year of manufacture"
                      {...field}
                      onChange={(e) => {
                        // Parse the input value to an integer
                        const parsedValue = parseInt(e.target.value, 10);
                        // Update the form field value with the parsed integer
                        field.onChange(parsedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 flex items-center justify-end space-x-2">
              <Button
                variant={"outline"}
                onClick={vehicleModal.onClose}
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
