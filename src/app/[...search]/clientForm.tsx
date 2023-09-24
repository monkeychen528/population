'use client';

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';

import { MockResponseInterface, CountyInterface } from '@/interface/data';
import FormSelect from '@/component/select';
import FormAutocomplete from '@/component/autocomplete';
import Chart from './chart'
import { filterContent, apiFetch } from '@/utils/common'
import styles from './page.module.css';


const names = [
  { name: 118 },
  { name: 119 },
  { name: 110 },
  { name: 111 },
  { name: 112 },
];

function ClientForm({ initData, countyData }: {
  initData?: MockResponseInterface, countyData: CountyInterface[]
}) {
  const [year, setYear] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedRegin, setSelectedRegin] = React.useState('');
  const [allData, setAlldata] = React.useState(initData)
  const params = useParams()
  const mobilApp = useMediaQuery('(max-width:767px)')

  const handleChangeMultiple = (cb: React.Dispatch<string>) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const element = event.target
    const { value } = element;
    return cb(value);
  };
  const handleSubmit = async () => {
    try {
      const jsonData = await apiFetch(year, selectedCity, selectedRegin)
      setAlldata(jsonData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (params.search?.length > 0) {
      const [yearParam, cityParam, reginParam] = params.search
      const notString = typeof yearParam !== "string" || typeof cityParam !== "string" || typeof reginParam !== "string"
      if (notString) return
      if (/[^0-9]/g.test(yearParam)) return //非數字
      const [decodeCity, decodeRegin] = [decodeURIComponent(cityParam), decodeURIComponent(reginParam)]
      const hasCity = filterContent(countyData, 'name', decodeCity) //確認城市
      if (hasCity.length === 0) return
      const hasRegin = filterContent(hasCity[0].districts, 'name', decodeRegin) //確認行政區
      if (hasRegin.length === 0) return
      (async () => {
        try {
          const jsonData = await apiFetch(yearParam, decodeCity, decodeRegin)
          setAlldata(jsonData)
          setYear(yearParam)
          setSelectedCity(decodeCity)
          setSelectedRegin(decodeRegin)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [])

  const cities = useMemo(() => {
    return countyData ? countyData.map((item) => ({ name: item.name })) : [];
  }, [])
  const regins = useMemo(() => {
    setAlldata(initData)
    return selectedCity ? countyData.filter((item) => {
      if (item.name === selectedCity) return item
    }) : []
  }, [selectedCity]);
  return (
    <>
      <Box sx={{ textAlign: mobilApp ? 'left' : 'center' }}>人口數、戶數按戶別及性別統計</Box>
      <main className={styles.main}>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }} variant='outlined' size="small">
          <FormSelect selectItem={names} handleChange={handleChangeMultiple(setYear)} selectLabel="年份" selectedValue={year} />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }} variant='outlined' size="small">
          <FormAutocomplete
            optionLabel='縣/市'
            options={cities || []}
            stateChange={[setSelectedCity,setSelectedRegin]}
            filterKey={selectedCity}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }} variant='outlined' size="small" >
          <FormAutocomplete
            optionLabel='區'
            options={regins[0]?.districts || []}
            stateChange={setSelectedRegin}
            disabled={selectedCity === ''}
            filterKey={selectedRegin}
          />
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          size='large'
          onClick={handleSubmit}
          disabled={!selectedCity || !selectedRegin || !year}
        >submit
        </Button>
      </main>
      {mobilApp && <>
        <Divider classes={{ root: styles.dividerColor }} >
          <Chip label="結果查詢" color='secondary' variant="outlined" />
        </Divider>
      </>}
      {allData && Object.keys(allData).length > 0 && year && selectedCity && selectedRegin &&
        <Box sx={{ textAlign: 'center' }}>
          <p>{year}年 {selectedCity} {selectedRegin}</p>
          <Chart cityData={allData} />
        </Box >
        || '查無資料，請檢查是否輸入民國年、正確縣市(正體)、符合縣市管轄之鄉政區'
      }
    </>
  );
}

export default ClientForm;
