/* eslint-disable react-hooks/rules-of-hooks */
import { InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { BaseProps } from '../../interface/common'

type User = {
  "room": any,
  "id": number
}
type Props = BaseProps<{
  listImages: User[]
}>
export const getServerSideProps: Props = async () => {
  const x = await fetch('https://621640007428a1d2a360b721.mockapi.io/luutkha/room')
  const data = await x.json()
  return {
    props: {
      listImages: data
    },
  }

}

const index = ({ listImages }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  else
    return (
      <div>{listImages.map(a => {
        return <div key={a.id}>
          {a.id}

          <div>
            {a.id?.toString()}
          </div>
        </div>
      })}</div>
    )
}

export default index