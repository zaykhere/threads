'use client';

import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import { UserValidation } from '@/lib/validations/user';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    },
    btnTitle: string;
}

const AccountProfile = ({user, btnTitle}: Props) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
        profile_photo: '',
        name: '',
        username: '',
        bio: ''
    }
  });

  function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                    <Image
                        src={field.value}
                        alt='profile photo'
                        width={96}
                        height={96}
                        priority
                        className='rounded-full object-contain'
                    />
                ) : (
                    <Image
                        src="/assets/profile.svg"
                        alt='profile photo'
                        width={24}
                        height={24}
                        className='object-contain'
                    />
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile