'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

import ImageUploader from '@/components/shared/ImageUploader';
import { courseFormSchema } from '../schema/courseFormSchema';
import { createCourse } from '../actions/create-course';
import { toast } from 'sonner';
import { updateCourse } from '../actions/update-course';
import { redirect } from 'next/navigation';

export function CourseForm({ course, close }) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: course?.title ?? '',
      description: course?.description ?? '',
      price: course?.price ?? 0,
      thumbnail: course?.thumbnail ?? '',
    },
  });

  async function onSubmit(values) {
    const {name, description, price, thumbnail} = values;
    console.log(name, description, price, thumbnail)
    if (course?.id) {
      console.log("course is editing")
      const {errors: updateErrors} = await updateCourse(course.id, {name, description,price, thumbnail})
      if (updateErrors) {
        toast(errors.message)
      }
    }else {
      console.log("course is creating")
      const {errors: createErrors, data: createData} = await createCourse(name, description, price, thumbnail)
      if (createErrors) {
        toast(createErrors.message)
      }
      redirect(`/dashboard/course/${createData.id}`)
    }
    close()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className='flex flex-col gap-2'>
        <label className="block text-sm font-medium">Course Name</label>
        <Input {...register('name')} placeholder="e.g. Introduction to AI" />
        {errors.name && <p style={{ color: "red" }} className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <label className="block text-sm font-medium">Description</label>
        <Textarea {...register('description')} placeholder="Write something..." />
        {errors.description && <p style={{ color: "red" }} className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <label className="block text-sm font-medium">Price ($)</label>
        <Input type="number" {...register('price')} />
        {errors.price && <p style={{ color: "red" }} className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <label className="block text-sm font-medium">Thumbnail</label>
        <Controller
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <ImageUploader
              onUpload={(url) => field.onChange(url)}
              prevImage={field.value}
            />
          )}
        />
        {errors.thumbnail && <p style={{ color: "red" }} className="text-sm text-red-500">{errors.thumbnail.message}</p>}
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Done'}
        </Button>
      </DialogFooter>
    </form>
  );
}
