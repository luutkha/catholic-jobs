import { InferGetStaticPropsType } from 'next'
import { BaseProps } from '../../interface/common'
type User = {
  "room": any,
  "id": number
}
type Props = BaseProps<{
  listImages: User[]
}>
export const getStaticProps: Props = async () => {
  const x = await fetch('https://621640007428a1d2a360b721.mockapi.io/luutkha/room')
  const data = await x.json()
  return {
    props: {
      listImages: data
    },
  }

}
const index = ({ listImages }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(listImages)
  return (
    <div>
      {listImages.map(a => {
        return <div key={a.id}>
          {a.id}

          <div>
            {a.id?.toString()}
          </div>
        </div>
      })}
    </div>
  )
}

export default index