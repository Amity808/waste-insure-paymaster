'use client'
'--jsx'
import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
const query = gql`{
  fundsDepositeds(first: 5) {
    id
    wasteAdmin
    amount
    blockNumber
  }
  fundsWithdrawns(first: 5) {
    id
    wasteAdmin
    amount
    blockNumber
  }
}`
const url = 'https://api.studio.thegraph.com/query/85337/waste-insured/version/latest'
export default function Data() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, query)
    }
  })
  
  console.log(data)
  return (
    <div>{JSON.stringify(data ?? {})}</div>
  )
}
      