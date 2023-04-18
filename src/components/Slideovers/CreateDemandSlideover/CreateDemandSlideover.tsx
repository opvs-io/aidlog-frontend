import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { CreateRequestDto } from '@/features/requests/dto/create-request.dto';

import { showCreateDemandSlideoverState } from '@/store/demands.store';

import Slideover from '@/components/Slideover/Slideover';
import TextArea from '@/components/TextArea/TextArea';
import TextInput from '@/components/TextInput/TextInput';
import { useUser } from '@supabase/auth-helpers-react';
import Select, { SelectItem } from '@/components/Select/Select';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isNumberString } from 'class-validator';
import http from '@/configs/http';
import InputLabel from '@/components/InputLabel/InputLabel';
import dynamic from 'next/dynamic';
import { Locations } from '@/components/Map/Map';
import { LatLng } from 'leaflet';
import useCreate from '@/features/requests/hooks/use-create';
import { toast } from 'react-hot-toast';

const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
});

type Props = {
  authenticated: string;
};

type Category = {
  id: number;
  name: string;
  subCategories: SubCategory[];
};

type SubCategory = {
  name: string;
  id: string;
};

const categories: Category[] = [
  {
    id: 1,
    name: 'Gıda',
    subCategories: [
      {
        name: 'Kuru gıda',
        id: '0x000001',
      },
      {
        name: 'Bebek Maması',
        id: '0x000002',
      },
      {
        name: 'Kedi Maması',
        id: '0x000003',
      },
      {
        name: 'Köpek Maması',
        id: '0x000004',
      },
      {
        name: 'Su',
        id: '0x000005',
      },
      {
        name: 'Diğer',
        id: '0x000006',
      },
    ],
  },
  {
    id: 2,
    name: 'Kıyafet',
    subCategories: [
      {
        name: 'İç giyim',
        id: '0x000007',
      },
      {
        name: 'Pantolon',
        id: '0x000008',
      },
      {
        name: 'Ayakkabı',
        id: '0x000009',
      },
      {
        name: 'Dış giyim',
        id: '0x000010',
      },
      {
        name: 'Diğer',
        id: '0x000011',
      },
    ],
  },
  {
    id: 3,
    name: 'İlaç, Medikal',
    subCategories: [
      {
        name: 'İlaç',
        id: '0x000012',
      },
      {
        name: 'Gauze',
        id: '0x000013',
      },
      {
        name: 'Serum',
        id: '0x000014',
      },
      {
        name: 'Diğer',
        id: '0x000015',
      },
    ],
  },
  {
    id: 5,
    name: 'Temizlik, Kişisel Bakım',
    subCategories: [
      {
        name: 'Yüzey temizleyici',
        id: '0x000016',
      },
      {
        name: 'Sabun',
        id: '0x000017',
      },
      {
        name: 'Şampuan',
        id: '0x000018',
      },
      {
        name: 'Hijyenik Ped',
        id: '0x000019',
      },
      {
        name: 'Bebek bezi',
        id: '0x000020',
      },
      {
        name: 'Diğer',
        id: '0x000021',
      },
    ],
  },
];

type Inputs = {
  requester: string;
  category: string;
  subCategory: {
    id: string;
    name: string;
  };
  amount: string;
  otherDescription: string;
  location: LatLng;
};

