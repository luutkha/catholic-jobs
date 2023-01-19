import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setBgColor } from '../redux/slices/bg-color.slice';

export const getStaticProps: GetStaticProps = async () => {
  const x = await fetch('https://jsonplaceholder.typicode.com/photos')
  const data = await x.json()
  // console.log('this is sdata' + data)
  return {
    props: {
      listImages: data
    },
  }
}
const Home: NextPage = ({ listImages }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log(listImages)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setBgColor('#78b6fc')
    )

  }, [])
  return (
    <div> Tesst layout</div>
  )
}

export default Home

