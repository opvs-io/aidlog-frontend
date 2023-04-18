import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

import { SupabaseAuth, withSupabaseAuth } from '@/providers/auth.middleware';
import SidebarLayout from '@/layouts/SidebarLayout/SidebarLayout';
import { showCreateDemandSlideoverState } from '@/store/demands.store';
import { useRecoilState } from 'recoil';
import CreateDemandSlideover from '@/components/Slideovers/CreateDemandSlideover/CreateDemandSlideover';
import useFindAllByRequester from '@/features/requests/hooks/use-find-all-by-requester';

const demands = [
  {
    creator: 'Cody Fisher',
    organization: 'AHBAP',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    phoneNumber: '0532 123 45 67',
    status: 'Shipped',
    createdAt: '1 Ocak 2023',
    updatedAt: '2 Ocak 2023',
  },
];

const Demands = ({ user }: SupabaseAuth) => {
  const [_, setShowCreateDemandSlideoverState] = useRecoilState(
    showCreateDemandSlideoverState,
  );

  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useFindAllByRequester({
    uid: user!.id,
  });

  console.log({
    requests,
  });

  return (
    <SidebarLayout
      user={user}
      header={
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-900">İstekler</h1>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              İsteklerin listesi burada görüntülenecek.
            </p>
          </div>
          {user && (
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => setShowCreateDemandSlideoverState(true)}
              >
                İstek oluştur
              </button>
            </div>
          )}
        </div>
      }
    >
      <div>
        <div>
          <div className="mt-4 flex flex-col">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            ) : isError && error ? (
              <div className="flex justify-center items-center">
                <div className="text-red-500">{error?.message}</div>
              </div>
            ) : requests && requests.length < 1 ? (
              <div className="flex flex-col">
                <div className="flex justify-center items-center">
                  <div className="text-gray-500">İstek bulunamadı.</div>
                </div>
              </div>
            ) : (
              requests &&
              requests.length > 0 && (
                <div className="-mx-1 overflow-x-auto px-1">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                            >
                              Oluşturan
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Kategori
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Durum
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Oluşturulma Tarihi
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Son Değişiklik
                            </th>

                            {user && (
                              <th
                                scope="col"
                                className="relative text-sm font-semibold text-gray-900 py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8 text-right"
                              >
                                Aksiyonlar
                                <span className="sr-only">Edit</span>
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {requests.map((request) => (
                            <tr key={request.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                {request.requesterUid}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {request.productCode}
                              </td>

                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                Ulaştırıldı
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {request.createdAt}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {request.updatedAt}
                              </td>
                              {user && (
                                <td className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8 text-right text-sm font-medium space-x-2">
                                  <button className="text-indigo-600 hover:text-indigo-900 ">
                                    <EyeIcon width={24} />
                                  </button>

                                  <button className="text-indigo-600 hover:text-indigo-900">
                                    <PencilSquareIcon width={24} />
                                  </button>

                                  <button className="text-indigo-600 hover:text-indigo-900 ">
                                    <TrashIcon width={24} />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <CreateDemandSlideover />
    </SidebarLayout>
  );
};

export const getServerSideProps = withSupabaseAuth();

export default Demands;