const CreateDemandSlideover = () => {
  const user = useUser();
  const [showCreateDemandSlideover, setShowCreateDemandSlideoverState] =
    useRecoilState(showCreateDemandSlideoverState);
  const [category, setCategory] = useState<(typeof categories)[0]>();
  const [subCategory, setSubCategory] = useState<SelectItem>();
  const [locations, setLocations] = useState<Locations[]>([]);
  const createRequest = useCreate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<Inputs>();

  const prepareCreateRequestDto = (data: Inputs) => {
    const dto: CreateRequestDto = {
      amount: Number(data.amount),
      productCode: data.subCategory.id,
      destination: `${data.location.lat},${data.location.lng}`,
    };

    if (data.otherDescription) {
      dto.description = data.otherDescription;
    }

    return dto;
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const data = await toast.promise(
        createRequest.mutateAsync(prepareCreateRequestDto(formData)),
        {
          loading: 'Yükleniyor...',
          success: <span>İstek oluşturuldu.</span>,
          error: <span>İstek oluşturulurken bir hata oluştu.</span>,
        },
      );

      console.log(data);

      reset(formData);
    } catch (error) {
      const errorAsAny = error as any;
      console.log(errorAsAny.response.data);
    }
  };

  return (
    <Slideover
      open={showCreateDemandSlideover}
      onClose={() => setShowCreateDemandSlideoverState(false)}
      title="İstek oluştur"
      description="Aşağıdaki bilgileri doldurarak istek oluşturun."
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="divide-y divide-gray-200 px-4 sm:px-6">
        <form className="space-y-6 pt-6 pb-5">
          <TextInput label="Kaydı oluşturan" value={user?.email} disabled />

          <div>
            <Controller
              name="location"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Lütfen bir varış noktası seçiniz',
                },
              }}
              render={({ field }) => (
                <>
                  <InputLabel>Varış noktası</InputLabel>
                  <Map
                    className="h-32"
                    locations={
                      field.value
                        ? [
                            {
                              name: 'Seçilen nokta',
                              location: field.value,
                            },
                          ]
                        : []
                    }
                    onClick={(event) => {
                      clearErrors('location');
                      setValue('location', event.latlng);
                    }}
                  />
                </>
              )}
            />

            {errors.location && errors.location.message && (
              <p className="pt-2 text-sm text-red-600" id="email-error">
                {errors.location.message}
              </p>
            )}
          </div>

          <Controller
            name="requester"
            control={control}
            rules={{
              required: { value: true, message: 'Bu alan zorunludur!' },
              minLength: {
                value: 1,
                message: 'Bu alan 1 karakterden küçük olamaz!',
              },
              maxLength: {
                value: 254,
                message: 'Bu alan 254 karakterden büyük olamaz!',
              },
            }}
            render={({ field }) => (
              <TextInput
                label="İstek yapan"
                error={Boolean(errors.requester?.message)}
                errorDescription={errors.requester?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{
              required: { value: true, message: 'Bu alan zorunludur!' },
            }}
            render={({ field }) => (
              <Select
                items={categories}
                label="İstek Tipi"
                error={Boolean(errors.category?.message)}
                errorDescription={errors.category?.message}
                placeholder="İstek tipi seçin"
                {...field}
                onChange={(value) => {
                  setCategory(value);

                  field.onChange(value);
                }}
                value={category}
              />
            )}
          />

          {category && (
            <Controller
              name="subCategory"
              control={control}
              rules={{
                required: { value: true, message: 'Bu alan zorunludur!' },
              }}
              render={({ field }) => (
                <Select
                  items={category.subCategories}
                  label="Ürün Tipi"
                  placeholder="Ürün tipi seçin"
                  error={Boolean(errors.subCategory?.message)}
                  errorDescription={errors.subCategory?.message}
                  {...field}
                  onChange={(value) => {
                    setSubCategory(value);
                    field.onChange(value);
                  }}
                  value={subCategory}
                />
              )}
            />
          )}

          <Controller
            name="amount"
            control={control}
            rules={{
              required: { value: true, message: 'Bu alan zorunludur!' },
              min: {
                value: 1,
                message: 'Bu alan birden küçük olamaz!',
              },
              max: {
                value: 1000,
                message: 'Bu alan binden büyük olamaz!',
              },
              validate: {
                isNumber: (value) => {
                  if (!isNumberString(value)) {
                    return 'Bu alan sayısal bir değer olmalıdır!';
                  }

                  return true;
                },
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Adet"
                error={Boolean(errors.amount?.message)}
                errorDescription={errors.amount?.message}
                {...field}
              />
            )}
          />

          {subCategory &&
            (subCategory.name === 'Diğer' || subCategory?.name === 'İlaç') && (
              <Controller
                name="otherDescription"
                control={control}
                rules={{
                  required: { value: true, message: 'Bu alan zorunludur!' },
                  min: {
                    value: 1,
                    message: 'Bu alan birden küçük olamaz!',
                  },
                  max: {
                    value: 1000,
                    message: 'Bu alan binden büyük olamaz!',
                  },
                }}
                render={({ field }) => (
                  <TextArea
                    label="Diğer Açıklama"
                    error={Boolean(errors.otherDescription?.message)}
                    errorDescription={errors.otherDescription?.message}
                    rows={4}
                    {...field}
                  />
                )}
              />
            )}
        </form>
      </div>
    </Slideover>
  );
};

export default CreateDemandSlideover;
