import SidebarLayout from '@/layouts/SidebarLayout/SidebarLayout';
import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import dynamic from 'next/dynamic';

import { SupabaseAuth, withSupabaseAuth } from '@/providers/auth.middleware';
import { Locations } from '@/components/Map/Map';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData: ChartData<'doughnut', number[], string> = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const chartOptions: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Map = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
});

const locations: Locations[] = [
  {
    name: 'Samandağ',
    location: [36.0829947, 35.9518883],
  },
  {
    name: 'Altınözü',
    location: [36.1201087, 36.2434963],
  },
  {
    name: 'Antakya',
    location: [36.2210046, 36.0955892],
  },
];

const Home = ({ session, user }: SupabaseAuth) => {
  useEffect(() => {
    console.log({
      session,
      user,
    });
  }, [session, user]);

  return (
    <>
      <Head>
        <title>AidLog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-14">
        <section>
          <h2 className="text-sm uppercase font-semibold text-gray-600">
            Bağış İstatistikleri
          </h2>

          <div className="mt-4">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Title
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  1.000
                </dd>
              </div>

              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Title
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  1.000
                </dd>
              </div>

              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Title
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  1.000
                </dd>
              </div>

              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Title
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  1.000
                </dd>
              </div>

              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Title
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  1.000
                </dd>
              </div>

              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Title
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  1.000
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Title
              </dt>

              <dd className="mt-1">
                <Doughnut
                  options={chartOptions}
                  data={chartData}
                  width="auto"
                  height="auto"
                />
              </dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Title
              </dt>

              <dd className="mt-1">
                <Doughnut
                  options={chartOptions}
                  data={chartData}
                  width="auto"
                  height="auto"
                />
              </dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Title
              </dt>

              <dd className="mt-1">
                <Doughnut
                  options={chartOptions}
                  data={chartData}
                  width="auto"
                  height="auto"
                />
              </dd>
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          <h2 className="text-sm uppercase font-semibold text-gray-600">
            Toplama Konumları
          </h2>

          <Map locations={locations} />
        </section>

        <section className="mt-5 space-y-4">
          <h2 className="text-sm uppercase font-semibold text-gray-600">
            Dağıtım Konumları
          </h2>

          <Map locations={locations} />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = withSupabaseAuth();

Home.getLayout = function getLayout(page: ReactElement<SupabaseAuth>) {
  return (
    <SidebarLayout title="Panel" user={page.props.user}>
      {page}
    </SidebarLayout>
  );
};

export default Home;
