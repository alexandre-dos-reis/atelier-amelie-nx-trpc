import { trpc } from "../../utils/trpc"

export const PurchasesList = () => {

  const {data, isLoading, isError, error} = trpc.useQuery(['purchase.findAll'])

  return (
    <div>{JSON.stringify(data?.purchases)}</div>
  )
}
