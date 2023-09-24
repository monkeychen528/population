export interface MockResponseInterface {
  'responseCode': string,
  'responseMessage': string,
  'totalPage': string,
  'totalDataSize': string,
  'page': string,
  'pageDataSize': string,
  'responseData': MockDataInterface[]
}

export interface MockDataInterface {
  'statistic_yyy': string,
  'district_code': string,
  'site_id': string,
  'village': string,
  'household_ordinary_total': string,
  'household_business_total': string,
  'household_single_total': string,
  'household_ordinary_m': string,
  'household_business_m': string,
  'household_single_m': string,
  'household_ordinary_f': string,
  'household_business_f': string,
  'household_single_f': string
}

export interface CountyInterface {
  districts: DistrictsInterface[],
  name: string
}

export interface DistrictsInterface {
  zip: string,
  name: string
}
