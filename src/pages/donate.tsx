import Head from 'next/head';
import React from 'react';
import { ReactElement } from 'react';
import SidebarLayout from '@/layouts/SidebarLayout/SidebarLayout';

interface IProduct {
  name: string;
  amount: number;
}

const productList = ['Mont, Kaban, Dış Giyim', 'Yiyecek'];

const CreateDonate = () => {
  const [formName, setFormName] = React.useState<string>('');
  const [formAmount, setFormAmount] = React.useState<number>(0);
  const [items, setItems] = React.useState<IProduct[]>([]);
  const [products, setProducts] = React.useState<string[]>(productList);

  function handleFormName(e: any) {
    setFormName(e.target.value);
  }

  function handleFormAmount(e: any) {
    setFormAmount(e.target.value);
  }

  const addItem = () => {
    if (!formName) {
      return;
    }
    const product = { name: formName, amount: formAmount };
    setFormName('');
    setFormAmount(0);
    setItems([...items, product]);
  };

  return (
    <>
      <Head>
        <title>Yeni Bağış</title>
      </Head>

      <section>
        <h2 className="text-sm uppercase font-semibold text-gray-600">
          Yeni Bağış
        </h2>

        <div className="mt-4">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <h6 className="text-sm font-medium text-gray-500 truncate">
                Bağışçı Bilgileri
              </h6>
              <div className="mt-1 text-gray-900">
                <p>
                  Ad Soyad:
                  <strong> Bora Baloğlu</strong>
                </p>
                <p>
                  Organizasyon:
                  <strong> OPVS</strong>
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <div className=" px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <h6 className="text-sm font-medium text-gray-500 truncate">
                  Yeni Ürün Ekle
                </h6>
                <div className="mt-1 text-gray-900">
                  <div className="grid grid-cols-5 gap-3">
                    <div className=" col-span-2">
                      <select
                        name=""
                        value={formName}
                        onChange={handleFormName}
                      >
                        <option value="">Ürün seçin...</option>
                        {products.map((product, i) => (
                          <option key={i} value={product}>
                            {product}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className=" col-span-2">
                      <input
                        type="number"
                        value={formAmount}
                        onChange={handleFormAmount}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="w-full"
                        onClick={addItem}
                      >
                        Ekle
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <table className="w-full border border-gray-100 border-collapse">
                      <thead>
                        <tr>
                          <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Ürün
                          </th>
                          <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Adet
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, i) => (
                          <tr
                            key={i}
                            className="h-10 border border-gray-100 rounded"
                          >
                            <td className="px-6">{item.name}</td>
                            <td className="px-6">{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
};

CreateDonate.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Panel">{page}</SidebarLayout>;
};

export default CreateDonate;
