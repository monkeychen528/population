import { CountyInterface, DistrictsInterface } from '@/interface/data';

export function filterContent
  <T extends CountyInterface | DistrictsInterface>(arrData: T[], key: string, searchText: string)
  : T[] {
  const data = arrData.filter((item) => item.name === searchText);
  return data;
}

let controller = new AbortController();
export async function apiFetch(year: string, selectedCity: string, selectedRegin: string) {
  if (controller) controller.abort();
  controller = new AbortController();
  const { signal } = controller;
  const data = await fetch(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${selectedCity}&TOWN=${selectedRegin}`, { signal })
    .then((res) => res.json())
    .catch((e: Error) => {
      // console.log('請求失敗，原因: ' + e)
      throw new Error(`請求失敗，原因: ' + ${e}`);
    });
  if (data.responseMessage === '查無資料') throw new Error('請檢查欄位是否為民國年、台灣城市、行政區');
  return data;
}
